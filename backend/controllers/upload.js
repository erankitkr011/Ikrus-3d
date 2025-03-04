const db = require("../config/dbConnect");

exports.uploadModel = async (req, res) => {
  try {
    const { name, description, url } = req.body;

    if (!name || !description || !url) {
      return res.status(400).json({ error: "All fields (name, description, url) are required" });
    }

    const modelData = {
      name,
      description,
      url,
      uploadDate: new Date().toISOString(),
    };

    const docRef = await db.collection("models").add(modelData);

    res.status(201).json({ id: docRef.id, message: "Model uploaded successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload model", details: error.message });
  }
};