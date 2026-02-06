import { minikitConfig, ROOT_URL } from "@/minikit.config";

export async function GET() {
  const config = {
    accountAssociation: minikitConfig.accountAssociation,
    miniapp: {
      version: minikitConfig.miniapp.version,
      name: minikitConfig.miniapp.name,
      subtitle: minikitConfig.miniapp.subtitle,
      description: minikitConfig.miniapp.description,
      homeUrl: ROOT_URL,
      iconUrl: minikitConfig.miniapp.iconUrl,
      splashImageUrl: minikitConfig.miniapp.splashImageUrl,
      splashBackgroundColor: minikitConfig.miniapp.splashBackgroundColor,
      webhookUrl: minikitConfig.miniapp.webhookUrl,
      screenshotUrls: [...minikitConfig.miniapp.screenshotUrls],
      primaryCategory: minikitConfig.miniapp.primaryCategory,
      tags: [...minikitConfig.miniapp.tags],
      heroImageUrl: minikitConfig.miniapp.heroImageUrl,
      tagline: minikitConfig.miniapp.tagline,
      ogTitle: minikitConfig.miniapp.ogTitle,
      ogDescription: minikitConfig.miniapp.ogDescription,
      ogImageUrl: minikitConfig.miniapp.ogImageUrl,
      noindex: minikitConfig.miniapp.noindex,
    },
  };

  return Response.json(config);
}
