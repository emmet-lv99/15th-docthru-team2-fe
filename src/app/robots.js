export default function robots() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://docthru-35785506844.asia-northeast3.run.app';
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/mypage',
        '/my-challenges/',
        '/my-applications/',
        '/api/',
        '/login',
        '/signup',
        '/password-reset/',
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
