import { CheckpointModel } from "@models";
import { CheckpointTypes } from "@typescript/checkpoint";

const account = async (Checkpoint: CheckpointModel) => {
  const account = await Checkpoint.findOne({
    _id: CheckpointTypes.account,
  });

  return account;
};

export default {
  account,
};
