import { parse } from "node:url";
import HEADERS from "../util/headers.js";
import gameService from "../service/game-service.js";
import replayRoutes from "./replay-routes.js";

const allRoutes = {
  ...replayRoutes,
  default: async (request, response) => {
    const pa = parse(request.url, true);
    console.log(pa.query);
    response.writeHead(404, HEADERS.DEFAULT_HEADER);
    response.end();
  },
};

class Routes {
  static async handler(request, response) {
    const { url, method } = request;
    const { pathname, query } = parse(url, true);
    const key = `${pathname.split("/")[1]}:${method.toLowerCase()}`;
    const chosen = allRoutes[key] || allRoutes.default;
    console.log(chosen);
    return Promise.resolve(chosen(request, response)).catch();
  }

  async handleError(response) {
    return (error) => {
      response.writeHead(500, HEADERS.DEFAULT_HEADER);
      response.write(
        JSON.stringify({
          error: "internet server error",
        })
      );
    };
  }
}

export default Routes;
