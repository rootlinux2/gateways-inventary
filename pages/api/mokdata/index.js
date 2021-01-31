import nextConnect from "next-connect";
import middleware from "../../../middlewares/database";
import data from "../../../data.json";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  try {
     // this option prevents additional documents from being inserted if one fails
     const options = { ordered: true };
     const result = await req.db.collection("gateways").insertMany(data, options);
    
      res.json({ result: 1, message: "Data generated!" });
  
  } catch (error) {
    res.json({ result: 2, message: error.message });
  }
});

export default handler;
