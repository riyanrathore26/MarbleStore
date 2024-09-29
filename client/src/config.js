let BASE_URL;

if (window.location.hostname === 'localhost') {
  BASE_URL = 'http://localhost:3001'; // Local development URL
} else {
  BASE_URL = 'https://marblestore-6imh.onrender.com'; // Production URL
}

export { BASE_URL };
