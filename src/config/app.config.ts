import * as dotenv from "dotenv";
 
// Load environment variables from .env file
dotenv.config();

export const appConfig = {
    port: process.env.PORT || 3000,
    oauth: {
        clientId: process.env.OAUTH_CLIENT_ID || 'upfirst',
        clientSecret: process.env.OAUTH_CLIENT_SECRET || 'test-secret',
        redirectUri: process.env.OAUTH_REDIRECT_URL || 'http://localhost:8081/process',
        expiresIn: process.env.OAUTH_EXPIRES_IN || '1800',
        refreshSecret: process.env.OAUTH_REFRESH_SECRET || 'test-refresh-secret',
        refreshExpiresIn: process.env.OAUTH_REFRESH_EXPIRES_IN || '3600'
    }
};