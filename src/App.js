import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);
  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: "GoStack " + Date.now(),
      url: "https://github.com/",
      techs: ["React", "Javascript", "VSCode"],
    });
    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    // const response = await api.delete();
    await api.delete(`repositories/${id}`);
    const newRepositories = repositories.filter((item) => item.id != id);
    setRepositories(newRepositories);
  }

  return (
    <div>
      <h1>Repositórios</h1>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            <h2>{repository.title}</h2>
            <button
              type="button"
              onClick={() => handleRemoveRepository(repository.id)}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button type="button" onClick={handleAddRepository}>
        Adicionar
      </button>
    </div>
  );
}

export default App;
