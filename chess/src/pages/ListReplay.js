import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, List } from "../components/Menu/styles";
import api from "../services/replay";

export default function ListReplay() {
  const [list, setList] = useState([]);

  function removeType(item) {
    const name = item.split(".")[0];
    return name;
  }
  useEffect(() => {
    async function getAllReplays() {
      const data = await api.getAllReplays().catch((e) => console.log(e));
      console.log(data);
      setList(data.success);
    }
    getAllReplays();
  }, []);

  return (
    <Container>
      <List>
        {list ? (
          list.map((item) => {
            return (
              <Link to={removeType(`${item}`)} key={item}>
                {item}
              </Link>
            );
          })
        ) : (
          <h2>Sem nenhum replay</h2>
        )}
      </List>
    </Container>
  );
} // Lista de Jogos existente no local storage
