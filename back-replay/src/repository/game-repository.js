import { readFile, writeFile } from "node:fs/promises";

class GameRepository {
    constructor({ file }) {
        this.file = file;
    }

    async _currentFile() {
        return JSON.parse(await readFile(this.file));
    }

    async find() {
        return this._currentFile();
    }

    async create(data) {
        const currentFile = await this._currentFile();
        currentFile.push(data);

        return await writeFile(this.file, JSON.stringify(currentFile));
    }
}

const gameRepository = new GameRepository({
    file: "../database/data.json",
});

export default gameRepository;
