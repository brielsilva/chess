import { parse } from "node:url";
import headers from "../util/headers.js";
import replayRoutes from "./replay-routes.js";

const allRoutes = {
    ...replayRoutes,
    default: async (request, response) => {
        response.writeHead(404, headers);
        response.end();
    },
};

async function handleError(response, err) {
    return (() => {
        response.writeHead(err.message.split("-")[1].trim(), headers);
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
            response.writeHead(204, headers);
            response.end();
            return;
        }
        const { url, method } = request;
        const { pathname } = parse(url, true);
        const key = `${pathname.split("/")[1]}:${method.toLowerCase()}`;
        const chosen = allRoutes[key] || allRoutes.default;
        return Promise.resolve(chosen(request, response)).catch((err) =>
            handleError(response, err)
        );
    }
}

export default Routes;
