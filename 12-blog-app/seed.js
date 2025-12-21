import { Client, TablesDB, Query, ID } from "node-appwrite";
import config from "./src/config/config";
import { PostStatus } from "./src/constants/enums/postStatus";
import engagementService from "./src/lib/engagementService";
import { calculateReadingTime } from "./src/utils/readingTime";

// --- CONFIGURATION ---
const APPWRITE_ENDPOINT = config.appwriteEndpoint;
const APPWRITE_PROJECT_ID = config.appwriteProjectId;
const APPWRITE_API_KEY = config.appwriteApiKey;
const DATABASE_ID = config.appwriteDatabaseId;
const TABLE_ID = config.appwritePostTableId;

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

const commentTexts = [
  "Great post! Really helped me understand the topic better.",
  "I disagree with some points, but overall a good read.",
  "Can you provide more examples on this subject?",
  "This was very insightful, thank you for sharing!",
  "Looking forward to your next article!",
  "I found a typo in the third paragraph.",
  "How does this compare to other similar technologies?",
  "This topic is quite complex, but you explained it well.",
  "I appreciate the depth of research that went into this.",
  "Could you recommend further reading on this?",
  "I learned something new today, thanks!",
  "This article changed my perspective on the subject.",
  "I have a question about one of the concepts you mentioned.",
  "Thanks for breaking this down so clearly!",
  "I think you missed an important aspect of the topic.",
  "This is exactly what I was looking for!",
  "Your writing style makes complex topics easy to understand.",
  "I shared this with my team, they found it useful too.",
  "What are the practical applications of this knowledge?",
  "This is a must-read for anyone interested in the field.",
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

const fetchDatabaseRows = async () => {
  try {
    const response = await tablesDb.listRows({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      queries: [Query.limit(100)],
    });
    return response;
  } catch (error) {
    console.error("❌ Error fetching rows:", error.message);
    return [];
  }
};

const updateLikesAndCommentsCount = async () => {
  try {
    const posts = await fetchDatabaseRows();

    console.info(
      `📊 Updating Likes and Comments Count for ${posts.total} posts...`
    );

    // let count = 0;
    // for (const post of posts.rows) {
    // const likesCount = Math.floor(Math.random() * 501); // 0 to 500
    // const commentsCount = Math.floor(Math.random() * 201); // 0 to 200

    // await tablesDb.updateRow({
    //   databaseId: DATABASE_ID,
    //   tableId: TABLE_ID,
    //   rowId: post.$id,
    //   data: {
    //     likesCount,
    //     commentsCount,
    //   },
    // });

    // console.log(
    //   `${++count}. ✅ Updated Post: "${
    //     post.title
    //   }" | Likes: ${likesCount}, Comments: ${commentsCount}`
    // );
    // }
  } catch (err) {
    console.error("Error updating likes and comments count:", err);
    throw err;
  }
};

const seedCommentsTable = async () => {
  // post id
  const post = {
    $createdAt: "2025-12-17T11:38:54.679+00:00",
    $databaseId: "6936e572000c85c11ecc",
    $id: "6942964e000c1a92565a",
    $permissions:
      Array(3)[
        ('read("user:694282d60009510d48a1")',
        'update("user:694282d60009510d48a1")',
        'delete("user:694282d60009510d48a1")')
      ],
    $sequence: 3,
    $tableId: "article",
    $updatedAt: "2025-12-20T13:49:37.126+00:00",
    authorId: "694282d60009510d48a1",
    commentsCount: 161,
    content: "<p>wewfg er erer erger er er rre er er ererg ererg</p>",
    featuredImage: "6942964c000797851a39",
    likesCount: 203,
    publishedDate: "2025-12-17T11:43:01.961+00:00",
    readingTime: 1,
    slug: "erege-fr-gre-ge-g-ge",
    status: "active",
    title: "erege fr gre ge g ge ",
  };
  let count = 1;

  console.log("🚀 Starting Seeding Comments Process...");

  for (const text of commentTexts) {
    try {
      const response = await tablesDb.createRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteCommentsTableId,
        rowId: ID.unique(),
        data: {
          postId: post.$id,
          userId: authorIds[Math.floor(Math.random() * authorIds.length)],
          commentText: text,
        },
      });

      console.log(`${count}. ✅ Seeded comment: ${text}`);
    } catch (err) {
      console.error(`${count} ❌ Failed to seed comment: ${text}`, err.message);
    }
    count++;
  }
};

const updateUsernamesInComments = async () => {
  try {
    const comments = await tablesDb.listRows({
      databaseId: config.appwriteDatabaseId,
      tableId: config.appwriteCommentsTableId,
      queries: [Query.limit(100)],
    });

    console.info(`📊 Updating usernames for ${comments.total} comments...`);

    for (const comment of comments.rows) {
      await tablesDb.updateRow({
        databaseId: config.appwriteDatabaseId,
        tableId: config.appwriteCommentsTableId,
        rowId: comment.$id,
        data: {
          username: `Anonymous` + `_${comment.userId.substring(15, 20)}`,
        },
      });
    }
    console.log("✅ Usernames updated successfully in comments.");
  } catch (err) {
    console.error("Error updating usernames in comments:", err);
    throw err;
  }
};

// updateUsernamesInComments();

// seedCommentsTable();

// updateLikesAndCommentsCount();

// seedDatabase();
