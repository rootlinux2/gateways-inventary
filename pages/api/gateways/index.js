import nextConnect from "next-connect";
import middleware from "../../../middlewares/database";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  try {
    const { limit = 10, skip = 0 } = req.query;
    const docs = await req.db
      .collection("gateways")
      .aggregate([       
        // {
        //   $match: { $or: [{ name: 'John' }, { name: 'Smith' }] }
        // },
        {
          $facet: {
            metadata: [
              {
                $group: {
                  _id: null,
                  total: { $sum: 1 },
                },
              },
            ],
            data: [{ $skip: parseInt(skip) }, { $limit: parseInt(limit) }],
          },
        },
      ])
      .toArray();

    res.json({ result: 1, docs: docs[0].data, metadata: docs[0].metadata[0] });
  } catch (error) {
    res.json({ result: 2, message: error.message });
  }
});

handler.post(async (req, res) => {
  try {
    const data = req.body;
    delete data._id;
    const docs = await req.db
    .collection("gateways")
    .updateOne(
      { serialNumber: data.serialNumber },
      { $set: data },
      { upsert: true }
      );
      
    res.json({ result: 1, docs });
  } catch (error) {
    res.json({ result: 2, message: error.message });
  }
});

handler.delete(async (req, res) => {
  try {
    var mongodb = require('mongodb');
   const docs = await req.db
   .collection("gateways").deleteOne( { _id : new mongodb.ObjectID(req.body.id) } );
    res.json({ result: 1, docs });
  } catch (error) {
    res.json({ result: 2, message: error.message });
  }
  
});

export default handler;
