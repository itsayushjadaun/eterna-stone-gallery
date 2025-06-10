
export interface Stone {
  id: string;
  name: string;
  description: string;
  detailedDescription: string;
  properties: string[];
  origin: string;
  price: string;
  image: string;
  category: string;
  chakra?: string;
  zodiac?: string[];
}

export const stones: Stone[] = [
  {
    id: "amethyst",
    name: "Amethyst",
    description: "Deep violet quartz known for calming energy and spiritual protection.",
    detailedDescription: "Amethyst is a powerful and protective stone with a high spiritual vibration. It guards against psychic attack, transmuting the energy into love. A natural tranquilizer, Amethyst blocks negative energy and stimulates the Third Eye chakra.",
    properties: ["Calming", "Spiritual Protection", "Enhances Intuition", "Promotes Clarity"],
    origin: "Brazil, Uruguay, Madagascar",
    price: "$45 - $280",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=800&q=80",
    category: "Healing Crystals",
    chakra: "Crown Chakra",
    zodiac: ["Pisces", "Virgo", "Aquarius"]
  },
  {
    id: "citrine",
    name: "Citrine",
    description: "Golden crystal believed to bring prosperity and abundance.",
    detailedDescription: "Known as the 'Merchant's Stone', Citrine is said to bring prosperity and abundance. This beautiful golden stone carries the energy of the sun, promoting vitality, confidence, and personal power. It never needs cleansing and helps manifest goals.",
    properties: ["Abundance", "Confidence", "Manifestation", "Energy Boost"],
    origin: "Brazil, Madagascar, Russia",
    price: "$25 - $150",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80",
    category: "Prosperity Stones",
    chakra: "Solar Plexus",
    zodiac: ["Gemini", "Aries", "Libra"]
  },
  {
    id: "labradorite",
    name: "Labradorite",
    description: "Iridescent surface stone, perfect for enhancing intuition.",
    detailedDescription: "Labradorite is a stone of transformation and magic. Its beautiful play of colors, known as labradorescence, awakens one's magical abilities and psychic powers. This mystical stone strengthens intuition and provides clarity during times of change.",
    properties: ["Transformation", "Intuition", "Protection", "Magical Enhancement"],
    origin: "Madagascar, Finland, Canada",
    price: "$35 - $200",
    image: "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?auto=format&fit=crop&w=800&q=80",
    category: "Mystical Stones",
    chakra: "Third Eye",
    zodiac: ["Leo", "Scorpio", "Sagittarius"]
  },
  {
    id: "rose-quartz",
    name: "Rose Quartz",
    description: "Pink crystal of unconditional love and emotional healing.",
    detailedDescription: "Known as the stone of unconditional love, Rose Quartz carries a soft feminine energy of compassion and peace. It speaks directly to the Heart Chakra, dissolving emotional wounds and fears, and teaching the true essence of love.",
    properties: ["Unconditional Love", "Emotional Healing", "Self-Love", "Compassion"],
    origin: "Brazil, Madagascar, India",
    price: "$20 - $120",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
    category: "Love Stones",
    chakra: "Heart Chakra",
    zodiac: ["Taurus", "Libra"]
  },
  {
    id: "tiger-eye",
    name: "Tiger's Eye",
    description: "Golden-brown stone for courage, confidence, and grounding.",
    detailedDescription: "Tiger's Eye is a powerful stone that helps you to release fear and anxiety and aids harmony and balance. It stimulates taking action and helps you to make decisions with discernment and understanding, unclouded by emotions.",
    properties: ["Courage", "Confidence", "Protection", "Grounding"],
    origin: "South Africa, Australia, India",
    price: "$15 - $80",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=800&q=80",
    category: "Protection Stones",
    chakra: "Solar Plexus",
    zodiac: ["Capricorn", "Leo"]
  },
  {
    id: "clear-quartz",
    name: "Clear Quartz",
    description: "Master healer crystal that amplifies energy and intention.",
    detailedDescription: "Clear Quartz is known as the 'Master Healer' and will amplify energy and thought, as well as the effect of other crystals. It absorbs, stores, releases and regulates energy and is excellent for unblocking it.",
    properties: ["Amplification", "Clarity", "Healing", "Purification"],
    origin: "Brazil, Arkansas, Madagascar",
    price: "$10 - $100",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80",
    category: "Master Healers",
    chakra: "All Chakras",
    zodiac: ["All Signs"]
  }
];
