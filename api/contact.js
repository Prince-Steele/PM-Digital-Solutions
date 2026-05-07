const CONTACT_EMAIL = "princesteele23@gmail.com";

function escapeHtml(value = "") {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildSelectionLabel(selectedItem, selectedType) {
  if (!selectedItem) {
    return "";
  }

  return selectedType === "project" ? "Selected project" : "Selected service";
}

function buildHtml({ name, email, message, selectedItem, selectedType }) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");
  const selectionLabel = buildSelectionLabel(selectedItem, selectedType);
  const safeSelection = selectedItem ? escapeHtml(selectedItem) : "";
  const submittedAt = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const inquiryType = selectedType === "project" ? "Project inquiry" : "Service inquiry";

  return `
    <div style="display:none; max-height:0; overflow:hidden; opacity:0; color:transparent;">
      New inquiry from ${safeName} for PM Digital Solutions.
    </div>
    <style>
      @media only screen and (max-width: 640px) {
        .email-shell { padding: 24px 12px !important; }
        .email-card { border-radius: 22px !important; }
        .email-header,
        .email-body,
        .email-footer,
        .email-topbar { padding-left: 20px !important; padding-right: 20px !important; }
        .email-title { font-size: 24px !important; line-height: 1.2 !important; }
        .email-summary { font-size: 14px !important; }
        .email-stack,
        .email-stack tbody,
        .email-stack tr,
        .email-stack td,
        .email-reply-table,
        .email-reply-table tbody,
        .email-reply-table tr,
        .email-reply-table td {
          display: block !important;
          width: 100% !important;
        }
        .email-gap { display: none !important; }
        .email-badge-wrap { text-align: left !important; padding-top: 14px !important; }
        .email-panel { margin-bottom: 14px !important; }
        .email-message-box { font-size: 14px !important; line-height: 1.72 !important; }
        .email-footer-copy { margin-bottom: 14px !important; }
        .email-reply-align { text-align: left !important; }
        .email-reply-button { margin-top: 6px !important; }
      }
    </style>
    <div class="email-shell" style="margin:0; padding:36px 16px; background:#edf3f9; font-family:Arial, Helvetica, sans-serif; color:#16324d;">
      <div style="max-width:720px; margin:0 auto;">
        <div style="margin-bottom:16px; text-align:center;">
          <span style="display:inline-block; padding:8px 14px; border-radius:999px; background:#ffffff; border:1px solid #d8e4ef; color:#58708c; font-size:11px; font-weight:700; letter-spacing:0.18em; text-transform:uppercase;">
            PM Digital Solutions
          </span>
        </div>

        <div class="email-card" style="background:#ffffff; border:1px solid #d7e3ef; border-radius:28px; overflow:hidden; box-shadow:0 22px 60px rgba(18,48,78,0.08);">
          <div class="email-topbar" style="padding:0 32px; background:#ffffff;">
            <div style="height:8px; background:linear-gradient(90deg, #102739 0%, #1d72ff 52%, #19c2c9 100%);"></div>
          </div>

          <div class="email-header" style="padding:30px 32px 18px; background:
            radial-gradient(circle at top right, rgba(25,194,201,0.10), transparent 28%),
            linear-gradient(180deg, #ffffff 0%, #f7fbff 100%);
          ">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              <tr>
                <td style="padding:0; vertical-align:top;">
                  <p style="margin:0 0 10px; font-size:12px; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; color:#62809d;">New website inquiry</p>
                  <h1 class="email-title" style="margin:0 0 12px; font-size:30px; line-height:1.16; color:#102739;">${safeName} just contacted you</h1>
                  <p class="email-summary" style="margin:0; font-size:15px; line-height:1.7; color:#56708b;">
                    A new message was sent through your PM Digital Solutions contact form.
                  </p>
                </td>
                <td class="email-badge-wrap" style="width:170px; padding:0; vertical-align:top; text-align:right;">
                  <span style="display:inline-block; padding:10px 14px; border-radius:16px; background:#f2f8ff; border:1px solid #d9e7f5; color:#0f5fd8; font-size:12px; font-weight:700;">
                    ${selectedItem ? inquiryType : "General inquiry"}
                  </span>
                </td>
              </tr>
            </table>
          </div>

          <div class="email-body" style="padding:0 32px 32px;">
            <table class="email-stack" role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate; border-spacing:0 16px;">
              <tr>
                <td style="width:42%; vertical-align:top;">
                  <div class="email-panel" style="padding:20px 20px 18px; background:#f8fbfe; border:1px solid #dbe7f2; border-radius:20px;">
                    <p style="margin:0 0 14px; font-size:12px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:#62809d;">Contact details</p>
                    <p style="margin:0 0 12px; font-size:15px; line-height:1.6; color:#16324d;"><strong style="color:#102739;">Name</strong><br>${safeName}</p>
                    <p style="margin:0 0 12px; font-size:15px; line-height:1.6; color:#16324d;"><strong style="color:#102739;">Email</strong><br><a href="mailto:${safeEmail}" style="color:#0c54d4; text-decoration:none;">${safeEmail}</a></p>
                    ${selectedItem ? `
                    <p style="margin:0 0 12px; font-size:15px; line-height:1.6; color:#16324d;"><strong style="color:#102739;">${selectionLabel}</strong><br>${safeSelection}</p>` : ""}
                    <p style="margin:0; font-size:15px; line-height:1.6; color:#16324d;"><strong style="color:#102739;">Submitted</strong><br>${submittedAt}</p>
                  </div>
                </td>
                <td class="email-gap" style="width:16px;"></td>
                <td style="vertical-align:top;">
                  <div class="email-panel" style="padding:20px 22px; background:#ffffff; border:1px solid #dbe7f2; border-radius:20px;">
                    <p style="margin:0 0 14px; font-size:12px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:#62809d;">Message</p>
                    <div class="email-message-box" style="padding:18px; background:#f9fcff; border-left:4px solid #1d72ff; border-radius:14px; font-size:15px; line-height:1.8; color:#16324d;">
                      ${safeMessage}
                    </div>
                  </div>
                </td>
              </tr>
            </table>

            <div class="email-footer" style="margin-top:8px; padding:22px; background:linear-gradient(135deg, #102739 0%, #163c63 100%); border-radius:22px; color:#ffffff;">
              <table class="email-reply-table" role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                <tr>
                  <td style="vertical-align:middle;">
                    <p style="margin:0 0 8px; font-size:18px; font-weight:700; color:#ffffff;">Reply directly from your inbox</p>
                    <p class="email-footer-copy" style="margin:0; font-size:14px; line-height:1.7; color:rgba(255,255,255,0.82);">
                      Use the reply button below to continue the conversation with ${safeName}.
                    </p>
                  </td>
                  <td class="email-gap" style="width:18px;"></td>
                  <td class="email-reply-align" style="width:170px; vertical-align:middle; text-align:right;">
                    <a class="email-reply-button" href="mailto:${safeEmail}" style="display:inline-block; padding:13px 20px; border-radius:999px; background:#ffffff; color:#0c54d4; text-decoration:none; font-size:14px; font-weight:700;">Reply now</a>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function buildText({ name, email, message, selectedItem, selectedType }) {
  const selectionLabel = buildSelectionLabel(selectedItem, selectedType);
  const submittedAt = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return [
    "New PM Digital Solutions Website Inquiry",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    ...(selectedItem ? [`${selectionLabel}: ${selectedItem}`] : []),
    `Submitted: ${submittedAt}`,
    "",
    "Message:",
    message,
  ].join("\n");
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
      text: buildText({ name, email, message, selectedItem, selectedType }),
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
