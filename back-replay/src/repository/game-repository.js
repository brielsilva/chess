import { readFile, writeFile, readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = dirname(fileURLToPath(import.meta.url));
const filepath = join(currentDir, "./../database");

class GameRepository {
  constructor({ dir }) {
    this.file = dir;
  }

  async findFile(filename) {
    const path = join(this.file, filename);
    try {
      const data = JSON.parse(await readFile(path));
      return [path, data];
    } catch (e) {
      return await this.createJson(this.removeType(filename));
    }
  }

  async _currentDir() {
    return JSON.parse(await readdir(this.file));
  }

  async create(data, onto) {
    const [currentFile, fileData] = await this.findFile(onto);
    fileData.push(data);

    return await writeFile(currentFile, JSON.stringify(fileData));
  }

  async createJson(id) {
    const filepath = join(this.file, `${id}.json`);
    const data = [];
    await writeFile(filepath, JSON.stringify(data));
    return [filepath, data];
  }

  removeType(filename) {
    const name = filename.split(".")[0];
    return name;
  }
}

const gameRepository = new GameRepository({
  dir: filepath,
});

export default gameRepository;
