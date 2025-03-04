const db = require("../config/dbConnect");

exports.getModels = async (req, res) => {
  try {
    const snapshot = await db.collection("models").get();
    const models = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    
    res.status(200).json(models);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
