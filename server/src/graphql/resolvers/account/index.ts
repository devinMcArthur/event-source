import { Account, AccountClass } from "@models";
import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import mutations, {
  AccountCreateData,
  AccountUpdateNameData,
} from "./mutations";

@Resolver(() => AccountClass)
export default class AccountResolver {
  @Query(() => [AccountClass])
  async accounts() {
    return Account.getAll();
  }

  @Query(() => AccountClass, { nullable: true })
  async account(@Arg("id", { nullable: false }) id: string) {
    return Account.getById(id);
  }

  /**
   * ----- Mutations -----
   */

  @Mutation(() => String)
  async accountCreate(
    @Arg("data", () => AccountCreateData, { nullable: false })
    data: AccountCreateData
  ) {
    return mutations.create(data);
  }

  @Mutation(() => Boolean)
  async accountUpdateName(
    @Arg("id", () => ID, { nullable: false }) id: string,
    @Arg("data", () => AccountUpdateNameData, { nullable: false })
    data: AccountUpdateNameData
  ) {
    return mutations.updateName(id, data);
  }
}
