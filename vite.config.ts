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

        function buildNotionProperties(
          { name, email, company, phone, message, source }: LeadPayload
        ): any {
          const timestamp = new Date().toISOString().slice(0, 10);
          
          const properties: any = {
            "Created 2": {
              title: [{ text: { content: `${name} - ${timestamp}` } }],
            },
            Name: { rich_text: [{ text: { content: name } }] },
            Email: { email },
            Message: { rich_text: [{ text: { content: message.slice(0, 2000) } }] },
          };

          if (company) {
            properties.Company = { rich_text: [{ text: { content: company } }] };
          }

          if (phone) {
            properties.Phone = { phone_number: phone };
          }

          if (source) {
            properties.Source = { select: { name: source } };
          }

          properties.Status = { select: { name: "New" } };

          return properties;
        }

        function buildServiceSelectorProperties(payload: any): any {
          const { name, email, phone, company, message, source, answers, recommendation } = payload;
          const timestamp = new Date().toISOString().slice(0, 10);
          
          const properties: any = {
            "Created 2": { title: [{ text: { content: `${name} - ${timestamp}` } }] },
            Name: { rich_text: [{ text: { content: name } }] },
            Email: { email },
            Phone: { phone_number: phone },
            Message: { rich_text: [{ text: { content: message.slice(0, 2000) } }] },
            Source: { select: { name: source } },
            Status: { select: { name: "New" } },
          };

          if (company) {
            properties.Company = { rich_text: [{ text: { content: company } }] };
          }

          if (answers) {
            if (answers[1]) properties["SS - Question 1 Answer"] = { select: { name: answers[1] } };
            if (answers[2]) properties["SS - Question 2 Answer"] = { select: { name: answers[2] } };
            if (answers[3]) properties["SS - Question 3 Answer"] = { select: { name: answers[3] } };
            if (answers[4]) properties["SS - Question 4 Answer"] = { select: { name: answers[4] } };
            if (answers[5]) properties["SS - Question 5 Answer"] = { select: { name: answers[5] } };
            if (answers[6]) properties["SS - Question 6 Answer"] = { select: { name: answers[6] } };
          }

          if (recommendation) {
            if (recommendation.primary?.service) {
              properties["SS - Primary Service"] = { select: { name: recommendation.primary.service } };
            }
            if (recommendation.secondary?.service) {
              properties["SS - Secondary Service"] = { select: { name: recommendation.secondary.service } };
            }
            if (recommendation.fitScore !== undefined) {
              properties["SS - Fit Score"] = { number: recommendation.fitScore / 100 };
            }
            if (recommendation.timelineEstimate) {
              properties["SS - Timeline Estimate"] = { select: { name: recommendation.timelineEstimate } };
            }
            if (recommendation.costRange) {
              properties["SS - Cost Range"] = { select: { name: recommendation.costRange } };
            }
          }

          return properties;
        }

        function buildAutomationAuditProperties(payload: any): any {
          const { name, email, phone, company, message, source, categoryScores, percentage, insight, hoursSavablePerWeek, annualSavings } = payload;
          const timestamp = new Date().toISOString().slice(0, 10);
          
          const properties: any = {
            "Created 2": { title: [{ text: { content: `${name} - ${timestamp}` } }] },
            Name: { rich_text: [{ text: { content: name } }] },
            Email: { email },
            Phone: { phone_number: phone },
            Message: { rich_text: [{ text: { content: message.slice(0, 2000) } }] },
            Source: { select: { name: source } },
            Status: { select: { name: "New" } },
          };

          if (company) {
            properties.Company = { rich_text: [{ text: { content: company } }] };
          }

          if (percentage !== undefined) {
            properties["AA - Overall Score"] = { number: percentage / 100 };
          }

          if (insight?.tier) {
            properties["AA - Tier"] = { select: { name: insight.tier } };
          }

          if (insight?.title) {
            properties["AA - Insight Title"] = { rich_text: [{ text: { content: insight.title } }] };
          }

          if (categoryScores) {
            if (categoryScores["Process Efficiency"]) {
              properties["AA - Process Efficiency Score"] = { number: categoryScores["Process Efficiency"].percentage / 100 };
            }
            if (categoryScores["Tool Integration"]) {
              properties["AA - Tool Integration Score"] = { number: categoryScores["Tool Integration"].percentage / 100 };
            }
            if (categoryScores["Error Management"]) {
              properties["AA - Error Management Score"] = { number: categoryScores["Error Management"].percentage / 100 };
            }
            if (categoryScores["Lead Management"]) {
              properties["AA - Lead Management Score"] = { number: categoryScores["Lead Management"].percentage / 100 };
            }
          }

          if (hoursSavablePerWeek !== undefined) {
            properties["AA - Hours Savable/Week"] = { number: Math.round(hoursSavablePerWeek * 10) / 10 };
          }

          if (annualSavings !== undefined) {
            properties["AA - Annual Savings"] = { number: Math.round(annualSavings) };
          }

          return properties;
        }

        async function createNotionLead(payload: LeadPayload) {
          return fetch("https://api.notion.com/v1/pages", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${NOTION_API_KEY}`,
              "Notion-Version": NOTION_VERSION,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              parent: { database_id: NOTION_DATABASE_ID },
              properties: buildNotionProperties(payload),
            }),
          });
        }

        async function createServiceSelectorLead(payload: any) {
          return fetch("https://api.notion.com/v1/pages", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${NOTION_API_KEY}`,
              "Notion-Version": NOTION_VERSION,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              parent: { database_id: NOTION_DATABASE_ID },
              properties: buildServiceSelectorProperties(payload),
            }),
          });
        }

        async function createAutomationAuditLead(payload: any) {
          return fetch("https://api.notion.com/v1/pages", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${NOTION_API_KEY}`,
              "Notion-Version": NOTION_VERSION,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              parent: { database_id: NOTION_DATABASE_ID },
              properties: buildAutomationAuditProperties(payload),
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

        // Service Selector submission
        app.post("/api/service-selector", async (req, res) => {
          try {
            const { email, phone, answers, recommendation } = req.body;

            if (!email || !phone || !answers) {
              return res.status(400).json({
                success: false,
                error: "Email, phone, and answers are required.",
              });
            }

            if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
              console.error("Missing NOTION_API_KEY or NOTION_DATABASE_ID");
              return res.status(500).json({
                success: false,
                error: "Server configuration error.",
              });
            }

            // Build detailed message from answers and recommendation
            const answersText = Object.entries(answers)
              .map(([qId, answer]) => `Q${qId}: ${answer}`)
              .join(", ");

            const recommendationText = recommendation
              ? `Primary: ${recommendation.primary?.service}, Secondary: ${recommendation.secondary?.service}, Fit Score: ${recommendation.fitScore}%, Timeline: ${recommendation.timelineEstimate}, Cost: ${recommendation.costRange}`
              : "";

            const message = `Service Selector Results\n\nAnswers: ${answersText}\n\nRecommendation: ${recommendationText}`;

            const payload = {
              name: email.split("@")[0],
              email,
              company: "",
              phone,
              message,
              source: "Service Selector",
              answers,
              recommendation,
            };

            const response = await createServiceSelectorLead(payload);
            const data = (await response.json()) as {
              id?: string;
              message?: string;
              error?: string;
            };

            if (!response.ok) {
              console.error("Notion API error:", data);
              return res.status(500).json({
                success: false,
                error:
                  data?.message ||
                  data?.error ||
                  "Failed to save service selector data.",
              });
            }

            console.log(
              `✅ Service Selector submission saved: ${email} — Fit Score: ${recommendation?.fitScore}%`
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

        // Automation Audit submission
        app.post("/api/automation-audit", async (req, res) => {
          try {
            const {
              email,
              phone,
              scores,
              categoryScores,
              percentage,
              insight,
              hoursSavablePerWeek,
              annualSavings,
            } = req.body;

            if (!email || !phone || !scores) {
              return res.status(400).json({
                success: false,
                error: "Email, phone, and scores are required.",
              });
            }

            if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
              console.error("Missing NOTION_API_KEY or NOTION_DATABASE_ID");
              return res.status(500).json({
                success: false,
                error: "Server configuration error.",
              });
            }

            // Build detailed message from audit results
            const categoryBreakdown = categoryScores
              ? Object.entries(categoryScores)
                  .map(
                    ([category, data]: [string, any]) =>
                      `${category}: ${Math.round(data.percentage)}%`
                  )
                  .join(", ")
              : "";

            const message = `Automation Audit Results\n\nOverall Score: ${Math.round(percentage)}%\nTier: ${insight?.tier || "N/A"}\n\nCategory Breakdown: ${categoryBreakdown}\n\nEstimated Savings:\n- Hours/Week: ${Math.round(hoursSavablePerWeek || 0)}\n- Annual Savings: $${Math.round(annualSavings || 0).toLocaleString()}\n\nInsight: ${insight?.title || "N/A"}`;

            const payload = {
              name: email.split("@")[0],
              email,
              company: "",
              phone,
              message,
              source: "Automation Audit",
              scores,
              categoryScores,
              percentage,
              insight,
              hoursSavablePerWeek,
              annualSavings,
            };

            const response = await createAutomationAuditLead(payload);
            const data = (await response.json()) as {
              id?: string;
              message?: string;
              error?: string;
            };

            if (!response.ok) {
              console.error("Notion API error:", data);
              return res.status(500).json({
                success: false,
                error:
                  data?.message ||
                  data?.error ||
                  "Failed to save automation audit data.",
              });
            }

            console.log(
              `✅ Automation Audit submission saved: ${email} — Score: ${Math.round(percentage)}%`
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
