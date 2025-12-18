import { Client, TablesDB, ID } from "node-appwrite";
import config from "./src/config/config";
import { PostStatus } from "./src/constants/enums/postStatus";

// --- CONFIGURATION ---
const APPWRITE_ENDPOINT = config.appwriteEndpoint;
const APPWRITE_PROJECT_ID = config.appwriteProjectId; // Replace with yours
const APPWRITE_API_KEY = config.appwriteApiKey; // Needs 'documents.write' permission
const DATABASE_ID = config.appwriteDatabaseId;
const TABLE_ID = config.appwriteTableId;

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

const dummyPosts = [
  {
    title: "Understanding React Server Components",
    content:
      "<p>React Server Components (RSC) are changing the way we think about data fetching and bundle sizes. By moving logic to the server, we reduce the JavaScript sent to the client.</p><b>Key Benefits:</b><ul><li>Zero bundle size for server-only code</li><li>Automatic code splitting</li><li>Full access to server resources</li></ul>",
  },
  {
    title: "A Guide to Appwrite Function Runtimes",
    content:
      "<p>Appwrite Functions support multiple runtimes including Node.js, Python, and Ruby. In this guide, we explore how to deploy a <i>Node.js</i> function to handle custom backend logic.</p>",
  },
  {
    title: "Tailwind CSS: Beyond the Basics",
    content:
      "<p>Standard utility classes are great, but have you explored <b>Arbitrary Values</b> or <b>Custom Configurations</b>? Learn how to extend your theme for unique designs.</p>",
  },
  {
    title: "Why TypeScript is Essential for Large Apps",
    content:
      "<p>Type safety prevents 80% of common bugs. We look at <i>Interfaces</i>, <i>Generics</i>, and how <code>Utility Types</code> make your codebase maintainable.</p>",
  },
  {
    title: "Building a Real-time Chat with WebSockets",
    content:
      "<p>Real-time communication is the heart of modern apps. We explain how to use <b>Socket.io</b> alongside a React frontend for instant messaging.</p>",
  },
  {
    title: "Mastering the Browser DevTools",
    content:
      "<p>Are you only using the console? Discover the <b>Network tab</b>, <b>Performance profiler</b>, and the <b>Memory leak detector</b> to build high-performance web apps.</p>",
  },
  {
    title: "State Management: Redux vs Context API",
    content:
      "<p>When should you reach for Redux? We compare the two most popular ways to manage state in React and explain the <i>'Prop Drilling'</i> problem.</p>",
  },
  {
    title: "The Rise of AI-Assisted Coding",
    content:
      "<p>AI agents and Copilots are becoming a developer's best friend. <b>Is your job safe?</b> We discuss why AI is a tool for efficiency, not a replacement for logic.</p>",
  },
  {
    title: "Securing Your Appwrite Database",
    content:
      "<p>Security is not an afterthought. Learn how to implement <b>Role-Based Access Control (RBAC)</b> and document-level permissions in Appwrite.</p>",
  },
  {
    title: "The Zen of Python: Writing Clean Code",
    content:
      "<p>Pythonic code is more than just working code. We explore <code>list comprehensions</code>, <code>decorators</code>, and the <i>PEP 8</i> style guide.</p>",
  },
  {
    title: "Getting Started with Docker Containers",
    content:
      "<p>Stop saying 'it works on my machine.' Docker ensures your app runs the same everywhere. Learn about <b>Dockerfiles</b> and <b>Compose</b>.</p>",
  },
  {
    title: "Unit Testing with Jest and React Testing Library",
    content:
      "<p>Test the behavior, not the implementation. We show you how to write tests that give you 100% confidence in your deployments.</p>",
  },
  {
    title: "Microservices vs Monolithic Architecture",
    content:
      "<p>Should you split your backend into tiny pieces? We weigh the <b>complexity of Microservices</b> against the <b>simplicity of a Modular Monolith</b>.</p>",
  },
  {
    title: "Creating Custom React Hooks",
    content:
      "<p>Don't repeat yourself. Learn how to extract reusable logic into hooks like <code>useLocalStorage</code> or <code>useWindowSize</code>.</p>",
  },
  {
    title: "Introduction to GraphQL and Apollo",
    content:
      "<p>Stop over-fetching data. GraphQL allows the frontend to ask for exactly what it needs and nothing more. <b>The end of REST?</b> Maybe not yet.</p>",
  },
  {
    title: "Building Accessible Web Components",
    content:
      "<p>Accessibility (a11y) is a human right. We look at <b>ARIA roles</b>, keyboard navigation, and why semantic HTML is the foundation of the web.</p>",
  },
  {
    title: "Serverless Databases: The Next Frontier",
    content:
      "<p>Databases that scale to zero. We look at <i>Neon</i>, <i>PlanetScale</i>, and how they integrate with modern React frameworks.</p>",
  },
  {
    title: "Effective Project Management for Developers",
    content:
      "<p>Agile, Scrum, or Kanban? Discover how to manage your <b>Weekly Releases</b> without burning out. Just like our current blog roadmap!</p>",
  },
  {
    title: "Understanding the DOM and Virtual DOM",
    content:
      "<p>How does React actually update the screen? We dive into the <b>reconciliation algorithm</b> and the diffing process that makes React fast.</p>",
  },
  {
    title: "The Future of WebAssembly (Wasm)",
    content:
      "<p>Running high-performance C++ or Rust code in the browser is now a reality. Explore the use cases for <b>Wasm</b> in video editing and gaming.</p>",
  },
];

// --- LOGIC ---
const slugify = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
};

const seedDatabase = async () => {
  console.log("🚀 Starting Seeding Process...");

  for (const post of dummyPosts) {
    try {
      const randomStatus =
        statuses[Math.floor(Math.random() * statuses.length)];

      const data = {
        title: post.title,
        content: post.content,
        publishedDate:
          randomStatus === PostStatus.ACTIVE ? new Date().toISOString() : null,
        status: randomStatus,
        slug: slugify(post.title),
        authorId: authorIds[Math.floor(Math.random() * authorIds.length)],
        featuredImage:
          featuredImageIds[Math.floor(Math.random() * featuredImageIds.length)],
      };

      const response = await tablesDb.createRow({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        rowId: ID.unique(),
        data,
      });
      console.log(`✅ Created ${randomStatus} post: ${response.title}`);
    } catch (error) {
      console.error(`❌ Error creating [${post.title}]:`, error.message);
    }
  }
  console.log("🏁 Seeding Finished!");
};

seedDatabase();
