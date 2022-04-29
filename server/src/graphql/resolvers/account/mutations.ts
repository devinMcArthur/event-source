import { AccountCommand } from "@commands";
import { IData } from "@graphql/types";
import { Account } from "@models";
import { Field, InputType } from "type-graphql";
import { v4 as uuid } from "uuid";

@InputType()
export class AccountCreateData {
  @Field({ nullable: false })
  public name!: string;
}

@InputType()
export class AccountUpdateNameData extends IData {
  @Field({ nullable: false })
  public name!: string;
}

const create = async (data: AccountCreateData) => {
  const accountId = uuid();
  const accountCommand = new AccountCommand(accountId);

  await accountCommand.create({
    accountId,
    name: data.name,
  });

  return accountId;
};

const updateName = async (accountId: string, data: AccountUpdateNameData) => {
  const account = await Account.getById(accountId);
  if (!account) throw new Error("Unable to find account");

  await account.getCommandHandler().updateName(
    {
      name: data.name,
    },
    Number(data.revision)
  );

  return true;
};

export default { create, updateName };
