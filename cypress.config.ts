import { defineConfig } from 'cypress';
import { testUrl } from './src/constants/constants';

export default defineConfig({
  e2e: {
    baseUrl: testUrl,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
});
