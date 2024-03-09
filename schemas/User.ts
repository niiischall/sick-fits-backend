import { list } from "@keystone-next/keystone/schema";
import { password, text } from "@keystone-next/fields";

export const User = list({
  // TODO: Add Access.
  // TODO: Add UI.
  fields: {
    name: text({ isRequired: true }),
    email: text({ isRequired: true, isUnique: true }),
    password: password(),
    // TODO: add roles, cart and orders.
  },
});
