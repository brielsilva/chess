import http from "node:http";
import Routes from "./routes/routes.js";

http.createServer(Routes.handler).listen(3000);
