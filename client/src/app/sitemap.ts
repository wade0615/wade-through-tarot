import { MetadataRoute } from 'next';
import { allTarotCards, TarotCard } from '@/data/tarotCards';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://your-domain.com'; // 請替換為您的實際域名
  
  // 靜態頁面
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/cards`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ];

  // 動態生成每張塔羅牌的頁面
  const cardPages = allTarotCards.map((card: TarotCard) => ({
    url: `${baseUrl}/cards/${card.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...cardPages];
} 