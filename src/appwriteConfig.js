// src/appwriteConfig.js
import { Client } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('67d0048000011482e309'); // Your project ID

export { client };
