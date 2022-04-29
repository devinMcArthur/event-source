import { EventStoreDBClient } from "@eventstore/db-client";

export const eventStoreClient = EventStoreDBClient.connectionString(
  "esdb://localhost:2113?tls=false"
);
