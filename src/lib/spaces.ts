export type StudioSpace = {
  slug: string;
  petName: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
  highlights: string[];
  idealFor: string[];
};

export const spaces: StudioSpace[] = [
  {
    slug: "waffi-heritage",
    petName: "Waffi Heritage",
    category: "Traditional space",
    tagline: "Culture, texture, and timeless storytelling.",
    description:
      "A richly styled traditional set with warm woods, patterned textiles, and heritage details — made for cultural portraits, brand stories, and elevated lifestyle content.",
    image: "/spaces/heritage.jpg",
    highlights: ["Textured heritage styling", "Warm cinematic lighting", "Statement furniture"],
    idealFor: ["Cultural campaigns", "Portrait series", "Brand storytelling"],
  },
  {
    slug: "waffi-nest",
    petName: "Waffi Nest",
    category: "Maternity / kids space",
    tagline: "Soft light for soft beginnings.",
    description:
      "A gentle nursery-inspired set designed for maternity, newborn, and family moments — calm tones, plush textures, and flattering natural light.",
    image: "/spaces/nest.jpg",
    highlights: ["Soft pastel palette", "Nursery styling", "Family-ready props"],
    idealFor: ["Maternity shoots", "Kids content", "Family brands"],
  },
  {
    slug: "waffi-ivory",
    petName: "Waffi Ivory",
    category: "White themed space",
    tagline: "Clean canvas. Unlimited looks.",
    description:
      "An all-white minimal set that keeps the focus on talent and product. Bright, airy, and endlessly adaptable for fashion, beauty, and commercial work.",
    image: "/spaces/ivory.jpg",
    highlights: ["Pristine white surfaces", "Diffused soft light", "Minimalist props"],
    idealFor: ["Fashion", "Product", "Beauty campaigns"],
  },
  {
    slug: "waffi-blush",
    petName: "Waffi Blush",
    category: "Rose themed space",
    tagline: "Romantic glow with editorial polish.",
    description:
      "Blush tones, velvet textures, and soft glam lighting for romantic, feminine, and beauty-forward content that feels premium on camera.",
    image: "/spaces/blush.jpg",
    highlights: ["Rose & blush palette", "Velvet seating", "Glamorous ambience"],
    idealFor: ["Beauty brands", "Influencer content", "Romance campaigns"],
  },
  {
    slug: "waffi-glam",
    petName: "Waffi Glam",
    category: "Makeup studio space",
    tagline: "Where glow-ups get their close-up.",
    description:
      "A professional vanity bay with lighted mirrors and beauty-ready stations — perfect for MUAs, tutorials, and glam transformation content.",
    image: "/spaces/glam.jpg",
    highlights: ["Lighted vanity mirrors", "Beauty stations", "Content-ready angles"],
    idealFor: ["Makeup artists", "Tutorials", "Beauty launches"],
  },
  {
    slug: "waffi-ascent",
    petName: "Waffi Ascent",
    category: "Staircase space",
    tagline: "Drama in every step.",
    description:
      "A sculptural staircase set built for editorial movement, fashion reveals, and cinematic vertical compositions.",
    image: "/spaces/ascent.jpg",
    highlights: ["Architectural staircase", "Dramatic lighting", "Editorial depth"],
    idealFor: ["Fashion editorial", "Reels & TikToks", "Lookbooks"],
  },
  {
    slug: "waffi-suite",
    petName: "Waffi Suite",
    category: "Bedroom space",
    tagline: "Intimate lifestyle, elevated.",
    description:
      "A luxurious bedroom set for lifestyle brands, morning routines, and intimate product storytelling with hotel-suite energy.",
    image: "/spaces/suite.jpg",
    highlights: ["Premium bedding", "Soft ambient light", "Lifestyle props"],
    idealFor: ["Lifestyle brands", "Skincare", "Intimate apparel"],
  },
  {
    slug: "waffi-social",
    petName: "Waffi Social",
    category: "Games room / Bar space",
    tagline: "Playful nights. Scroll-stopping energy.",
    description:
      "A stylish bar and games lounge for nightlife vibes, social content, brand activations, and creator hangout shoots.",
    image: "/spaces/social.jpg",
    highlights: ["Bar counter set", "Games lounge", "Mood lighting"],
    idealFor: ["Beverage brands", "Creator collabs", "Party content"],
  },
  {
    slug: "waffi-desk",
    petName: "Waffi Desk",
    category: "Office space",
    tagline: "Boss energy, camera ready.",
    description:
      "A polished office set for founder stories, professional headshots, productivity content, and corporate brand films.",
    image: "/spaces/desk.jpg",
    highlights: ["Executive desk styling", "Clean backdrop", "Professional lighting"],
    idealFor: ["Founders", "Corporate brands", "LinkedIn content"],
  },
  {
    slug: "waffi-echo",
    petName: "Waffi Echo",
    category: "Podcast space",
    tagline: "Sound that looks as good as it sounds.",
    description:
      "An acoustic podcast bay with on-camera presence — microphones, warm lighting, and a set designed for talk shows and audio-first creators.",
    image: "/spaces/echo.jpg",
    highlights: ["Acoustic treatment", "Mic-ready setup", "Talk-show framing"],
    idealFor: ["Podcasts", "Interviews", "Audio brands"],
  },
  {
    slug: "waffi-hearth",
    petName: "Waffi Hearth",
    category: "Kitchen space",
    tagline: "Flavor, lifestyle, and food stories.",
    description:
      "A styled culinary kitchen with island staging for cooking shows, recipe reels, and food brand campaigns.",
    image: "/spaces/hearth.jpg",
    highlights: ["Kitchen island", "Warm pendant light", "Food-ready surfaces"],
    idealFor: ["Food brands", "Recipe creators", "Kitchenware"],
  },
  {
    slug: "waffi-canvas",
    petName: "Waffi Canvas",
    category: "Backdrop studio space",
    tagline: "Seamless. Flexible. Always on brand.",
    description:
      "A dedicated backdrop and cyclorama space for product packs, portraits, and fast turnaround commercial shoots.",
    image: "/spaces/canvas.jpg",
    highlights: ["Seamless backdrops", "Cyclorama corner", "Controlled lighting"],
    idealFor: ["Product packs", "Headshots", "E-commerce"],
  },
  {
    slug: "waffi-lounge",
    petName: "Waffi Lounge",
    category: "Lounge / sitting room",
    tagline: "Conversation-ready comfort.",
    description:
      "A refined sitting lounge for talk-style content, brand interviews, and cozy lifestyle scenes that feel lived-in and elevated.",
    image: "/spaces/lounge.jpg",
    highlights: ["Layered seating", "Ambient lamps", "Conversation framing"],
    idealFor: ["Interviews", "Lifestyle brands", "Creator chats"],
  },
  {
    slug: "waffi-passage",
    petName: "Waffi Passage",
    category: "Hallway space",
    tagline: "Runway energy in a corridor.",
    description:
      "A long gallery hallway with perspective drama — ideal for fashion walks, transitions, and cinematic walking shots.",
    image: "/spaces/passage.jpg",
    highlights: ["Long sightlines", "Gallery framing", "Editorial movement"],
    idealFor: ["Fashion walks", "Transitions", "Brand films"],
  },
  {
    slug: "waffi-terrace",
    petName: "Waffi Terrace",
    category: "Balcony space",
    tagline: "Open air. Golden hour ready.",
    description:
      "An outdoor balcony terrace for natural-light lifestyle content, golden-hour portraits, and fresh air brand moments.",
    image: "/spaces/terrace.jpg",
    highlights: ["Natural light", "Outdoor seating", "Skyline atmosphere"],
    idealFor: ["Golden hour", "Lifestyle outdoors", "Fresh air content"],
  },
];

export function getSpace(slug: string) {
  return spaces.find((s) => s.slug === slug);
}
