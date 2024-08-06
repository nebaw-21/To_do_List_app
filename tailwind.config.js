// Importing the required utility
import withMT from '@material-tailwind/react/utils/withMT';

// Exporting the Tailwind CSS configuration
export default withMT({
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Make sure to include all file types you use
  ],
  theme: {
    extend: {},
  },
  plugins: [],
});
