import { createContext, useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products.js";

/*
 * We are deliberately starting with an uppercase character, because this value that is produced by createContext will actually be 
   an object that contains a React component. Reason tochose a name that starts with an uppercase character because we're now going to 
   use this context as a component. Or to be precise, we're going to access a property on this context object that was created by React
   that's called Provider.
 
 * We can also pass a value to createContext that will be used as an initial value that can be provided to multiple components
   in your React app, to all the components that will be wrapped by this context. Now the value that will be provided to components
   via this context feature can be any value we want. It can be a number, it can be a string,and it can also be an object, or array.

 * We need to provide this context in our application, and we need to wrap it around parts of that application, parts of our 
   component tree, so to say,so that those wrapped components can access this value which we're providing here.  

 * Why is setting this default value here useful? Because if we do set this we get better auto completion intellense to select the propery.
   
 * When we create a context in React using React.createContext, you can provide a default value. This default value is used if 
   a component tries to access the context but is not wrapped in a corresponding Provider. Meaning any component is not wrapped 
   between this <Context.Provider></Context.Provider>

   * Default Value: The value provided when creating the context (React.createContext(defaultValue)) is used if a component tries 
                    to access the context but is not within a Provider.
   * Context Provider: When a component is within a Provider, it gets the value from the nearest Provider in the component tree, 
                       overriding the default value. 
   
*/
export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateItemInCart: () => {},
});

function shoppingCartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.paylod
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const product = DUMMY_PRODUCTS.find(
        (product) => product.id === action.paylod
      );
      updatedItems.push({
        id: action.paylod,
        name: product.title,
        price: product.price,
        quantity: 1,
      });
    }

    return {
      ...state, // just to show how to handle complex state, but here not needed because we have only one value
      items: updatedItems,
    };
  }
  if (action.type === "UPDATE_ITEM") {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.paylod.productID
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += action.paylod.productAmount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      ...state, // just to show how to handle complex state, but here not needed because we have only one value
      items: updatedItems,
    };
  }

  return state;
}

export default function CartContextProvider({ children }) {
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    { items: [] }
  );

  function handleAddItemToCart(id) {
    shoppingCartDispatch({
      type: "ADD_ITEM",
      paylod: id,
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    shoppingCartDispatch({
      type: "UPDATE_ITEM",
      paylod: { productID: productId, productAmount: amount },
    });
  }

  const ctxValue = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    updateItemInCart: handleUpdateCartItemQuantity,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
