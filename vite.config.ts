import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

type LeadPayload = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  source?: string;
};

type NotionTextBlock = {
  text: {
    content: string;
  };
};

type NotionProperties = {
  Created: {
    title: NotionTextBlock[];
  };
  Name: {
    rich_text: NotionTextBlock[];
  } | {
    title: NotionTextBlock[];
  };
  Email: {
    email: string;
  };
  Company: {
    rich_text: NotionTextBlock[];
  };
  Phone: {
    phone_number: string | null;
  };
  Message: {
    rich_text: NotionTextBlock[];
  };
  Source: {
    select: {
      name: string;
    };
  };
  Status: {
    select: {
      name: string;
    };
  };
};

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "backend-integration",
      configureServer: async (server) => {
        const express = (await import("express")).default;
        const cors = (await import("cors")).default;
        const dotenv = (await import("dotenv")).default;

        dotenv.config({ override: true });

        const app = express();
        app.use(cors());
        app.use(express.json());

        const NOTION_API_KEY = process.env.NOTION_API_KEY || "";
        const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID || "";
        const NOTION_VERSION = "2022-06-28";
        const NOTION_TITLE_PROPERTY_NAME = "Created";
        const NOTION_NAME_PROPERTY_TYPE = "rich_text";

        function buildNotionProperties(
          { name, email, company, phone, message, source }: LeadPayload,
          namePropertyType = NOTION_NAME_PROPERTY_TYPE
        ): NotionProperties {
          const properties: NotionProperties = {
            [NOTION_TITLE_PROPERTY_NAME]: {
              title: [
                {
                  text: {
                    content: `${name} - ${new Date()
                      .toISOString()
                      .slice(0, 10)}`,
                  },
                },
              ],
            },
            Name:
              namePropertyType === "rich_text"
                ? { rich_text: [{ text: { content: name } }] }
                : { title: [{ text: { content: name } }] },
            Email: { email },
            Company: {
              rich_text: company ? [{ text: { content: company } }] : [],
            },
            Phone: { phone_number: phone || null },
            Message: {
              rich_text: [{ text: { content: message.slice(0, 2000) } }],
            },
            Source: { select: { name: source || "Contact Form" } },
            Status: { select: { name: "New" } },
          };

          return properties;
        }

        async function createNotionLead(
          payload: LeadPayload,
          namePropertyType = NOTION_NAME_PROPERTY_TYPE
        ) {
          return fetch("https://api.notion.com/v1/pages", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${NOTION_API_KEY}`,
              "Notion-Version": NOTION_VERSION,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              parent: { database_id: NOTION_DATABASE_ID },
              properties: buildNotionProperties(payload, namePropertyType),
            }),
          });
        }

        // Health check
        app.get("/api/health", (_req, res) => {
          res.json({
            status: "ok",
            database: NOTION_DATABASE_ID ? "configured" : "missing",
          });
        });

        // Contact form submission
        app.post("/api/contact", async (req, res) => {
          try {
            const { name, email, company, phone, message, source } = req.body;

            if (!name || !email || !message) {
              return res.status(400).json({
                success: false,
                error: "Name, email, and message are required.",
              });
            }

            if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
              console.error("Missing NOTION_API_KEY or NOTION_DATABASE_ID");
              return res.status(500).json({
                success: false,
                error: "Server configuration error.",
              });
            }

            const response = await createNotionLead({
              name,
              email,
              company,
              phone,
              message,
              source,
            });
            const data = (await response.json()) as {
              id?: string;
              message?: string;
              error?: string;
            };

            if (!response.ok) {
              console.error("Notion API error:", data);
              return res.status(500).json({
                success: false,
                error: data?.message || data?.error || "Failed to save lead.",
              });
            }

            console.log(
              `✅ New lead saved: ${name} (${email}) — Source: ${source || "Contact Form"}`
            );
            res.json({ success: true, id: data.id });
          } catch (err) {
            console.error("Server error:", err);
            res.status(500).json({
              success: false,
              error: "Internal server error.",
            });
          }
        });

        // Use Vite's middleware
        server.middlewares.use(app);
      },
    },
  ],
});
