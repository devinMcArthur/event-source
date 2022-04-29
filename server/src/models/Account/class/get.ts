import { AccountCommand } from "@commands";
import { AccountDocument, AccountModel } from "@models";

const streamName = (accountId: string) => {
  return `account-${accountId}`;
};

const byId = async (
  Account: AccountModel,
  id: string
): Promise<AccountDocument | null> => {
  return await Account.findById(id);
};

const all = async (Account: AccountModel): Promise<AccountDocument[]> => {
  return await Account.find();
};

const commandHandler = (account: AccountDocument) => {
  return new AccountCommand(account._id);
};

export default { streamName, byId, all, commandHandler };
