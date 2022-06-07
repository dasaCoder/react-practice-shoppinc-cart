import { createStore } from "redux";

const storeReducer = (
  state: { items: StoreItem[]; totalAmount: number } = {
    items: [],
    totalAmount: 0,
  },
  action: any
) => {
  const itemsFromState = state.items;

  if (action.type === "ADD") {
    const amountNumValue = +action.item.amount;
    const updatedTotal = state.totalAmount + action.item.price * amountNumValue;

    const existingCartItemIndex = state.items.findIndex(
      (item: any) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex] as StoreItem;
    let updatedItem;
    let updatedItems;
    if (existingCartItem) {
      updatedItem = {
        ...existingCartItem,
        amount: +existingCartItem.amount + amountNumValue,
      };
      updatedItems = [...itemsFromState];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotal,
    };
  } else if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item: any) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex] as StoreItem;
    const updatedTotalAmount = state.totalAmount - existingCartItem["price"];
    let updatedItems: StoreItem[];
    if (existingCartItem["amount"] === 1) {
      updatedItems = state.items.filter((item: any) => item.id !== action.id);
    } else {
      const updatedItem: StoreItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  return state;
};

const CartStore = createStore(storeReducer);

class StoreItem {
  id!: string;
  name!: string;
  amount!: number;
  price!: number;
  description!: string;
}

export default CartStore;
