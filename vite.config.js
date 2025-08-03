import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react({
      include: "**/*.{jsx,tsx}",
    }),
    // Bundle analyzer - увидишь что жрёт место
    visualizer({
      filename: 'dist/stats.html',
      open: false, // Не открываем автоматически
      gzipSize: true,
      brotliSize: true,
    })
  ],
  assetsInclude: ['**/*.svg'],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2020', // Современнее = меньше полифиллов
    minify: 'esbuild',
    sourcemap: false,
    chunkSizeWarningLimit: 500, // Строже контроль
    
    rollupOptions: {
      output: {
        // Агрессивный code splitting
        manualChunks: {
          // React ecosystem
          'react-vendor': ['react', 'react-dom'],
          'react-router': ['react-router-dom'],
          
          // State management
          'state': ['@reduxjs/toolkit', 'react-redux'],
          
          // UI библиотеки ВМЕСТЕ (MUI нужен Emotion)
          'mui': ['@mui/material', '@mui/icons-material', '@mui/joy', '@emotion/react', '@emotion/styled'],
          
          // Анимации отдельно
          'motion': ['framer-motion'],
          
          // Утилиты
          'utils': ['html-react-parser', 'react-hot-toast']
        },
        
        // Хеш для кеширования
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
      
      // Tree shaking на максимум (только в production)
      treeshake: process.env.NODE_ENV === 'production' ? {
        preset: 'recommended',
        manualPureFunctions: ['console.log', 'console.info', 'console.debug'],
      } : false,
    },
  },
  
  // Оптимизация esbuild
  esbuild: {
    // Убираем console только в production
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
    legalComments: 'none',
    target: 'es2020',
    treeShaking: true,
  },
  
  server: {
    open: true
  }
})