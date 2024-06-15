import {v2 as cloudinary} from 'cloudinary';
import 'dotenv/config'
import { env } from "process";
    // Configuration
    cloudinary.config({ 
        cloud_name: env.CLOUD_NAME, 
        api_key: env.API_KEY, 
        api_secret: env.API_SECRET // Click 'View Credentials' below to copy your API secret
    });

export default cloudinary;