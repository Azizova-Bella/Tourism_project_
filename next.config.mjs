let userConfig = {}

if (!process.env.VERCEL) {
  try {
    userConfig = require('./v0-user-next.config')
  } catch (e) {
    // Если файл не найден — игнорируем
  }
}

/** @type {import('next').NextConfig} */
const baseConfig = {
  eslint: {
    ignoreDuringBuilds: true, // отключаем ESLint на Vercel
  },
  typescript: {
    ignoreBuildErrors: true, // отключаем TypeScript ошибки на Vercel
  },
  images: {
    unoptimized: true, // можно отключить Image Optimization
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
}

module.exports = {
  ...baseConfig,
  ...mergeConfig(baseConfig, userConfig),
}

function mergeConfig(base, user) {
  const result = { ...base }
  for (const key in user) {
    if (
      typeof base[key] === 'object' &&
      !Array.isArray(base[key]) &&
      typeof user[key] === 'object'
    ) {
      result[key] = {
        ...base[key],
        ...user[key],
      }
    } else {
      result[key] = user[key]
    }
  }
  return result
}
