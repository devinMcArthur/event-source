import { AccountEvent } from "@events";
import { AccountCreateCommand, AccountUpdateName } from "./commands";

export class AccountCommand {
  accountId: string;
  eventHandler: AccountEvent;

  constructor(accountId: string) {
    this.accountId = accountId;
    this.eventHandler = new AccountEvent(accountId);
  }

  public async create(command: AccountCreateCommand) {
    const result = await this.eventHandler.created({
      accountId: this.accountId,
      createdAt: new Date(),
      name: command.name,
    });

    return result;
  }

  public async updateName(
    command: AccountUpdateName,
    expectedRevision: number
  ) {
    return this.eventHandler.nameUpdated(
      {
        accountId: this.accountId,
        name: command.name,
      },
      expectedRevision
    );
  }
}
