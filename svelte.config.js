import adapter from '@sveltejs/adapter-static';

const dev = process.env.NODE_ENV === 'development';

// Change this to your GitHub repo name when you create it, e.g. "waps-learn"
const repoName = 'waps-learn';

export default {
  kit: {
    adapter: adapter({
      fallback: '404.html'
    }),
    paths: {
      base: dev ? '' : `/${repoName}`
    }
  }
};
