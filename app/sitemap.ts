import type { MetadataRoute } from "next"

const BASE = "https://islandmailer.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const routes = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/products", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/local-offers", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/maui", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/north-shore-maui-advertising", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/central-maui-advertising", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/west-maui-advertising", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/south-maui-advertising", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/upcountry-maui-advertising", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/waitlist", priority: 0.7, changeFrequency: "monthly" as const },
    // ===== Kauai (waitlist / coming soon) =====
    { path: "/kauai", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/east-side-kauai-advertising", priority: 0.75, changeFrequency: "monthly" as const },
    { path: "/north-shore-kauai-advertising", priority: 0.75, changeFrequency: "monthly" as const },
    { path: "/south-shore-kauai-advertising", priority: 0.75, changeFrequency: "monthly" as const },
    { path: "/west-side-kauai-advertising", priority: 0.75, changeFrequency: "monthly" as const },
    { path: "/lihue-kauai-advertising", priority: 0.75, changeFrequency: "monthly" as const },
    // ===== Oahu (waitlist / coming soon) =====
    { path: "/oahu", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/north-shore-oahu-advertising", priority: 0.75, changeFrequency: "monthly" as const },
    { path: "/windward-oahu-advertising", priority: 0.75, changeFrequency: "monthly" as const },
    { path: "/central-oahu-advertising", priority: 0.75, changeFrequency: "monthly" as const },
    { path: "/leeward-oahu-advertising", priority: 0.75, changeFrequency: "monthly" as const },
    { path: "/honolulu-oahu-advertising", priority: 0.75, changeFrequency: "monthly" as const },
    // ===== Big Island (waitlist / coming soon) =====
    { path: "/hawaii", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/hilo-hawaii-advertising", priority: 0.75, changeFrequency: "monthly" as const },
    { path: "/hamakua-hawaii-advertising", priority: 0.75, changeFrequency: "monthly" as const },
    { path: "/south-kohala-hawaii-advertising", priority: 0.75, changeFrequency: "monthly" as const },
    { path: "/north-kona-hawaii-advertising", priority: 0.75, changeFrequency: "monthly" as const },
    { path: "/south-kona-hawaii-advertising", priority: 0.75, changeFrequency: "monthly" as const },
    { path: "/puna-hawaii-advertising", priority: 0.75, changeFrequency: "monthly" as const },
    { path: "/kaau-hawaii-advertising", priority: 0.75, changeFrequency: "monthly" as const },
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
