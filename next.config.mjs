/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/api/:path*', // 匹配 /api/xxx 的请求
            destination: 'https://ok123.shop/:path*', // 将请求代理到目标地址
          },
        ];
      },
};

export default nextConfig;
