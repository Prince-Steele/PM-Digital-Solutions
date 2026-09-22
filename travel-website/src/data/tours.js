export const categories = [
  "All",
  "Adventure",
  "Culture",
  "Nature",
  "Food",
  "Beach",
  "Private",
];
export const tours = [
  {
    id: "dunns-river-adventure",
    title: "Dunn’s River & Ocho Rios Adventure",
    location: "Ocho Rios, St. Ann",
    category: "Adventure",
    duration: "6–7 hours",
    image: "waterfall",
    imageAlt: "Cascading waterfall surrounded by lush tropical greenery",
    label: "A little adventure",
    shortDescription:
      "Chase waterfalls, take a refreshing dip, and find your own island rhythm.",
    description:
      "Trade the everyday for cool cascades and the green heart of the north coast. This sample day pairs a guided waterfall experience with time to slow down by the sea and discover Ocho Rios at an easy pace.",
    highlights: [
      "Explore the famous terraced falls",
      "Enjoy a relaxed stop in Ocho Rios",
      "Take time for a swim by the coast",
    ],
    included: [
      "Local guide",
      "Round-trip transport from the agreed pickup point",
      "Waterfall entry",
      "Bottled water",
    ],
    bring: [
      "Water shoes with grip",
      "Swimwear and a towel",
      "Sun protection",
      "A dry change of clothes",
    ],
    itinerary: [
      ["9:00 AM", "Pickup & coastal drive"],
      ["10:00 AM", "Guided waterfall adventure"],
      ["12:00 PM", "Free time for a local lunch"],
      ["1:30 PM", "Beach stop & return journey"],
    ],
  },
  {
    id: "blue-mountains-escape",
    title: "Blue Mountains Escape",
    location: "Blue Mountains, St. Andrew",
    category: "Nature",
    duration: "Full day",
    image: "mountains",
    imageAlt: "Layers of green mountain ridges fading into soft morning mist",
    label: "Into the green",
    shortDescription:
      "Misty trails, mountain air, and a slower kind of adventure.",
    description:
      "Follow winding roads into Jamaica’s mountain country. Take in sweeping views, walk a gentle nature trail, and pause over a cup of locally grown coffee. This sample itinerary leaves room to breathe, look around, and enjoy the journey.",
    highlights: [
      "Guided nature walk",
      "Mountain viewpoints",
      "Coffee tasting stop",
    ],
    included: [
      "Local guide",
      "Transport from an agreed Kingston pickup point",
      "Coffee tasting",
      "Bottled water",
    ],
    bring: [
      "Comfortable walking shoes",
      "A light rain jacket",
      "Sun protection",
      "Your camera",
    ],
    itinerary: [
      ["8:00 AM", "Kingston pickup"],
      ["9:30 AM", "Mountain drive & viewpoints"],
      ["11:00 AM", "Nature walk & coffee stop"],
      ["1:00 PM", "Lunch break & scenic return"],
    ],
  },
  {
    id: "kingston-culture",
    title: "Kingston Culture Experience",
    location: "Kingston, St. Andrew",
    category: "Culture",
    duration: "5–6 hours",
    image: "culture",
    imageAlt:
      "Panoramic view across Kingston toward the harbour and green hills",
    label: "Feel the rhythm",
    shortDescription:
      "Meet the creative spirit of the city through its art, stories, and sounds.",
    description:
      "Get to know the capital through the stories that make it special. Explore street art, stop at a cultural landmark, and discover everyday Kingston with a guide who brings the city’s creative energy to life.",
    highlights: [
      "Downtown art walk",
      "Music and cultural storytelling",
      "Time to explore a local market",
    ],
    included: ["Local city guide", "Transport between stops", "Bottled water"],
    bring: [
      "Comfortable shoes",
      "Sunhat",
      "Camera",
      "Spending money for lunch",
    ],
    itinerary: [
      ["9:00 AM", "Meet your guide"],
      ["9:30 AM", "Art & architecture walk"],
      ["11:00 AM", "Music and cultural stop"],
      ["12:30 PM", "Local lunch & market time"],
    ],
  },
  {
    id: "south-coast-explorer",
    title: "South Coast Explorer",
    location: "Treasure Beach, St. Elizabeth",
    category: "Private",
    duration: "Full day",
    image: "coast",
    imageAlt:
      "Palm-filled resort gardens overlooking turquoise water in Ocho Rios",
    label: "Your own island time",
    shortDescription:
      "Quiet coves, coastal villages, and a day shaped around you.",
    description:
      "Head to a quieter side of the island, where fishing villages and open horizons invite you to slow down. This private sample experience is flexible, with coastal stops and time to linger wherever you feel most at home.",
    highlights: [
      "Coastal village stops",
      "Unhurried beach time",
      "A flexible private itinerary",
    ],
    included: [
      "Private guide and vehicle",
      "Agreed pickup and drop-off",
      "Bottled water",
    ],
    bring: [
      "Swimwear",
      "Towel",
      "Sunhat and sunscreen",
      "Spending money for meals",
    ],
    itinerary: [
      ["8:30 AM", "Pickup & south coast drive"],
      ["10:30 AM", "Village visit"],
      ["12:00 PM", "Seaside lunch break"],
      ["2:00 PM", "Beach time & return"],
    ],
  },
  {
    id: "taste-of-jamaica",
    title: "A Taste of Jamaica",
    location: "Montego Bay, St. James",
    category: "Food",
    duration: "4 hours",
    image: "food",
    imageAlt: "Jamaican breakfast with ackee and golden fried dumplings",
    label: "Good food. Good company.",
    shortDescription:
      "Follow the flavour, from a bustling market to a smoky jerk stop.",
    description:
      "Explore Jamaica one bite at a time. This sample food trail brings together a market visit, seasonal fruit, and a relaxed jerk lunch, with plenty of stories about the ingredients and people behind the food.",
    highlights: [
      "Fresh market walk",
      "Seasonal fruit tasting",
      "Jerk lunch stop",
    ],
    included: [
      "Food-loving local guide",
      "Sample tastings",
      "Jerk lunch",
      "Bottled water",
    ],
    bring: [
      "Comfortable footwear",
      "Sun protection",
      "An appetite",
      "Any dietary requirements to discuss in advance",
    ],
    itinerary: [
      ["10:00 AM", "Meet & market walk"],
      ["11:00 AM", "Seasonal tasting stop"],
      ["12:00 PM", "Jerk lunch & food stories"],
      ["2:00 PM", "Return to meeting point"],
    ],
  },
  {
    id: "negril-beach-day",
    title: "Negril, Unhurried",
    location: "Negril, Westmoreland",
    category: "Beach",
    duration: "Full day",
    image: "beach",
    imageAlt: "Beachgoers and colourful umbrellas by the sea in Montego Bay",
    label: "Saltwater state of mind",
    shortDescription:
      "Barefoot beach time, turquoise water, and a golden-hour goodbye.",
    description:
      "Make space for a day of doing a little less. Stretch out on the sand, enjoy the water, and settle into the relaxed pace of Negril. This sample beach day finishes with a pause to enjoy the afternoon light.",
    highlights: [
      "Relaxed beach time",
      "Optional shoreline stroll",
      "A scenic sunset stop",
    ],
    included: [
      "Local host",
      "Round-trip transport from an agreed pickup point",
      "Bottled water",
    ],
    bring: [
      "Swimwear and towel",
      "Reef-conscious sunscreen",
      "Hat",
      "Spending money for meals",
    ],
    itinerary: [
      ["10:00 AM", "Pickup & coastal drive"],
      ["12:00 PM", "Beach arrival & free time"],
      ["2:00 PM", "Seaside lunch break"],
      ["4:30 PM", "Scenic stop & return"],
    ],
  },
];

export const imagePath = (name, small = false) =>
  `/images/${name}${small ? "-small" : ""}.webp`;
