import { Field, InputType } from "type-graphql";

@InputType()
export class IData {
  @Field({ nullable: false })
  public revision!: string;
}
