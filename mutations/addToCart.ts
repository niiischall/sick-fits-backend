import type { KeystoneContext } from "@keystone-next/types";

const addToCart = async (
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
) => {
  //Query the current user if they are signed in or not.
  const userId = context?.session?.itemId;
  if (!userId) {
    throw new Error("No active session detected. Please log-in/sign-up.");
  }

  //Query the cartItems which belongs to the signed-in user.
  const existingCartItems = await context.lists.CartItem.findMany({
    where: {
      user: {
        id: userId,
      },
      product: {
        id: productId,
      },
    },
    resolveFields: "id,quantity",
  });

  const [existingCartItem] = existingCartItems;

  //See if the current item is in their cart.
  if (existingCartItem) {
    //If it is, increment by 1.
    return await context.lists.CartItem.updateOne({
      id: existingCartItem?.id,
      data: {
        quantity: existingCartItem?.quantity + 1,
      },
      resolveFields: false,
    });
  }
  //If it isn't create a new cart item.
  return await context.lists.CartItem.createOne({
    data: {
      product: {
        connect: {
          id: productId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
    resolveFields: false,
  });
};

export default addToCart;
