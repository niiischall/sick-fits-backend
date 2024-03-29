import { list } from "@keystone-next/keystone/schema";
import { password, relationship, text } from "@keystone-next/fields";

export const User = list({
  // TODO: Add Access.
  // TODO: Add UI.
  fields: {
    name: text({ isRequired: true }),
    email: text({ isRequired: true, isUnique: true }),
    password: password(),
    cart: relationship({
      ref: "CartItem.user",
      many: true,
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "read" },
      },
    }),
    // TODO: add roles and orders.
  },
});
