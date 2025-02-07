import { Request, Response } from "express";
import { appConfig } from "../config/app.config";
import { generateAccessToken, verifyAuthCode } from "../utils/oauth.service";

const refreshTokens: any[] = [];

export const authorization = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { client_id, redirect_uri, response_type, scope, state } = req.query;

  if (!response_type || response_type !== "code") {
    return res.status(400).json({ error: "invalid_response_type" });
  }
  const oauth = appConfig.oauth;

  if (oauth.clientId !== client_id || oauth.redirectUri !== redirect_uri) {
    return res.status(400).json({ error: "Invalid client or redirect URI" });
  }

  const code = generateAccessToken(
    oauth.clientId,
    oauth.clientSecret,
    oauth.expiresIn
  );

  let redirectUrl = `${redirect_uri}?code=${code}`;

  if (state) {
    redirectUrl += `&state=${state}`;
  }

  res.redirect(302, redirectUrl);
};

export const getAccessToken = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { grant_type, code, client_id, refresh_token } = req.body;


  const oauth = appConfig.oauth;

  if (oauth.clientId !== client_id) {
    return res.status(400).json({ error: "Invalid client or redirect URI" });
  }

  try {
    if (grant_type === "authorization_code") {
      verifyAuthCode(code, appConfig.oauth.clientSecret);

      const accessToken = generateAccessToken(
        oauth.clientId,
        oauth.clientSecret,
        oauth.expiresIn
      );

      const newRefreshToken = generateAccessToken(
        oauth.clientId,
        oauth.refreshSecret,
        oauth.refreshExpiresIn
      );

      refreshTokens.push(newRefreshToken);

      res.json({
        access_token: accessToken,
        token_type: "Bearer",
        expires_in: oauth.expiresIn,
        refresh_token: newRefreshToken,
      });
    } else if (grant_type === 'refresh_token') {
      if (!refresh_token || !refreshTokens.includes(refresh_token)) {
        return res.status(403).json({ error: "Invalid refresh token" });
      }
        verifyAuthCode(refresh_token, appConfig.oauth.refreshSecret);
    
        const accessToken = generateAccessToken(
          oauth.clientId,
          oauth.clientSecret,
          oauth.expiresIn
        );
    
        res.json({
          access_token: accessToken,
          token_type: "Bearer"
        });
    }
  } catch (err) {
    res.status(400).json({ error: "Invalid authorization code" });
  }
};

