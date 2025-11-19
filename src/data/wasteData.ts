export interface WasteItem {
  name: string;
  category: string;
  classification: string;
  degradationMethod: string;
  disposalInstructions: string[];
  icon: string;
}

export const wasteDatabase: WasteItem[] = [
  {
    name: "Fruit and Vegetable Peels",
    category: "Biodegradable Organic Waste",
    classification: "🟢 Green Bin - Wet Waste",
    degradationMethod: "Composting (7-30 days)",
    disposalInstructions: [
      "Collect in a separate container for daily composting",
      "Can be composted at home in a kitchen composter or terrace garden",
      "Mix with dry leaves for faster decomposition",
      "Produces nutrient-rich organic manure within 45-60 days",
      "Can also be given to municipal green waste collection vehicles"
    ],
    icon: "🥕"
  },
  {
    name: "Used Tea Leaves and Coffee Grounds",
    category: "Biodegradable Organic Waste",
    classification: "🟢 Green Bin - Wet Waste",
    degradationMethod: "Composting (15-30 days)",
    disposalInstructions: [
      "Add directly to compost bin or plant pots",
      "Acts as natural fertilizer for plants",
      "Can be mixed with soil for potted plants",
      "Helps improve soil texture and drainage",
      "Keep in wet waste bin if not composting"
    ],
    icon: "☕"
  },
  {
    name: "Leftover Cooked Food",
    category: "Biodegradable Wet Waste",
    classification: "🟢 Green Bin - Wet Waste",
    degradationMethod: "Composting or Biogas (5-15 days)",
    disposalInstructions: [
      "Can be used as cattle feed if suitable and not spoiled",
      "Add to biogas plants if available in your area",
      "Compost in covered containers to avoid pests",
      "Separate oily food as it takes longer to decompose",
      "Municipal composting facilities can handle this effectively"
    ],
    icon: "🍛"
  },
  {
    name: "Paper, Cardboard, Notebooks",
    category: "Recyclable Dry Waste",
    classification: "🔵 Blue Bin - Dry Recyclable",
    degradationMethod: "Recycling Process",
    disposalInstructions: [
      "Keep clean and dry - wet paper cannot be recycled",
      "Remove plastic covers, spiral bindings, and staples",
      "Flatten cardboard boxes to save space",
      "Send to paper recycling units or kabadiwala",
      "Can be repurposed for crafts or packaging before recycling"
    ],
    icon: "📄"
  },
  {
    name: "Plastic Bottles (PET)",
    category: "Recyclable Plastic",
    classification: "🔵 Blue Bin - Plastic Recyclable",
    degradationMethod: "Recycling (450+ years if not recycled)",
    disposalInstructions: [
      "Rinse bottles to remove residue before recycling",
      "Remove caps and labels if possible",
      "Can be reused for safe storage of water or dry goods",
      "Send to authorized plastic recycling centers",
      "Check for recycling code (usually #1 PET) at bottom"
    ],
    icon: "🍾"
  },
  {
    name: "Plastic Bags, Wrappers, Chips Packets",
    category: "Non-Biodegradable Plastic Waste",
    classification: "⚫ Grey Bin - Non-Recyclable",
    degradationMethod: "Does not degrade (1000+ years)",
    disposalInstructions: [
      "Collect separately and send to authorized plastic waste handlers",
      "NEVER burn as it releases toxic fumes",
      "Look for plastic collection drives in your area",
      "Try to minimize usage by using cloth bags",
      "Some companies accept back for recycling (check brand websites)"
    ],
    icon: "🛍️"
  },
  {
    name: "Glass Bottles and Jars",
    category: "Recyclable Material",
    classification: "🟣 Glass Collection",
    degradationMethod: "Fully recyclable (degrades in 1 million+ years)",
    disposalInstructions: [
      "Clean and dry before recycling",
      "Do not break - intact glass has higher recycling value",
      "Remove metal caps and plastic labels",
      "Can be reused for storage before recycling",
      "Send to scrap dealers or glass recycling facilities"
    ],
    icon: "🫙"
  },
  {
    name: "Metal Cans, Foils, Bottle Caps",
    category: "Recyclable Metal",
    classification: "🟡 Metal Collection",
    degradationMethod: "Fully recyclable (50-200 years if buried)",
    disposalInstructions: [
      "Clean and flatten cans to save space",
      "Collect separately in a container",
      "Send to metal recyclers or kabadiwala",
      "Aluminum foils can be cleaned and recycled",
      "High recycling value - never throw in general waste"
    ],
    icon: "🥫"
  },
  {
    name: "Old Clothes, Rags, Fabrics",
    category: "Textile Waste",
    classification: "♻️ Textile Recycling",
    degradationMethod: "6 months - 5 years (natural fabrics)",
    disposalInstructions: [
      "Donate wearable clothes to NGOs or donation centers",
      "Torn clothes can be sent to textile recycling units",
      "Can be repurposed as cleaning rags",
      "Some brands offer take-back programs",
      "Natural fabrics (cotton) can be composted if shredded"
    ],
    icon: "👕"
  },
  {
    name: "Used Batteries",
    category: "E-Waste / Hazardous",
    classification: "🔴 E-Waste Collection Center",
    degradationMethod: "Toxic - Must be recycled properly",
    disposalInstructions: [
      "NEVER throw in regular waste",
      "Collect in a separate container",
      "Take to certified e-waste collection centers",
      "Many electronics stores accept used batteries",
      "Contains toxic heavy metals harmful to soil and water"
    ],
    icon: "🔋"
  },
  {
    name: "Mobile Phones, Chargers, Wires",
    category: "E-Waste",
    classification: "🔴 E-Waste Collection Center",
    degradationMethod: "Recycling through specialized facilities",
    disposalInstructions: [
      "Remove SIM cards and memory cards before disposal",
      "Erase all personal data from devices",
      "Take to manufacturer take-back programs",
      "Certified e-waste collectors will extract valuable metals",
      "Can also donate working devices to schools or NGOs"
    ],
    icon: "📱"
  },
  {
    name: "Medicines and Expired Tablets",
    category: "Biomedical Hazardous Waste",
    classification: "🔴 Biomedical Disposal",
    degradationMethod: "Special incineration required",
    disposalInstructions: [
      "NEVER flush medicines down the toilet",
      "Return to pharmacies with take-back programs",
      "Place in special biomedical waste bins (if available)",
      "Do not throw in regular garbage",
      "Contact your municipality for medical waste collection days"
    ],
    icon: "💊"
  },
  {
    name: "Sanitary Pads and Diapers",
    category: "Biomedical Waste",
    classification: "🔴 Biomedical Waste Bin",
    degradationMethod: "500-800 years if not disposed properly",
    disposalInstructions: [
      "Wrap in paper or newspaper",
      "Mark with a red dot for biomedical waste",
      "Dispose in separate sanitary waste bins (pink/red bins)",
      "Consider switching to biodegradable or reusable options",
      "NEVER flush down toilets - causes sewage blockages"
    ],
    icon: "🩹"
  },
  {
    name: "Broken Ceramics, Bulbs, Tubelights",
    category: "Hazardous Waste",
    classification: "🔴 Hazardous Waste Collection",
    degradationMethod: "Non-degradable / Contains mercury",
    disposalInstructions: [
      "Wrap carefully in newspaper to prevent injury",
      "Place in a separate bag marked 'sharp objects'",
      "Tubelights and CFLs contain mercury - very hazardous",
      "Send to authorized recycling units only",
      "NEVER break intentionally - releases toxic mercury vapor"
    ],
    icon: "💡"
  },
  {
    name: "Coconut Shells and Nutshells",
    category: "Biodegradable Hard Waste",
    classification: "🟢 Green Bin - Dry Organic",
    degradationMethod: "6-12 months for full decomposition",
    disposalInstructions: [
      "Can be composted but takes longer than soft organic waste",
      "Break into smaller pieces for faster decomposition",
      "Can be used for crafts, planters, or fuel",
      "Mix with wet waste in composting",
      "Municipal green waste collection can handle this"
    ],
    icon: "🥥"
  },
  {
    name: "Leaves, Grass, Garden Waste",
    category: "Biodegradable Yard Waste",
    classification: "🟢 Green Bin - Garden Waste",
    degradationMethod: "30-60 days composting",
    disposalInstructions: [
      "Best for composting or mulching",
      "Can be used directly as mulch for plants",
      "Municipal green waste collection trucks accept this",
      "Create leaf compost pit in your garden",
      "Dry leaves can be used as brown matter in composting"
    ],
    icon: "🍃"
  },
  {
    name: "Thermocol and Styrofoam",
    category: "Non-Biodegradable Plastic",
    classification: "⚫ Non-Recyclable Waste",
    degradationMethod: "Does not biodegrade (500+ years)",
    disposalInstructions: [
      "Avoid usage whenever possible",
      "Some specialized facilities can recycle - check locally",
      "If recycling not available, send to non-recyclable waste stream",
      "NEVER burn - releases toxic gases",
      "Try to refuse thermocol packaging when ordering items"
    ],
    icon: "📦"
  },
  {
    name: "Used Cooking Oil",
    category: "Hazardous Liquid Waste",
    classification: "🔴 Special Collection",
    degradationMethod: "Biodiesel conversion possible",
    disposalInstructions: [
      "NEVER pour into drains - causes blockages",
      "Let it cool and store in a sealed container",
      "Can be given to biodiesel recycling units",
      "Some restaurants and waste collectors accept used oil",
      "Small amounts can be mixed with sawdust and composted"
    ],
    icon: "🛢️"
  },
  {
    name: "Cigarette Butts",
    category: "Toxic Non-Biodegradable Waste",
    classification: "🔴 Hazardous Waste",
    degradationMethod: "10-12 years, toxic to environment",
    disposalInstructions: [
      "NEVER throw on roads or in drains",
      "Collect in closed containers",
      "Contains toxic chemicals and microplastics",
      "Send through hazardous waste handlers",
      "Some companies run cigarette waste collection programs"
    ],
    icon: "🚬"
  },
  {
    name: "Packaging Cartons (Amazon boxes, etc.)",
    category: "Recyclable Paper Waste",
    classification: "🔵 Blue Bin - Cardboard Recycling",
    degradationMethod: "Recycling process",
    disposalInstructions: [
      "Remove all tape and plastic packaging",
      "Flatten boxes to save storage space",
      "Keep clean and dry for better recycling value",
      "Send to paper recyclers or kabadiwala",
      "Can be reused for storage or creative projects before recycling"
    ],
    icon: "📦"
  }
];

