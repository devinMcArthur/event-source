import { EventStoreDBClient } from "@eventstore/db-client";

export const eventStoreClient = EventStoreDBClient.connectionString(
  "esdb://eventstore.default.svc.cluster.local:2113?tls=false"
);
