import { prop } from "@typegoose/typegoose";
import { SchemaBase } from "@typescript/schema";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class OfficeSchema extends SchemaBase {
  @Field({ nullable: false })
  @prop({ required: true })
  public name!: string;
}