export const searchWasteItem = (query: string): WasteItem | null => {
  const normalizedQuery = query.toLowerCase().trim();
  
  // Direct match
  const directMatch = wasteDatabase.find(item => 
    item.name.toLowerCase().includes(normalizedQuery)
  );
  
  if (directMatch) return directMatch;
  
  // Category match
  const categoryMatch = wasteDatabase.find(item => 
    item.category.toLowerCase().includes(normalizedQuery) ||
    normalizedQuery.split(' ').some(word => item.category.toLowerCase().includes(word))
  );
  
  if (categoryMatch) return categoryMatch;
  
  // Keyword match
  const keywords: Record<string, string[]> = {
    "fruit": ["Fruit and Vegetable Peels"],
    "vegetable": ["Fruit and Vegetable Peels"],
    "peel": ["Fruit and Vegetable Peels"],
    "tea": ["Used Tea Leaves and Coffee Grounds"],
    "coffee": ["Used Tea Leaves and Coffee Grounds"],
    "food": ["Leftover Cooked Food"],
    "paper": ["Paper, Cardboard, Notebooks"],
    "cardboard": ["Paper, Cardboard, Notebooks", "Packaging Cartons (Amazon boxes, etc.)"],
    "notebook": ["Paper, Cardboard, Notebooks"],
    "bottle": ["Plastic Bottles (PET)", "Glass Bottles and Jars"],
    "plastic": ["Plastic Bottles (PET)", "Plastic Bags, Wrappers, Chips Packets"],
    "bag": ["Plastic Bags, Wrappers, Chips Packets"],
    "wrapper": ["Plastic Bags, Wrappers, Chips Packets"],
    "chips": ["Plastic Bags, Wrappers, Chips Packets"],
    "glass": ["Glass Bottles and Jars"],
    "jar": ["Glass Bottles and Jars"],
    "metal": ["Metal Cans, Foils, Bottle Caps"],
    "can": ["Metal Cans, Foils, Bottle Caps"],
    "foil": ["Metal Cans, Foils, Bottle Caps"],
    "cloth": ["Old Clothes, Rags, Fabrics"],
    "clothes": ["Old Clothes, Rags, Fabrics"],
    "fabric": ["Old Clothes, Rags, Fabrics"],
    "battery": ["Used Batteries"],
    "mobile": ["Mobile Phones, Chargers, Wires"],
    "phone": ["Mobile Phones, Chargers, Wires"],
    "charger": ["Mobile Phones, Chargers, Wires"],
    "wire": ["Mobile Phones, Chargers, Wires"],
    "medicine": ["Medicines and Expired Tablets"],
    "tablet": ["Medicines and Expired Tablets"],
    "sanitary": ["Sanitary Pads and Diapers"],
    "pad": ["Sanitary Pads and Diapers"],
    "diaper": ["Sanitary Pads and Diapers"],
    "ceramic": ["Broken Ceramics, Bulbs, Tubelights"],
    "bulb": ["Broken Ceramics, Bulbs, Tubelights"],
    "tubelight": ["Broken Ceramics, Bulbs, Tubelights"],
    "coconut": ["Coconut Shells and Nutshells"],
    "shell": ["Coconut Shells and Nutshells"],
    "leaf": ["Leaves, Grass, Garden Waste"],
    "leaves": ["Leaves, Grass, Garden Waste"],
    "grass": ["Leaves, Grass, Garden Waste"],
    "garden": ["Leaves, Grass, Garden Waste"],
    "thermocol": ["Thermocol and Styrofoam"],
    "styrofoam": ["Thermocol and Styrofoam"],
    "oil": ["Used Cooking Oil"],
    "cooking": ["Used Cooking Oil"],
    "cigarette": ["Cigarette Butts"],
    "butt": ["Cigarette Butts"],
    "box": ["Packaging Cartons (Amazon boxes, etc.)"],
    "carton": ["Packaging Cartons (Amazon boxes, etc.)"],
    "amazon": ["Packaging Cartons (Amazon boxes, etc.)"]
  };
  
  for (const [keyword, items] of Object.entries(keywords)) {
    if (normalizedQuery.includes(keyword)) {
      const matchedItem = wasteDatabase.find(item => items.includes(item.name));
      if (matchedItem) return matchedItem;
    }
  }
  
  return null;
};
