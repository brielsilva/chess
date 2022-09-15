import gameService from "../service/game-service.js";
import { once } from "node:events";
import { parse } from "node:url";
import Move from "../entities/move.js";
import headers from "../util/headers.js";

// Rotas:

// GET replay/1 - Pegar replay do jogo 1

// POST replay/1 - Jogar dado no arquivo do id 1

// POST start/ - Cria um arquivo com um id com base na quantidade de arquivos na pasta de database e retorna

const replayRoutes = ({ gameService }) => ({
    "replay:get": async (request, response) => {
        const id = parse(request.url, true).pathname.split("/")[2]; // Busca o ID na url
        if (!id) {
            throw new Error("Jogo não encontrado - 404");
        }
        response.writeHead(200, headers);
        response.write(JSON.stringify("Jogo encontrado"));
        response.end();
    }, // Se tiver id reproduz o game que chamou
    "replay:post": async (request, response) => {
        const data = await once(request, "data"); // Pega o dado enviado por um post no request
        const item = JSON.parse(data); // Passa o valor de Buffer para um JSON

        response.writeHead(201, headers);
        response.write(JSON.stringify({ success: item }));
        response.end();
    }, // Adiciona dado ao arquivo dentro do folder
    "start:post": async (request, response) => {
        const id = 1;
        response.writeHead(201, headers);
        response.write(
            JSON.stringify({
                success: id,
            })
        );
        response.end();
    },
});

export default replayRoutes({ gameService: gameService });
