import { AccountEvent } from "@events";
import { AllStreamResolvedEvent } from "@eventstore/db-client";
import { AccountModel } from "@models";
import { AccountErrors } from "@typescript/account";
import {
  AccountEventTypes,
  AccountCreatedEvent,
  AccountNameUpdatedEvent,
} from "events/Account/events";

const event = (
  Account: AccountModel,
  resolvedEvent: AllStreamResolvedEvent
) => {
  if (
    resolvedEvent.event === undefined ||
    !AccountEvent.isAccountEvent(resolvedEvent.event)
  )
    return Promise.resolve();

  const { event } = resolvedEvent;

  switch (event.type) {
    case AccountEventTypes.Created: {
      return Account.projectCreation(event, Number(event.revision));
    }
    case AccountEventTypes.NameUpdated: {
      return Account.projectUpdateName(event, Number(event.revision));
    }
    default: {
      throw AccountErrors.UnknownEventType;
    }
  }
};

const creation = async (
  Account: AccountModel,
  event: AccountCreatedEvent,
  streamRevision: number
) => {
  const account = new Account({
    _id: event.data.accountId,
    name: event.data.name,
    createdAt: event.data.createdAt,
    revision: streamRevision,
  });

  await account.save();
};

const updateName = async (
  Account: AccountModel,
  event: AccountNameUpdatedEvent,
  streamRevision: number
) => {
  const account = await Account.getById(event.data.accountId);
  if (account) {
    account.name = event.data.name;

    account.revision = streamRevision;

    await account.save();
  }
};

export default {
  event,
  creation,
  updateName,
};
