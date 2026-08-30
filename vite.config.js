import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const packageJson = JSON.parse(
  readFileSync(path.resolve(__dirname, 'package.json'), 'utf8'),
)

const repoName =
  process.env.GITHUB_REPOSITORY?.split('/')[1] ||
  packageJson.name ||
  'portfolio'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const deployTarget = (
    env.VITE_DEPLOY_TARGET || process.env.VITE_DEPLOY_TARGET || ''
  ).toLowerCase()
  const isGitHubPages =
    deployTarget === 'github' ||
    deployTarget === 'github-pages' ||
    deployTarget === 'gh-pages' ||
        (process.env.GITHUB_ACTIONS === 'true' && deployTarget !== 'vercel')

  return {
    plugins: [react()],
    base: isGitHubPages ? `/${repoName}/` : '/',
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            three: ['three', '@react-three/fiber'],
          },
        },
      },
    },
  }
})
