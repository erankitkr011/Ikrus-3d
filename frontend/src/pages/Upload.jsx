import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useImageUpload } from "../Hooks/imageUpload";

const Upload = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const { uploadImage, uploading } = useImageUpload();
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!name || !description || !image) {
      alert("Please fill in all required fields (Name, Description, Image).");
      return;
    }
    const imageUrl = await uploadImage(image);
    console.log(imageUrl);
    if (!imageUrl) {
      alert("Image upload failed. Try again.");
      return;
    }

    const formData = {
      name,
      description,
      imageUrl,
      url: url || null,
    };

    try {
      const response = await fetch("http://localhost:4000/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Model uploaded successfully!");
        navigate("/");
      } else {
        alert("Upload failed. Try again.");
      }
    } catch (error) {
      console.error("Error uploading:", error);
      alert("Error uploading. Check console for details.");
    }
  };

  return (
    <div className="p-5 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-5 text-center">Upload 3D Model</h1>

      <label className="block mb-2 font-semibold">Model Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
        placeholder="Enter model name"
        required
      />

      <label className="block mb-2 font-semibold">Description:</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
        placeholder="Enter model description"
        required
      ></textarea>

      <label className="block mb-2 font-semibold">Upload Image:</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="mb-4"
        required
      />

      <label className="block mb-2 font-semibold">Model URL (Optional):</label>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
        placeholder="Enter URL (if applicable)"
      />

      <button
        onClick={handleUpload}
        className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload Model"}
      </button>

      <button
        onClick={() => navigate("/")}
        className="w-full mt-3 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
      >
        Back to Home
      </button>
    </div>
  );
};

export default Upload;
