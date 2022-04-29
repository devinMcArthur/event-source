import { prop } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class SchemaBase {
  @Field(() => ID, { nullable: false })
  @prop({ required: true })
  public _id!: string;

  @Field({ nullable: false })
  @prop({ required: true })
  public revision!: number;

  @Field({ nullable: false })
  @prop({ required: true })
  public createdAt!: Date;
}
