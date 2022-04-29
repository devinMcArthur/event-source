import { prop } from "@typegoose/typegoose";
import { CheckpointTypes } from "@typescript/checkpoint";

export class CheckpointSchema {
  @prop({ required: true, enum: CheckpointTypes })
  public _id!: string;

  @prop({ required: true })
  public position!: string;
}
