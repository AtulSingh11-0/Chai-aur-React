import { Client, TablesDB, Query, ID } from "node-appwrite";
import config from "./src/config/config";
import { PostStatus } from "./src/constants/enums/postStatus";
import { calculateReadingTime } from "./src/utils/readingTime";

// --- CONFIGURATION ---
const APPWRITE_ENDPOINT = config.appwriteEndpoint;
const APPWRITE_PROJECT_ID = config.appwriteProjectId;
const APPWRITE_API_KEY = config.appwriteApiKey;
const DATABASE_ID = config.appwriteDatabaseId;
const TABLE_ID = config.appwritePostsTableId;

const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID)
  .setKey(APPWRITE_API_KEY);

const tablesDb = new TablesDB(client);

// --- SEED DATA ---
const authorIds = [
  "69429ac300017e48c29f",
  "6942983a000440bb97ab",
  "694282d60009510d48a1",
  "693e2d9a00294f609908",
];

const featuredImageIds = [
  "6942a2d1002b743ad81e",
  "694296cd001fe642489e",
  "6942929b001d8a12364b",
  "694287870035efa6a865",
];

const statuses = [
  PostStatus.ACTIVE,
  PostStatus.DRAFT,
  PostStatus.ARCHIVED,
  PostStatus.INACTIVE,
];

// --- LOGIC ---
const slugify = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
};

// Helper to generate massive styled content (~10k words)
const generateMegaContent = (title) => {
  let content = `<h1>${title}</h1><p><i>Published on: ${new Date().toLocaleDateString()}</i></p>`;
  content += `<p>Welcome to this deep dive into <b>${title}</b>. In this 10,000-word exploration, we analyze the intersection of technology, humanity, and the future.</p>`;

  const sections = [
    "The Historical Context",
    "Modern Implementations",
    "Theoretical Frameworks",
    "The Socio-Economic Impact",
    "Future Projections",
    "Technical Deep Dive",
    "Case Studies",
    "Common Pitfalls",
    "Expert Opinions",
    "Conclusion",
  ];

  sections.forEach((section) => {
    content += `<h2>${section}</h2>`;
    // Generates roughly 250 words per section
    for (let i = 0; i < 10; i++) {
      content += `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <u>Ut enim ad minim veniam</u>, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>`;
      content += `<p>Proin sed libero enim sed faucibus turpis in eu. <b>Faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis.</b> Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper. <a href="#">Learn more here.</a></p>`;
      content += `<blockquote>"Technology is best when it brings people together." - Someone Wise</blockquote>`;
    }
  });

  return content;
};

const titles = [
  "The Silent Revolution of Decentralized Systems",
  "How Quantum Computing Will Break Modern Encryption",
  "The Ethics of AI in Autonomous Artistic Creation",
  "Beyond the Screen: The Future of Neural Interfaces",
  "Sustainable Tech: Can We Code Our Way Out of Climate Change?",
  "The Psychology of Social Media in the 2020s",
  "Architecting the Impossible: Micro-Frontends at Scale",
  "Cybersecurity in the Age of State-Sponsored Warfare",
  "The Evolution of Programming Languages: From C to Mojo",
  "Biotech and the Singularity: Merging Man and Machine",
  "Space-Tech: The Commercialization of the Low Earth Orbit",
  "The Death of the Cookie: Privacy in a Tracked World",
  "Why Functional Programming is Making a Massive Comeback",
  "Building Resilience in High-Traffic Distributed Systems",
  "The Philosophy of Open Source: Why We Share for Free",
  "Augmented Reality: Replacing the Smartphone by 2030",
  "The Hidden Cost of Cloud Computing",
  "Edge Computing: Bringing Logic to the Source",
  "The Impact of 5G on Global Connectivity and IoT",
  "Digital Minimalism: Reclaiming Human Focus",
];

const seed = async () => {
  let count = 1;
  console.log("🚀 Starting Seeding Process...");
  for (const title of titles) {
    const slug = slugify(title);
    const megaContent = generateMegaContent(title);

    try {
      const randomStatus =
        statuses[Math.floor(Math.random() * statuses.length)];

      await tablesDb.createRow({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        rowId: ID.unique(),
        data: {
          title,
          content: megaContent,
          status: randomStatus,
          slug,
          publishedDate:
            randomStatus === PostStatus.ACTIVE
              ? new Date().toISOString()
              : null,
          authorId: authorIds[Math.floor(Math.random() * authorIds.length)],
          featuredImage:
            featuredImageIds[
              Math.floor(Math.random() * featuredImageIds.length)
            ],
          readingTime: calculateReadingTime(megaContent),
        },
      });
      console.log(`${count}. ✅ Seeded: ${title} (~10k words)`);
    } catch (err) {
      console.error(`${count}. ❌ Failed: ${title}`, err.message);
    }
    count++;
  }
};

seed();
