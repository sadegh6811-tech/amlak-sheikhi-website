import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/panel-sheikhi-2024/', '/api/'],
      },
    ],
    sitemap: 'https://amlak-sheikhi.ir/sitemap.xml',
    host: 'https://amlak-sheikhi.ir',
  };
}
