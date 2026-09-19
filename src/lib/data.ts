export const QUOTE_URL = "https://quote.kekki.club/";
export const IG_URL = "https://www.instagram.com/kekkicakerysg/";
export const REVIEWS_URL =
  "https://www.google.com/search?q=kekki+cakery+singapore+reviews";

export const px = (id: number, w = 1200, h?: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb${h ? `&fit=crop&w=${w}&h=${h}` : `&w=${w}`}`;

export const money = (n: number) =>
  `$${Number.isInteger(n) ? n : n.toFixed(2)}`;

/* ---------------------------------- NAV ---------------------------------- */

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/cakes", label: "Cakes" },
  { href: "/flavours", label: "Flavours" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

/* ------------------------------- CATEGORIES ------------------------------ */

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  image: string;
};

export const CATEGORIES: Category[] = [
  { slug: "classic", name: "Classic Cakes", tagline: "Timeless favourites, dressed to impress", image: px(32125164, 800, 1000) },
  { slug: "3d", name: "3D & Sculpted", tagline: "Cakes that defy gravity — almost", image: px(9553702, 800, 1000) },
  { slug: "photo", name: "Photo Cakes", tagline: "Your memories, deliciously printed", image: px(39449378, 800, 1000) },
  { slug: "kids", name: "Kids", tagline: "Confetti-level fun for little ones", image: px(16220888, 800, 1000) },
  { slug: "flowers", name: "Flowers", tagline: "Fresh blooms, buttercream petals", image: px(32125170, 800, 1000) },
  { slug: "wedding", name: "Wedding", tagline: "Tiered elegance for the big day", image: px(28259731, 800, 1000) },
  { slug: "bento", name: "Bento", tagline: "Tiny cakes, big feelings", image: px(35567498, 800, 1000) },
  { slug: "gender-reveal", name: "Gender Reveal", tagline: "The sweetest way to spill the secret", image: px(33158031, 800, 1000) },
  { slug: "for-him", name: "For Him", tagline: "Bold, dark, dangerously good", image: px(38689721, 800, 1000) },
  { slug: "for-her", name: "For Her", tagline: "Pretty, poised, utterly hers", image: px(34008841, 800, 1000) },
];

/* -------------------------------- FLAVOURS ------------------------------- */

export type Flavour = {
  slug: string;
  name: string;
  notes: string;
  sweetness: 1 | 2 | 3;
  tag?: string;
  swatch: string;
  image: string;
  /** product slug this flavour pairs best with */
  pair: string;
};

export const FLAVOURS: Flavour[] = [
  { slug: "vanilla-bean", name: "Madagascan Vanilla Bean", notes: "Cloud-soft chiffon folded with real vanilla pod crème", sweetness: 1, tag: "Bestseller", swatch: "#f6ead2", image: px(29192543, 800, 620), pair: "confetti-club" },
  { slug: "belgian-choc", name: "70% Belgian Dark Chocolate", notes: "Deep, silky ganache between moist fudge layers — never cloying", sweetness: 2, tag: "Bestseller", swatch: "#5b3a2e", image: px(38897439, 800, 620), pair: "gilded-truffle" },
  { slug: "earl-grey-lavender", name: "Earl Grey Lavender", notes: "Bergamot-kissed sponge with a whisper of lavender cream", sweetness: 1, tag: "Signature", swatch: "#b7a5e6", image: px(32125164, 800, 620), pair: "lavender-dream" },
  { slug: "ondeh-ondeh", name: "Ondeh Ondeh", notes: "Pandan chiffon, gula melaka lava and coconut snow", sweetness: 2, tag: "SG Favourite", swatch: "#9fd3a8", image: px(5149337, 800, 620), pair: "little-wonder" },
  { slug: "strawberry-shortcake", name: "Strawberry Shortcake", notes: "Chantilly cream and macerated Korean strawberries", sweetness: 1, tag: "Less Sweet", swatch: "#f6c9d9", image: px(11136872, 800, 620), pair: "bloom-and-berry" },
  { slug: "salted-caramel-biscoff", name: "Salted Caramel Biscoff", notes: "Burnt caramel drizzle over spiced biscuit crunch", sweetness: 3, tag: "Crowd Pleaser", swatch: "#d9a94e", image: px(34174206, 800, 620), pair: "midnight-crunch" },
  { slug: "matcha-white-peach", name: "Matcha White Peach", notes: "Uji matcha sponge with gently poached white peach", sweetness: 1, tag: "New", swatch: "#a8c69f", image: px(30700689, 800, 620), pair: "garden-waltz" },
  { slug: "yuzu-lemon", name: "Yuzu Lemon Cloud", notes: "Bright Japanese citrus curd, impossibly light", sweetness: 2, tag: "Less Sweet", swatch: "#f2df8e", image: px(20009396, 800, 620), pair: "mini-muse-bento" },
  { slug: "pistachio-rose", name: "Pistachio Rose", notes: "Roasted Sicilian pistachio cream with rosewater cream cheese", sweetness: 2, tag: "Luxe Pick", swatch: "#b9c98d", image: px(31377999, 800, 620), pair: "heart-of-rose" },
  { slug: "thai-milk-tea", name: "Thai Milk Tea", notes: "Slow-brewed cha tra mue infused into silky layers", sweetness: 2, tag: "SG Favourite", swatch: "#e0a36c", image: px(5594491, 800, 620), pair: "picture-perfect" },
  { slug: "cookies-cream", name: "Cookies & Cream", notes: "A little one approved classic with crushed cookie crumble", sweetness: 3, tag: "Kids Love It", swatch: "#d8d3cf", image: px(6744415, 800, 620), pair: "cubby-bear-bento" },
  { slug: "pandan-gula-melaka", name: "Pandan Gula Melaka", notes: "Heritage pandan layered with caramelised coconut sugar", sweetness: 2, tag: "Egg-free Option", swatch: "#88c795", image: px(37327284, 800, 620), pair: "sculpted-dreams" },
];

/* -------------------------------- PRODUCTS ------------------------------- */

export type Size = { name: string; serves: string; price: number };

export type AddOn = { slug: string; name: string; price: number; desc: string };

export const ADDONS: AddOn[] = [
  { slug: "extra-cream", name: "Extra Silky Cream Layer", price: 10, desc: "An extra layer of our Swiss meringue buttercream — taller, richer, creamier" },
  { slug: "full-beauty", name: "Full Bloom Glow-Up", price: 18, desc: "The extra-beautiness package: double blooms, glossy drip & fine detail piping" },
  { slug: "flower-bouquet", name: "Fresh Flower Mini Bouquet", price: 28, desc: "Seasonal blooms, florist-wrapped to match your cake" },
  { slug: "gold-leaf", name: "24k Gold Leaf Finish", price: 12, desc: "Hand-applied gilded accents" },
  { slug: "cake-topper", name: "Acrylic Celebration Topper", price: 9, desc: "Reusable keepsake topper, your wording" },
  { slug: "message-plaque", name: "Hand-piped Chocolate Plaque", price: 6, desc: "Up to 25 characters of sweet nothings" },
  { slug: "number-candles", name: "Sparkle Number Candles", price: 4, desc: "Slow-burn glitter candles" },
  { slug: "gift-box", name: "Keepsake Gift Box & Ribbon", price: 8, desc: "Our signature lavender box, ready to gift" },
];

/** Hand-piped name / short message written directly on the cake */
export const NAME_ON_CAKE_PRICE = 8;
export const NAME_ON_CAKE_MAX = 20;

export type Product = {
  slug: string;
  name: string;
  category: string;
  image: string;
  basePrice: number;
  sizes: Size[];
  rating: number;
  reviews: number;
  badges: string[];
  desc: string;
  leadDays: number;
};

const STD_SIZES: Size[] = [
  { name: "Petite 4\u2033", serves: "Serves 4–6", price: 0 },
  { name: "Classic 6\u2033", serves: "Serves 8–12", price: 30 },
  { name: "Grand 8\u2033", serves: "Serves 15–20", price: 65 },
];

const BENTO_SIZES: Size[] = [
  { name: "Bento 4\u2033", serves: "Serves 1–2", price: 0 },
  { name: "Bento Duo", serves: "Two bentos", price: 38 },
  { name: "Bento Party (4)", serves: "Serves 6–8", price: 128 },
];

export const PRODUCTS: Product[] = [
  { slug: "lavender-dream", name: "Lavender Dream", category: "classic", image: px(29192489, 900, 1100), basePrice: 78, sizes: STD_SIZES, rating: 4.9, reviews: 212, badges: ["Bestseller", "Less Sweet"], desc: "Our house signature — vintage piped swirls in lilac buttercream over Earl Grey Lavender chiffon. The cake that started the Kekki obsession.", leadDays: 4 },
  { slug: "garden-waltz", name: "Garden Waltz", category: "flowers", image: px(32125167, 900, 1100), basePrice: 88, sizes: STD_SIZES, rating: 5.0, reviews: 96, badges: ["New"], desc: "Fresh pink blooms tumbling down silky vanilla buttercream. Each cake is arranged by hand, so no two Garden Waltzes ever bloom the same way.", leadDays: 4 },
  { slug: "bloom-and-berry", name: "Bloom & Berry", category: "flowers", image: px(32125170, 900, 1100), basePrice: 92, sizes: STD_SIZES, rating: 4.9, reviews: 143, badges: ["Bestseller"], desc: "Strawberry Shortcake layers crowned with fresh florals and greenery. Light, bright and impossibly photogenic.", leadDays: 4 },
  { slug: "eternal-love", name: "Eternal Love", category: "wedding", image: px(28259730, 900, 1100), basePrice: 480, sizes: [{ name: "Two-Tier", serves: "Serves 30–40", price: 0 }, { name: "Three-Tier", serves: "Serves 60–80", price: 320 }, { name: "Four-Tier", serves: "Serves 100–120", price: 680 }], rating: 5.0, reviews: 41, badges: ["By Consultation"], desc: "Tiered ivory elegance dressed in fresh roses. Includes a complimentary tasting box and design consultation with our head caketier.", leadDays: 10 },
  { slug: "gilded-truffle", name: "Gilded Truffle", category: "for-him", image: px(38689701, 900, 1100), basePrice: 98, sizes: STD_SIZES, rating: 4.8, reviews: 88, badges: ["Luxe Pick"], desc: "70% Belgian dark chocolate ganache finished with 24k gold leaf. Brooding, glossy and quietly extravagant.", leadDays: 4 },
  { slug: "midnight-crunch", name: "Midnight Crunch", category: "for-him", image: px(38897451, 900, 1100), basePrice: 82, sizes: STD_SIZES, rating: 4.9, reviews: 133, badges: ["Bestseller"], desc: "Layered dark chocolate with salted caramel crunch and a dramatic ganache drip. For the one who says they don't like cake.", leadDays: 4 },
  { slug: "cubby-bear-bento", name: "Cubby Bear Bento", category: "bento", image: px(35567498, 900, 1100), basePrice: 46, sizes: BENTO_SIZES, rating: 5.0, reviews: 304, badges: ["Bestseller", "Kids Love It"], desc: "The little lunchbox cake that broke our Instagram. Choose your message and your Cubby's mood — grumpy Cubby costs nothing extra.", leadDays: 3 },
  { slug: "mini-muse-bento", name: "Mini Muse Bento", category: "bento", image: px(31899739, 900, 1100), basePrice: 42, sizes: BENTO_SIZES, rating: 4.8, reviews: 171, badges: ["Less Sweet"], desc: "A petite charlotte-style bento piled with seasonal fruit. Perfect for proposals, apologies and Tuesday afternoons.", leadDays: 3 },
  { slug: "confetti-club", name: "Confetti Club", category: "kids", image: px(16220888, 900, 1100), basePrice: 85, sizes: STD_SIZES, rating: 4.9, reviews: 117, badges: ["Kids Love It"], desc: "Funfetti vanilla sponge, sprinkle-loaded buttercream and a balloon garland topper. Guaranteed gasps at the party table.", leadDays: 4 },
  { slug: "little-wonder", name: "Little Wonder", category: "gender-reveal", image: px(33158031, 900, 1100), basePrice: 108, sizes: STD_SIZES, rating: 5.0, reviews: 62, badges: ["Secret-keeper"], desc: "Neutral pastel outside, the big reveal hidden inside. Email us the sealed results and we'll take the secret to the oven.", leadDays: 5 },
  { slug: "picture-perfect", name: "Picture Perfect", category: "photo", image: px(39449378, 900, 1100), basePrice: 95, sizes: STD_SIZES, rating: 4.8, reviews: 74, badges: ["Edible Print"], desc: "Your favourite photo, edible-printed in high definition and framed with hand-piped florals. Send the image after checkout.", leadDays: 5 },
  { slug: "sculpted-dreams", name: "Sculpted Dreams", category: "3d", image: px(9553702, 900, 1100), basePrice: 168, sizes: [{ name: "Small Sculpture", serves: "Serves 8–10", price: 0 }, { name: "Showstopper", serves: "Serves 15–20", price: 120 }], rating: 5.0, reviews: 29, badges: ["By Consultation"], desc: "Hand-carved, gravity-flirting 3D cakes. Pianos, handbags, beloved pets — brief us and we'll engineer it in sponge.", leadDays: 7 },
  { slug: "heart-of-rose", name: "Heart of Rose", category: "for-her", image: px(34008841, 900, 1100), basePrice: 72, sizes: STD_SIZES, rating: 4.9, reviews: 158, badges: ["Bestseller"], desc: "Heart-shaped, bow-tied and blushing. Pistachio Rose layers beneath vintage ruffles — the internet's favourite love language.", leadDays: 4 },
];

export const productBySlug = (slug: string) =>
  PRODUCTS.find((p) => p.slug === slug);

export const categoryBySlug = (slug: string) =>
  CATEGORIES.find((c) => c.slug === slug);

/* ------------------------------ TESTIMONIALS ----------------------------- */

export type Testimonial = { name: string; quote: string; cake: string };

export const TESTIMONIALS: Testimonial[] = [
  { name: "Jolene", quote: "The cake was so pretty and tasted amazing! Not too sweet and everyone loved it.", cake: "Lavender Dream" },
  { name: "Aisyah", quote: "Kekki never disappoints! Super beautiful design and great taste. Will always come back!", cake: "Bloom & Berry" },
  { name: "Darren", quote: "Smooth process, friendly and patient. Cake turned out even better than expected!", cake: "Midnight Crunch" },
  { name: "Sarah T.", quote: "Ordered a bento cake for my husband and he refused to cut it for twenty minutes. Then demolished it in four.", cake: "Cubby Bear Bento" },
  { name: "Marcus L.", quote: "The gender reveal worked perfectly — the whole room screamed. Kekki kept our secret for two whole weeks.", cake: "Little Wonder" },
  { name: "Priya N.", quote: "Halal-certified AND gorgeous? My guests could not believe it. The ondeh ondeh flavour is unreal.", cake: "Garden Waltz" },
];

/* --------------------------------- BRANDS -------------------------------- */

export const BRANDS = [
  "VICTORIA'S SECRET",
  "AIA",
  "randstad",
  "zenyum",
  "CLOUD9",
  "ZIRCUIT",
  "food republic",
];

/* --------------------------------- GALLERY ------------------------------- */

export type GalleryItem = { image: string; title: string; category: string };

export const GALLERY: GalleryItem[] = [
  { image: px(29192543, 700, 880), title: "Vintage Rosettes", category: "classic" },
  { image: px(29388925, 700, 880), title: "Tiers of Joy", category: "wedding" },
  { image: px(18210554, 700, 880), title: "Blush Smile", category: "for-her" },
  { image: px(38986751, 700, 880), title: "Golden Hour", category: "wedding" },
  { image: px(7845536, 700, 880), title: "Choc Noir", category: "for-him" },
  { image: px(7600384, 700, 880), title: "Make a Wish", category: "kids" },
  { image: px(28869110, 700, 880), title: "Almond Praline Study", category: "classic" },
  { image: px(30321890, 700, 880), title: "Orchid Elegance", category: "wedding" },
  { image: px(13218486, 700, 880), title: "Dessert Table Dream", category: "classic" },
  { image: px(14017651, 700, 880), title: "Secret Garden", category: "flowers" },
  { image: px(38897439, 700, 880), title: "Midnight Crepe", category: "for-him" },
  { image: px(12102394, 700, 880), title: "Big Day, Little Hands", category: "kids" },
];

/* -------------------------------- INSTAGRAM ------------------------------ */

export const INSTAGRAM = [
  { image: px(7099886, 600, 600), caption: "He's One — mint smash cake day" },
  { image: px(4529011, 600, 600), caption: "Saturday's petit fours, piped at 6am" },
  { image: px(31928751, 600, 600), caption: "Berry garden minis for a bridal shower" },
  { image: px(37748387, 600, 600), caption: "Sprinkle science in progress" },
  { image: px(7966101, 600, 600), caption: "Buttercream cardio session" },
  { image: px(20561442, 600, 600), caption: "Rose study for a 50th" },
];

/* ----------------------------------- FAQ --------------------------------- */

export type FaqGroup = { group: string; items: { q: string; a: string }[] };

export const FAQS: FaqGroup[] = [
  {
    group: "Ordering & Lead Time",
    items: [
      { q: "How far in advance should I order?", a: "Most cakes need just 4 days' notice. Wedding, 3D sculpted and Little Wonder reveal cakes need 7–10 days as they're built to order. Slots are capped daily to keep quality high, so popular weekends sell out fast." },
      { q: "Can I place an urgent order?", a: "Urgent orders are based on availability. Tap any 'Get a Cake Quote' button to reach our quotation form — if a baker can squeeze you in safely, we will. A small rush fee may apply." },
      { q: "How do I order a fully custom design?", a: "Head to quote.kekki.club and send us your design references, event date and serving size. You'll receive a quotation within one working day, and accepted quotes can be converted into a payable order." },
    ],
  },
  {
    group: "Delivery & Self-Collection",
    items: [
      { q: "What are the delivery options and fees?", a: "Islandwide delivery is a flat $12, and free for orders above $120. Choose a Morning (10am–1pm) or Afternoon (2pm–6pm) slot at checkout. Fully booked dates are automatically unavailable." },
      { q: "Where do I self-collect?", a: "Self-collection is always free at Kekki Studio — 21 Lavender Lane, #01-05, Singapore 338227. Open Tuesday to Sunday, 10am–6pm. We're closed on Mondays so the bakers can rest their piping hands." },
      { q: "Can someone else collect on my behalf?", a: "Of course — just share your order number with them. Do remind them to keep the cake level in the car footwell, never on the seat." },
    ],
  },
  {
    group: "Cakes & Ingredients",
    items: [
      { q: "Are your cakes Halal?", a: "Yes — Kekki Cakery is MUIS Halal-Certified. Enjoy with confidence; our cakes are suitable for everyone at the table." },
      { q: "Are the cakes very sweet?", a: "We bake 'less sweet, more flavour' as our house style — most flavours sit at 1–2 on our sweetness scale. Tell us if your crowd prefers sweeter and we'll adjust." },
      { q: "How should I store my cake?", a: "Keep chilled and display at room temperature for no more than 1 hour before serving. Buttercream cakes taste best within 3 days; bentos are happiest eaten the same day." },
      { q: "Do you offer egg-free or nut-free options?", a: "Selected flavours have egg-free versions (look for the Egg-free Option tag). Please note our kitchen handles nuts, so we cannot guarantee nut-free cakes for severe allergies." },
    ],
  },
  {
    group: "Payment & Promotions",
    items: [
      { q: "What payment methods do you accept?", a: "All major credit and debit cards, plus PayNow. Custom and wedding orders are confirmed with a 50% deposit, with the balance due 3 days before your event." },
      { q: "How do Kekki Club rewards work?", a: "Members enjoy early access to seasonal drops, birthday month treats and members-only discount codes. Join at checkout — it's free and your future self will thank you." },
      { q: "Do you have discount codes?", a: "We release codes during campaigns and to Kekki Club members. Psst… WELCOME10 takes 10% off your first online order." },
    ],
  },
];

/* -------------------------------- DELIVERY ------------------------------- */

export const DELIVERY = {
  fee: 12,
  freeOver: 120,
  address: "21 Lavender Lane, #01-05 Kekki Studio, Singapore 338227",
  hours: "Tue – Sun, 10am – 6pm (closed Mondays)",
};

export type Discount = {
  code: string;
  type: "percent" | "freeDelivery";
  value: number;
  minSpend: number;
  label: string;
};

export const DISCOUNTS: Discount[] = [
  { code: "WELCOME10", type: "percent", value: 10, minSpend: 0, label: "10% off first order" },
  { code: "SWEET15", type: "percent", value: 15, minSpend: 150, label: "15% off orders $150+" },
  { code: "FREEDEL", type: "freeDelivery", value: 0, minSpend: 80, label: "Free delivery (min $80)" },
];

export const findDiscount = (code: string) =>
  DISCOUNTS.find((d) => d.code === code.trim().toUpperCase());
