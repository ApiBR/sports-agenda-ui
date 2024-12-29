import { defineConfig as defineViteConfig, mergeConfig } from 'vite';
import { defineConfig as defineVitestConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';

const viteConfig = defineViteConfig({
  plugins: [react()],
  base: '/ui/',
});

const vitestConfig = defineVitestConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setupTests.ts',
    coverage: {
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['node_modules', 'test/**/*', 'src/main.tsx', 'src/*.d.ts', 'src/types/*.d.ts'],
    },
  }
});

export default mergeConfig(viteConfig, vitestConfig);
