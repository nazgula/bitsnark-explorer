import axios from 'axios';

// Create an Axios instance with default configuration
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api', // Base URL for your API
    timeout: 1000, // Optional: Set a timeout for requests
    // You can set default headers here if needed
});

export default axiosInstance;
