import request from 'supertest';
import { app } from '../app';
import { describe, it, expect, beforeAll } from '@jest/globals';

let authCode = '';
let accessToken = '';
let refreshToken = '';

beforeAll(async () => {
    // Get authorization code
    const authResponse = await request(app)
        .get('/api/oauth/authorize')
        .query({ client_id: 'upfirst', redirect_uri: 'http://localhost:3000/process', response_type: 'code', state: 'xyz123' });
    authCode = authResponse.text.match(/code=([^&]*)/)[1];
});

describe('OAuth2 Authorization and Token Flow', () => {
    it('should exchange authorization code for access token', async () => {
        const response = await request(app)
            .post('/api/oauth/token')
            .send({
                client_id: 'upfirst',
                code: authCode,
                redirect_uri: 'http://localhost:3000/process',
                grant_type: 'authorization_code',
                'Content-Type': 'application/x-www-form-urlencoded'
            });
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('access_token');
        expect(response.body).toHaveProperty('refresh_token');
        
        accessToken = response.body.access_token;
        refreshToken = response.body.refresh_token;
    });

    it('should refresh access token using refresh token', async () => {
        const response = await request(app)
            .post('/api/oauth/token')
            .send({
                client_id: 'upfirst',
                code: authCode,
                redirect_uri: 'http://localhost:3000/process',
                refresh_token: refreshToken,
                grant_type: 'refresh_token',
                 'Content-Type': 'application/x-www-form-urlencoded'
            });
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('access_token');
    });

    it('should reject invalid client id', async () => {
        const response = await request(app)
            .post('/api/oauth/token')
            .send({
                client_id: 'client1',
                code: authCode,
                redirect_uri: 'http://localhost:3000/process',
                grant_type: 'authorization_code',
                'Content-Type': 'application/x-www-form-urlencoded'
            });
        
        expect(response.status).toBe(400);
    });
});