export * from "./Account";
export * from "./Checkpoint";

import {
  DocumentType,
  getModelForClass,
  ReturnModelType,
} from "@typegoose/typegoose";

/**
 * ----- Account -----
 */

import { AccountClass } from "./Account/class";

export type AccountDocument = DocumentType<AccountClass>;

export type AccountModel = ReturnModelType<typeof AccountClass>;

export const Account = getModelForClass(AccountClass, {
  schemaOptions: { collection: "accounts" },
});

/**
 * ----- Checkpoint -----
 */

import { CheckpointClass } from "./Checkpoint/class";

export type CheckpointDocument = DocumentType<CheckpointClass>;

export type CheckpointModel = ReturnModelType<typeof CheckpointClass>;

export const Checkpoint = getModelForClass(CheckpointClass, {
  schemaOptions: { collection: "checkpoints" },
});
