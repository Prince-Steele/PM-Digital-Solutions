const CONTACT_EMAIL = "princesteele23@gamil.com";

function buildHtml({ name, email, message, selectedItem, selectedType }) {
  const selectionLabel = selectedItem
    ? `<p><strong>${selectedType === "project" ? "Selected project" : "Selected package"}:</strong> ${selectedItem}</p>`
    : "";

  return `
    <div style="font-family: Arial, sans-serif; color: #12304e; line-height: 1.6;">
      <h2>New PM Digital Solutions Website Inquiry</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${selectionLabel}
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    </div>
  `;
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message, selectedItem, selectedType } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: "Missing RESEND_API_KEY environment variable." });
  }

  const subjectSuffix = selectedItem
    ? ` - ${selectedType === "project" ? "Project" : "Package"}: ${selectedItem}`
    : "";

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL || "PM Digital Solutions <onboarding@resend.dev>",
      to: [process.env.CONTACT_EMAIL || CONTACT_EMAIL],
      reply_to: email,
      subject: `New website inquiry from ${name}${subjectSuffix}`,
      html: buildHtml({ name, email, message, selectedItem, selectedType }),
    }),
  });

  const resendData = await resendResponse.json();

  if (!resendResponse.ok) {
    return res.status(500).json({
      error: resendData?.message || "Unable to send your message right now.",
    });
  }

  return res.status(200).json({ ok: true, id: resendData.id });
};
