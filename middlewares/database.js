import { MongoClient } from "mongodb";
import nextConnect from "next-connect";

const client = new MongoClient(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const SchemaValidator = {
  $jsonSchema: {
    bsonType: "object",
    required: ["name", "serialNumber", "ipAddress", "peripheral"],
    properties: {
      name: {
        type: "string",
      },
      serialNumber: {
        type: "string",
      },
      ipAddress: {
        type: "string",
      },
      peripheral: {
        type: "array",
        items: [
          {
            type: "object",
            properties: {
              uuid: {
                type: "string",
              },
              vendor: {
                type: "string",
              },
              dateCreated: {
                type: "string",
              },
              status: {
                enum: [ "online", "offline"],
                description: "can only be one of the enum values and is required"
              },
            },
            required: ["uuid", "vendor", "dateCreated", "status"],
          },
        ],
      },
    },
  },
};

async function database(req, res, next) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db(process.env.DB_NAME);
  req.db.command({
    collMod: "gateways",
    validator: SchemaValidator,
    validationLevel: "strict",
    validationAction: "error",
  });

  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;
