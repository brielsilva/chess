import { parse } from "node:url";
import HEADERS from "../util/headers.js";
import gameService from "../service/game-service.js";
import replayRoutes from "./replay-routes.js";

const allRoutes = {
  ...replayRoutes,
  default: async (request, response) => {
    response.writeHead(404, HEADERS.DEFAULT_HEADER);
    response.end();
  },
};

async function handleError(response,err) {
  return ((error) => {
    console.log(err);
    response.writeHead(err.message.split("-")[1].trim(), HEADERS.DEFAULT_HEADER);
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
    const { url, method } = request;
    const { pathname, query } = parse(url, true);
    const key = `${pathname.split("/")[1]}:${method.toLowerCase()}`;
    const chosen = allRoutes[key] || allRoutes.default;
    return Promise.resolve(chosen(request, response)).catch(err =>handleError(response,err));
  }
}

export default Routes;
