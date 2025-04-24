let userConfig = {}
if (!process.env.VERCEL) {
  try {
    userConfig = require('./v0-user-next.config')
  } catch (e) {
    // локальный кастомный конфиг отсутствует — игнорируем
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Отключает ошибки ESLint во время билда (на всякий случай)
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Отключает ошибки TypeScript при билде
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  ...mergeConfig(userConfig),
}

function mergeConfig(userConfig) {
  const merged = {}
  for (const key in userConfig) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key]) &&
      typeof userConfig[key] === 'object'
    ) {
      merged[key] = {
        ...nextConfig[key],
        ...userConfig[key],
      }
    } else {
      merged[key] = userConfig[key]
    }
  }
  return merged
}

module.exports = nextConfig
