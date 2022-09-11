import gameService from "../service/game-service.js";
import { once } from "node:events";
import { parse } from "node:url";
import HEADERS from "../util/headers.js";

const replayRoutes = ({ gameService }) => ({
  "replay:get": async (request, response) => {
    const id = parse(request.url, true).pathname.split("/")[2];
    if (!id) {
      throw new Error("Jogo não encontrado - 404");
    }
    const data = await gameService.find(id);
    response.writeHead(200, HEADERS.headers);
    response.write(
      JSON.stringify({
        data: data,
      })
    );
    response.end();
  }, // Se tiver id reproduz o game que chamou
  "replay:post": async (request, response) => {
    const id = parse(request.url, true).pathname.split("/")[2];
    if (!id) {
      throw new Error("Jogo não encontrado - 404");
    }
    const data = await once(request, "data");
    const item = gameService.create(JSON.parse(data));
    if (!item.success) {
      throw new Error("Parâmetros invalidos - 400");
    }
    const result = await gameService.save(item.move, id);
    response.writeHead(201, HEADERS.headers);
    response.write(
      JSON.stringify({
        success: result,
      })
    );
    response.end();
  }, // Adiciona dado ao arquivo dentro do folder
  "start:post": async (request, response) => {
    const length = await gameService.length();
    console.log(length);
    const id = length + 1;
    response.writeHead(201, HEADERS.headers);
    response.write(
      JSON.stringify({
        success: id,
      })
    );
    response.end();
  },
  "length:get": async (request, response) => {
    const length = await gameService.all();
    response.writeHead(201, HEADERS.headers);
    response.write(
      JSON.stringify({
        success: length,
      })
    );
    response.end();
  },
});

export default replayRoutes({ gameService: gameService });
