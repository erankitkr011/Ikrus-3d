import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ModelViewer from "../components/ModelViewer";

const ModelDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const model = location.state?.model; // Retrieve model data from state

  if (!model) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold">Model Not Found</h1>
        <button
          className="mt-5 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
          onClick={() => navigate("/")}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-center">{model.name}</h1>
      <div className="mt-5 flex justify-center">
        <ModelViewer modelUrl={model.url} />
      </div>
      <div className="mt-5 flex justify-center">
        <button
          className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-500 transition"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ModelDetail;
