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
    const path = join(this.file, `${filename}.json`);
    try {
      const data = JSON.parse(await readFile(path));
      return [path, data];
    } catch (e) {
      console.log(e);
      return await this.createJson(this.removeType(filename));
    }
  }

  async _currentDir() {
    return JSON.parse(await readdir(this.file));
  }

  async create(data, onto) {
    const [currentFile, fileData] = await this.findFile(onto);
    const id = fileData.length + 1;
    data[id] = id;
    fileData.push(data);
    await writeFile(currentFile, JSON.stringify(fileData));
    return data;
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

  async length() {
    const file = await readdir(this.file);
    return file.length;
  }
}

const gameRepository = new GameRepository({
  dir: filepath,
});

export default gameRepository;
