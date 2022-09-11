import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import App from "../App";
import api from "../services/replay";

export default function Replay() {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState();
  useEffect(() => {
    async function getData() {
      const data = await api.getData(params.id);
      console.log(data);
      setList(data);
      setLoading(true);
      console.log(loading);
    }
    getData();
  }, [params]);

  return (
    <>
      {loading ? (
        <App listMove={list} isReplay={true} idReplay={params.id} />
      ) : (
        <div>Loading</div>
      )}
    </>
  );
}
