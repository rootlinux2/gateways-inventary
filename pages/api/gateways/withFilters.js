import nextConnect from "next-connect";
import middleware from "../../../middlewares/database";

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  try {
    const { limit = 10, skip = 0 } = req.body.paginations;
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

export default handler;
