export default {
  "**/*.{js,jsx,ts,tsx}": [
    "pnpm lint:fix",
    "pnpm format:fix",
    "git add"
  ]
};
