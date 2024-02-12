/** @type {import('next').NextConfig} */
module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'img.clerk.com'
        },
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com'
        },
        {
          protocol: 'https',
          hostname: 'cdnjs.cloudflare.com/'
        }
      ],
    },
  }
