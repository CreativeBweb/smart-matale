const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Location data store
const locations = {
  sigiriya: {
    name: "Sigiriya Rock Fortress",
    context: `
      Sigiriya is an ancient rock fortress located in central Sri Lanka.
      Key points:
      - UNESCO World Heritage site
      - Built by King Kashyapa (477 – 495 CE)
      - Famous for its ancient frescoes
      - Features the Lion Gate and Mirror Wall
      - Surrounded by beautiful gardens
      - One of Sri Lanka's most popular tourist attractions
      - Rising 200 meters from the ground
      - Known for its advanced hydraulic systems
    `,
  },
  aluvihara: {
    name: "Aluvihara Rock Temple",
    context: `
      Aluvihara Rock Temple is an ancient Buddhist temple in Matale, Sri Lanka.
      Key points:
      - Historic site where the Buddhist scriptures were first written down
      - Contains cave temples with Buddhist paintings
      - Over 2000 years old
      - Famous for its rock cave temples and ancient writings
      - Important religious and historical site
      - Located in Matale district
      - Popular tourist destination
    `,
  },
  "bambarakiri-ella": {
    name: "Bambarakiri Ella",
    context: `
      Bambarakiri Ella is a picturesque waterfall located in the Knuckles mountain range, close to Rattota town in Matale District, Sri Lanka.

      Key points:

      * Height: It is a small fall of 3 meters in height.
      * Caution:  Caution should be taken when bathing as it has claimed lives in the past.
      * Suspension Bridge: There is an old suspension bridge spanning the waterfall.
      * Flora and Fauna: The area is rich in biodiversity with a variety of flora, fauna, and birds.
      * Accessibility: It is easily accessible by road, located 18km from Matale town and 40km from Amaya Hunas Falls.
      * Scenic Beauty: The fall is set amidst the mesmerizing greenery of the Knuckles mountain range.
      * Climbing: For the adventurous, there is a steep 5km climb to the top of the waterfall, but it is slippery and should be done with caution.
      * Rock Pool: There is a cool, clear natural rock pool at the top, perfect for bathing.
    `,
  },
};

