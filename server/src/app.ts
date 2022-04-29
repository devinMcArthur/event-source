import express from "express";
import { createServer } from "http";
import cors from "cors";
import { graphqlUploadExpress } from "graphql-upload";
import { buildTypeDefsAndResolvers } from "type-graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server-express";

import AccountResolver from "@graphql/resolvers/account";

const createApp = async () => {
  const app = express();

  app.use(cors());

  app.use(express.json({ limit: "100mb" }));

  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
    resolvers: [AccountResolver],
    // authChecker,
    // pubSub: pubsub,
  });

  const schema = makeExecutableSchema({
    resolvers: resolvers,
    typeDefs,
  });

  const httpServer = createServer(app);

  const apolloServer = new ApolloServer({
    schema,
  });

  app.use(
    graphqlUploadExpress({
      maxFileSize: 100000000, // 100mb
      maxFiles: 20,
    })
  );

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  return httpServer;
};

export default createApp;
