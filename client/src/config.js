let BASE_URL;

if (window.location.hostname === 'localhost') {
  BASE_URL = 'http://localhost:3000'; // Local development URL
} else {
  BASE_URL = 'https://your-production-url.com'; // Production URL
}

export { BASE_URL };
