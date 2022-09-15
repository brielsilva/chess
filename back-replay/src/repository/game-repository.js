import { readdir } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";


const currentDir = dirname(fileURLToPath(import.meta));
const filepath = join(currentDir,"./../database");
class GameRepository {
    constructor({ dir }) {
        this.file = dir;
    }

    async findFile(filename) {} // Encontrar o arquivo com base no nome

    async length() {} // Retornar a quantidade de arquivos no diretório

    async _currentDir() {
        return JSON.parse(await readdir(this.file));
    }

    async create(data,file) { // Adicionar dados ao arquivo
        const currentFile = await this.findFile(file); 
        currentFile.push(data);

        return await writeFile(this.file, JSON.stringify(currentFile));
    }

    async createFile(name) {} // Criar o arquivo
}

const gameRepository = new GameRepository({
    dir: filepath
});

export default gameRepository;
