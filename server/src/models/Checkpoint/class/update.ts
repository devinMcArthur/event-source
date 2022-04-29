import { CheckpointModel } from "@models";
import { CheckpointTypes } from "@typescript/checkpoint";

const account = async (Checkpoint: CheckpointModel, commitPosition: string) => {
  await Checkpoint.updateOne(
    {
      _id: CheckpointTypes.account,
    },
    {
      $set: {
        position: commitPosition,
      },
    },
    {
      upsert: true,
    }
  );
};

export default {
  account,
};
