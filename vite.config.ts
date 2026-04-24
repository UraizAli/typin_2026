import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

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

            const notionPayload = {
              parent: { database_id: NOTION_DATABASE_ID },
              properties: {
                Name: { title: [{ text: { content: name } }] },
                Email: { email: email },
                Company: {
                  rich_text: company ? [{ text: { content: company } }] : [],
                },
                Phone: { phone_number: phone || null },
                Message: {
                  rich_text: [{ text: { content: message.slice(0, 2000) } }],
                },
                Source: { select: { name: source || "Contact Form" } },
                Status: { select: { name: "New" } },
              },
            };

            const response = await fetch("https://api.notion.com/v1/pages", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${NOTION_API_KEY}`,
                "Notion-Version": NOTION_VERSION,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(notionPayload),
            });

            const data = await response.json();

            if (!response.ok) {
              console.error("Notion API error:", data);
              return res.status(500).json({
                success: false,
                error: "Failed to save lead.",
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
