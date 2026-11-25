import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rolldownOptions: {
      output: { comments: { legal: true } },
      input: ['index.html', 'review/index.html', 'library/index.html', 'engine/index.html', 'talk/index.html', 'talk/staging/index.html', 'talk/m5a/index.html', 'talk/m5b/index.html'],
    },
  },
});
