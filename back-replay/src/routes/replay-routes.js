import gameService from "../service/game-service.js";
import { once } from "node:events";
import {parse} from 'node:url';
import Move from "../entities/move.js";
import HEADERS from "../util/headers.js";

const replayRoutes = ({ gameService }) => ({
  "replay:get": async (request, response) => {
    const id = parse(request.url, true).pathname.split("/")[2];
    if (!id) {
      throw new Error("Jogo não encontrado - 404");
    }
    response.writeHead(200, HEADERS.DEFAULT_HEADER);
    response.write("Jogo encontrado");
    response.end();
  }, // Se tiver id reproduz o game que chamou
  "replay:post": async (request, response) => {}, // Adiciona dado ao arquivo dentro do folder
  "start:post": async (request, response) => {
    const data = await once(request, "data");
    const item = JSON.parse(data);
    const move = new Move(item);
    response.writeHead(201, HEADERS.DEFAULT_HEADER);
    response.write(
      JSON.stringify({
        sucess: move,
      })
    );
    response.end();
  },
});

export default replayRoutes({ gameService: gameService });
