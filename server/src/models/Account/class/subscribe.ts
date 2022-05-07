import { eventStoreClient } from "@eventstore/client";
import {
  AllStreamResolvedEvent,
  excludeSystemEvents,
  START,
} from "@eventstore/db-client";
import { AccountModel, Checkpoint } from "@models";
import { finished, Readable } from "stream";

const events = async (Account: AccountModel) => {
  const accountCheckpoint = await Checkpoint.getAccount();
  const fromPosition = accountCheckpoint
    ? {
        prepare: BigInt(accountCheckpoint.position),
        commit: BigInt(accountCheckpoint.position),
      }
    : START;

  const subscription = eventStoreClient.subscribeToAll({
    fromPosition,
    filter: excludeSystemEvents(),
  });

  finished(
    subscription.on("data", async (resolvedEvent: AllStreamResolvedEvent) => {
      await Account.projectEvent(resolvedEvent);
      if (resolvedEvent.commitPosition)
        await Checkpoint.updateAccount(resolvedEvent.commitPosition.toString());
    }) as Readable,
    (error) => {
      if (!error) {
        console.info("Stopping subscription for an unknown reason");
        return;
      }
      console.error(`Received error: ${error ?? "UNEXPECTED ERROR"}.`);
    }
  );

  return subscription;
};

export default {
  events,
};
