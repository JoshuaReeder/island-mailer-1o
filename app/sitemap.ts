import type { MetadataRoute } from "next"

const BASE = "https://islandmailer.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const routes = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/maui", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/north-shore-maui-advertising", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/central-maui-advertising", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/west-maui-advertising", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/south-maui-advertising", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/upcountry-maui-advertising", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/waitlist", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/resources", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/resources/advertise-to-locals-on-maui", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/resources/is-direct-mail-worth-it-small-business", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/resources/eddm-vs-shared-mailer-maui", priority: 0.6, changeFrequency: "monthly" as const },
  ]
  return routes.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))
}
