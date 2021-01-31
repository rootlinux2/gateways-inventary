import nextConnect from "next-connect";
import middleware from "../../../middlewares/database";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  try {
    const { limit = 10, skip = 0 } = req.query;
    const docs = await req.db
      .collection("gateways")
      .find({})
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .toArray();

    res.json({ result: 1, docs: docs });
  } catch (error) {
    res.json({ result: 2, message: error.message });
  }
});

handler.post(async (req, res) => {
  try {
    const data = req.body;
    data.date = new Date(data.date);
    const docs = await req.db
      .collection("gateways")
      .updateOne(
        { date: new Date(data.date) },
        { $set: data },
        { upsert: true }
      );
    res.json({ result: 1, docs });
  } catch (error) {
    res.json({ result: 2, message: error.message });
  }
});

export default handler;
