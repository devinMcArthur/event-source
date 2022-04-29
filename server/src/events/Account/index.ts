import { eventStoreClient } from "@eventstore/client";
import {
  AllStreamRecordedEvent,
  jsonEvent,
  NO_STREAM,
} from "@eventstore/db-client";
import { Client } from "@eventstore/db-client/dist/Client";
import {
  AccountEventType,
  AccountEventTypes,
  AccountCreatedEvent,
  AccountNameUpdatedEvent,
} from "./events";

export class AccountEvent {
  accountId: string;
  streamName: string;
  eventStore: Client;

  constructor(accountId: string) {
    this.accountId = accountId;
    this.streamName = `account-${accountId}`;
    this.eventStore = eventStoreClient;
  }

  public async created(eventData: AccountCreatedEvent["data"]) {
    return this.eventStore.appendToStream(
      this.streamName,
      jsonEvent({
        type: AccountEventTypes.Created,
        data: eventData,
      }),
      {
        expectedRevision: NO_STREAM,
      }
    );
  }

  public async nameUpdated(
    eventData: AccountNameUpdatedEvent["data"],
    expectedRevision: number
  ) {
    return this.eventStore.appendToStream(
      this.streamName,
      jsonEvent({
        data: eventData,
        type: AccountEventTypes.NameUpdated,
      }),
      {
        expectedRevision: BigInt(expectedRevision),
      }
    );
  }

  public static isAccountEvent(event: unknown): event is AccountEventType {
    return (
      event !== null &&
      Object.values(AccountEventTypes).includes(
        (event as AllStreamRecordedEvent).type as unknown as AccountEventTypes
      )
    );
  }
}
