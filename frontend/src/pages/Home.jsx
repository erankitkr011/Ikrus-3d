import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import ModelViewer from "../components/ModelViewer";

const Home = () => {
  const [models, setModels] = useState([]);
  const [filteredModels, setFilteredModels] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:4000/api/models")
      .then((res) => res.json())
      .then((data) => {
        setModels(data);
        setFilteredModels(data);
      })
      .catch((err) => console.error("Error fetching models:", err));
  }, []);

  const handleSearch = (query) => {
    setFilteredModels(
      models.filter((model) =>
        model.name.toLowerCase().includes(query.toLowerCase()),
      ),
    );
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-5 text-center">
        Ikarus 3D Model Viewer
      </h1>
      <div className="flex justify-end mb-5">
        <button
          className="px-4 py-2 bg-yellow-200 text-black rounded-lg hover:bg-yellow-600 transition"
          onClick={() => navigate("/upload")}
        >
          Upload Model
        </button>
      </div>
      <SearchBar onSearch={handleSearch} />
      {filteredModels.map((model) => (
        <div key={model.id} className="mb-5">
          <h2 className="text-2xl font-semibold">{model.name}</h2>
          <ModelViewer modelUrl={model.url} />
        </div>
      ))}
    </div>
  );
};

export default Home;
