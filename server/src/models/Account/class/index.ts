import { AllStreamResolvedEvent } from "@eventstore/db-client";
import { AccountDocument, AccountModel } from "@models";
import {
  AccountCreatedEvent,
  AccountNameUpdatedEvent,
} from "events/Account/events";
import { ObjectType } from "type-graphql";
import { AccountSchema } from "../schema";
import get from "./get";
import project from "./project";
import subscribe from "./subscribe";

@ObjectType()
export class AccountClass extends AccountSchema {
  /**
   * ----- Get -----
   */

  public static async getById(this: AccountModel, accountId: string) {
    return get.byId(this, accountId);
  }

  public static async getAll(this: AccountModel) {
    return get.all(this);
  }

  public static getStreamName(this: AccountModel, accountId: string) {
    return get.streamName(accountId);
  }

  public getCommandHandler(this: AccountDocument) {
    return get.commandHandler(this);
  }

  /**
   * ----- Subscribe -----
   */

  public static subscribeToEvents(this: AccountModel) {
    return subscribe.events(this);
  }

  /**
   * ----- Projection -----
   */

  public static async projectEvent(
    this: AccountModel,
    resolvedEvent: AllStreamResolvedEvent
  ) {
    return project.event(this, resolvedEvent);
  }

  public static async projectCreation(
    this: AccountModel,
    event: AccountCreatedEvent,
    streamRevision: number
  ) {
    return project.creation(this, event, streamRevision);
  }

  public static async projectUpdateName(
    this: AccountModel,
    event: AccountNameUpdatedEvent,
    streamRevision: number
  ) {
    return project.updateName(this, event, streamRevision);
  }
}
