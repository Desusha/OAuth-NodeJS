import { Router } from 'express';
import { authorization, getAccessToken } from './controller/oauth.controller';

const routers = Router();

routers.get('/api/oauth/authorize', authorization);
routers.post('/api/oauth/token', getAccessToken);

export default routers;