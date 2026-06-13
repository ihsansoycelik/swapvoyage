import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3005,
        host: '0.0.0.0',
        strictPort: true,
      },
      plugins: [
        react(),
        VitePWA({
          registerType: 'autoUpdate',
          includeAssets: ['icon.svg'],
          manifest: {
            name: 'SwapVoyage',
            short_name: 'SwapVoyage',
            description: 'Discover hidden gems around you',
            theme_color: '#000000',
            background_color: '#000000',
            display: 'standalone',
            icons: [
              {
                src: 'icon.svg',
                sizes: '192x192 512x512',
                type: 'image/svg+xml',
                purpose: 'any maskable'
              }
            ]
          },
          workbox: {
            globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
            runtimeCaching: [
              {
                // Place images — cache-first, 30 day expiry
                urlPattern: /\.(jpg|jpeg|png|webp|avif)(\?.*)?$/i,
                handler: 'CacheFirst',
                options: {
                  cacheName: 'images',
                  expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 },
                  cacheableResponse: { statuses: [0, 200] }
                }
              },
              {
                // Pollinations AI images — cache-first, 7 days
                urlPattern: /^https:\/\/images\.pollinations\.ai\/.*/i,
                handler: 'CacheFirst',
                options: {
                  cacheName: 'pollinations-image-cache',
                  expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 7 },
                  cacheableResponse: { statuses: [0, 200] }
                }
              },
              {
                // CartoDB/Leaflet map tiles — cache-first, 7 day expiry
                urlPattern: /basemaps\.cartocdn\.com/,
                handler: 'CacheFirst',
                options: {
                  cacheName: 'map-tiles',
                  expiration: { maxEntries: 500, maxAgeSeconds: 60 * 60 * 24 * 7 },
                  cacheableResponse: { statuses: [0, 200] }
                }
              },
              {
                // Firestore API — network-first, content freshness preferred
                urlPattern: /firestore\.googleapis\.com/,
                handler: 'NetworkFirst',
                options: {
                  cacheName: 'firestore',
                  networkTimeoutSeconds: 5,
                  cacheableResponse: { statuses: [0, 200] }
                }
              },
              {
                // Gemini API — never cache AI responses
                urlPattern: /generativelanguage\.googleapis\.com/,
                handler: 'NetworkOnly'
              }
            ]
          }
        })
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
