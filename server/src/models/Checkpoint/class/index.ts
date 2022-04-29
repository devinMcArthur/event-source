import { CheckpointModel } from "@models";
import { CheckpointSchema } from "../schema";
import get from "./get";
import update from "./update";

export class CheckpointClass extends CheckpointSchema {
  /**
   * ----- GET -----
   */

  public static getAccount(this: CheckpointModel) {
    return get.account(this);
  }

  /**
   * ----- Update -----
   */

  public static updateAccount(this: CheckpointModel, commitPosition: string) {
    return update.account(this, commitPosition);
  }
}
