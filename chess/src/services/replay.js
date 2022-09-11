import axios from "axios";

const url = "http://localhost:3001";

class Api {
  constructor(baseUrl) {
    this.api = axios.create({
      baseURL: baseUrl,
    });
  }

  async getData(id) {
    try {
      const data = await this.api.get(`/replay/${id}`);
      console.log(data);
      return data.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getAllReplays() {
    try {
      const data = await this.api.get("/length");
      return data.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  async initGameReplay() {
    try {
      console.log("QUERO O START");
      const data = await this.api.post("/start");
      return data.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  async postMove(id, move) {
    try {
      const data = await this.api.post(`/replay/${id}`, JSON.stringify(move));
      return data;
    } catch (e) {
      throw new Error(e);
    }
  }
}

export default new Api("http://localhost:3001");