// Simple response generator based on message content
function generateResponse(message, location, language) {
  const locationInfo = locations[location];
  let response = "";

  // Convert message to lowercase
  const messageLower = message.toLowerCase();

  // Location
 // Location
if (
  messageLower.includes("where is") ||
  messageLower.includes("location") ||
  messageLower.includes("situated") ||
  messageLower.includes("place") ||
  messageLower.includes("map") ||
  messageLower.includes("area") ||
  messageLower.includes("region") ||
  messageLower.includes("close to")
) {
  response = `Bambarakiri Ella is located in the picturesque Knuckles Mountain Range, near Rattota town in the Matale District of Sri Lanka. It's a serene spot surrounded by lush greenery and a popular destination for nature lovers.`;
}
// Height
else if (
  messageLower.includes("how high") ||
  messageLower.includes("tall") ||
  messageLower.includes("height") ||
  messageLower.includes("elevation")
) {
  response = `Bambarakiri Ella is a relatively small waterfall with a height of approximately 3 meters, but it is well-known for its tranquil atmosphere and scenic surroundings.`;
}

// Bath
else if (
  messageLower.includes("bath") ||
  messageLower.includes("wash") ||
  messageLower.includes("pool")
) {
  response = `You can have a nice bath in fresh water flows from the above mountain ranges.`;
}

// Activities
else if (
  messageLower.includes("things to do") ||
  messageLower.includes("activities") ||
  messageLower.includes("fun") ||
  messageLower.includes("explore")
) {
  response = `At Bambarakiri Ella, you can enjoy activities like walking across the iconic suspension bridge, birdwatching, photography, and relaxing by the cascading water. The surrounding forest also makes it a great place for nature walks and exploring the rich biodiversity.`;
}
// Difficulty
else if (
  messageLower.includes("hard") ||
  messageLower.includes("difficult") ||
  messageLower.includes("challenging") ||
  messageLower.includes("easy") ||
  messageLower.includes("moderate") ||
  messageLower.includes("time") ||
  messageLower.includes("long") ||
  messageLower.includes("hike") ||
  messageLower.includes("climb")
) {
  response = `Reaching Bambarakiri Ella is relatively easy, as the main waterfall is accessible by road. However, if you plan to explore the upper levels or hike around the area, it involves a steep and occasionally slippery climb, so proper footwear and caution are necessary.`;
}
// Facilities
else if (
  messageLower.includes("facilities") ||
  messageLower.includes("accommodation") ||
  messageLower.includes("food") ||
  messageLower.includes("restaurants") ||
  messageLower.includes("parking") ||
  messageLower.includes("toilets") ||
  messageLower.includes("stay")
) {
  response = `Bambarakiri Ella is a natural site, so facilities are limited. While parking is available near the entrance, there are no on-site restaurants or accommodations. It's a good idea to bring your own snacks and water, and plan your stay in nearby towns like Matale or Rattota.`;
}
// Best time to visit
else if (
  messageLower.includes("best time") ||
  messageLower.includes("visit") ||
  messageLower.includes("season") ||
  messageLower.includes("weather") ||
  messageLower.includes("months")
) {
  response = `The best time to visit Bambarakiri Ella is from December to March during the dry season. The weather is more predictable, and the water flow is moderate, making it ideal for sightseeing and photography. Avoid the monsoon season, as the trails can become slippery and the water currents dangerous.`;
}
// Safety
else if (
  messageLower.includes("safe") ||
  messageLower.includes("safety") ||
  messageLower.includes("dangerous") ||
  messageLower.includes("risks") ||
  messageLower.includes("precautions") ||
  messageLower.includes("swim")
) {
  response = `While Bambarakiri Ella is a beautiful spot to visit, caution is advised when exploring. Swimming is not recommended due to strong currents and hidden rocks. Always exercise care when walking on slippery surfaces, especially near the waterfall or on the suspension bridge.`;
}
// Costs and Fees
else if (
  messageLower.includes("cost") ||
  messageLower.includes("entrance fee") ||
  messageLower.includes("ticket") ||
  messageLower.includes("price") ||
  messageLower.includes("money")
) {
  response = `No. The entrance to Bambarakiri Ella is Free.`;
}
// Guides and Tours
else if (
  messageLower.includes("guide") ||
  messageLower.includes("tour") ||
  messageLower.includes("help") ||
  messageLower.includes("local")
) {
  response = `Local guides are often available near Bambarakiri Ella. They can provide valuable insights about the area, including the best viewpoints, hidden trails, and stories about the region. Hiring a guide can enhance your experience, especially if you're new to the area.`;
}
// History and Cultural Significance
else if (
  messageLower.includes("history") ||
  messageLower.includes("significance") ||
  messageLower.includes("culture") ||
  messageLower.includes("heritage")
) {
  response = `Bambarakiri Ella holds cultural significance as a serene natural spot in the Matale District. While it may not have specific historical ties, the surrounding Knuckles region is steeped in folklore and biodiversity, making it an important ecological and cultural area.`;
}
// Wildlife and Nature
else if (
  messageLower.includes("wildlife") ||
  messageLower.includes("animals") ||
  messageLower.includes("birds") ||
  messageLower.includes("plants") ||
  messageLower.includes("flora") ||
  messageLower.includes("fauna") ||
  messageLower.includes("nature")
) {
  response = `The area around Bambarakiri Ella is home to diverse flora and fauna, including endemic birds, colorful butterflies, and various plant species. It's an ideal destination for nature enthusiasts and photographers.`;
}
// If the message doesn't match any of the keywords
else {
  response = `I'm sorry, I don't have enough information to answer that. Would you like to know,:

Where is Bambarakiri Ella located?
How high is Bambarakiri Ella? 
What can I do at Bambarakiri Ella?
Is it safe to swim at Bambarakiri Ella?
When is the best time to visit Bambarakiri Ella?
Are there any facilities near Bambarakiri Ella?
How long does it take to get to Bambarakiri Ella?
Are guides available at Bambarakiri Ella?
What is the history of Bambarakiri Ella?
Are there any entrance fees for Bambarakiri Ella?

Let me know if you'd like details about any of these!`;
}

  return response;
}

// Chat endpoint
app.post("/api/chat", (req, res) => {
  try {
    const { message, location, language } = req.body;
    console.log("Received request:", { message, location, language });

    if (!locations[location]) {
      console.log("Available locations:", Object.keys(locations));
      return res.status(400).json({
        error: `Invalid location: '${location}'. Available locations: ${Object.keys(
          locations,
        ).join(", ")}`,
      });
    }

    const response = generateResponse(message, location, language);

    res.json({
      response: response,
      location: locations[location].name,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: "Failed to get response",
      details: error.message,
    });
  }
});

// Test endpoint
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is running correctly!" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});