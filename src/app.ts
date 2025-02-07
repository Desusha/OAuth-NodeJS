// src/index.ts
import express  from "express";
import { appConfig } from "./config/app.config";
import bodyParser from "body-parser";
import routers from "./routers";

const app = express();

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// application/json
app.use(bodyParser.json());

const port = appConfig.port;


app.use(routers);

app.listen(port, () => {
  console.log(`[server]: OAuth2 server running on http://localhost:${port}`);
});


export { app };

