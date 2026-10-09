import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'املاک شیخی صحنه',
    short_name: 'املاک شیخی',
    description: 'سامانه هوشمند و تخصصی خرید، فروش، رهن و اجاره ملک در شهرستان صحنه کرمانشاه',
    start_url: '/',
    display: 'standalone',
    background_color: '#064e3b',
    theme_color: '#047857',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
