/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            `${NEXT_PUBLIC_SUPABASE_URL}`
        ]
    }
}

module.exports = nextConfig
