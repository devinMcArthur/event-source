import { Account } from "@models";

const subscriptions = async () => {
  await Account.subscribeToEvents();
};

export default subscriptions;
