import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { debounce } from "lodash";
import Fuse from "fuse.js";

const Home = () => {
  const [models, setModels] = useState([]);
  const [filteredModels, setFilteredModels] = useState([]);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/api/models")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setModels(data);
          setFilteredModels(data);
        } else {
          console.error("Invalid data format:", data);
        }
      })
      .catch((err) => {
        console.error("Error fetching models:", err);
      });
  }, []);

  const fuse = new Fuse(models, { keys: ["name", "tags"], threshold: 0.3 });

  const handleSearch = debounce((query) => {
    if (!query.trim()) {
      setFilteredModels(models);
      setSearchSuggestions([]);
      return;
    }

    const results = fuse.search(query).map((result) => result.item);

    const highlightedResults = results.map((model) => {
      const regex = new RegExp(`(${query})`, "gi");
      return {
        ...model,
        highlightedName: model.name.replace(regex, `$1`),
      };
    });

    setFilteredModels(results);
    setSearchSuggestions(highlightedResults);
  }, 300);

  const handleModelClick = (model) => {
    navigate(`/model/${model.id}`, { state: { model } }); // Navigate with state
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

      <SearchBar
        onSearch={handleSearch}
        suggestions={searchSuggestions}
        onSelect={handleModelClick}
      />

      <div className="mt-5">
        {filteredModels.length > 0 ? (
          filteredModels.map((model) => (
            <div
              key={model.id}
              className="p-3 border-b  cursor-pointer  transition"
              onClick={() => handleModelClick(model)}
              dangerouslySetInnerHTML={{ __html: model.highlightedName }}
            ></div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-5">No models found</p>
        )}
      </div>
    </div>
  );
};

export default Home;
