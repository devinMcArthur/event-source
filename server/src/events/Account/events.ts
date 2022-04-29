export enum AccountEventTypes {
  Created = "account-created",
  NameUpdated = "account-name-updated",
}

export interface IAccountEvent<
  Type extends AccountEventTypes,
  Data extends Record<string, unknown>
> {
  type: Type;
  data: Data;
}

export type AccountCreatedEvent = IAccountEvent<
  AccountEventTypes.Created,
  {
    createdAt: Date;
    accountId: string;
    name: string;
  }
>;

export type AccountNameUpdatedEvent = IAccountEvent<
  AccountEventTypes.NameUpdated,
  {
    accountId: string;
    name: string;
  }
>;

export type AccountEventType = AccountCreatedEvent | AccountNameUpdatedEvent;
