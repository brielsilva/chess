import { parse } from "node:url";
import HEADERS from "../util/headers.js";
import gameService from "../service/game-service.js";
import replayRoutes from "./replay-routes.js";
import { Console } from "node:console";

const allRoutes = {
  ...replayRoutes,
  default: async (request, response) => {
    response.writeHead(404, HEADERS.headers);
    response.end();
  },
};

async function handleError(response, err) {
  return ((error) => {
    response.writeHead(err.message.split("-")[1].trim(), HEADERS.headers);
    response.write(
      JSON.stringify({
        error: err.message.split("-")[0].trim(),
      })
    );
    response.end();
  })();
}

class Routes {
  static async handler(request, response) {
    if (request.method === "OPTIONS") {
      response.writeHead(204, HEADERS.headers);
      response.end();
      return;
    }
    const { url, method } = request;
    console.log(url);
    const { pathname, query } = parse(url, true);
    const key = `${pathname.split("/")[1]}:${method.toLowerCase()}`;
    console.log(key);
    const chosen = allRoutes[key] || allRoutes.default;

    return Promise.resolve(chosen(request, response)).catch((err) =>
      handleError(response, err)
    );
  }
}

export default Routes;
