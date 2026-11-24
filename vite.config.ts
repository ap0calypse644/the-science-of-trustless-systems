import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rolldownOptions: {
      input: ['index.html', 'review/index.html'],
    },
  },
});
