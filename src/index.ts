import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./Schema";
import cors from "cors";
import { createConnection } from "typeorm";
import { Users } from "./Entities/Users";

const main = async () => {
  await createConnection({
    type: "postgres",
    username: "postgres",
    password: "asd123",
    database: "crudExampleWithGraphQL",
    host: "localhost",
    port: 5432,
    logging: true,
    synchronize: false,
    entities: [Users],
  });
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );

  app.listen(3000, () => {
    console.log("server is running");
  });
};

main().catch((err) => {
  console.log(err);
});
