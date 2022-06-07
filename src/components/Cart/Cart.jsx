import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const itemsFromStore = useSelector((state) => state.items);
  const totalFromStore = useSelector((state) => state.totalAmount);
  const itemDispatch = useDispatch();

  const totalAmount = `$${totalFromStore.toFixed(2)}`;
  const hasItems = itemsFromStore.length > 0;

  const cartItemRemoveHandler = (id) => {
    // cartCtx.removeItem(id);
    itemDispatch({ type: "REMOVE", id: id });
  };
  const cartItemAddHandler = (item) => {
    // cartCtx.addItem(item);
    itemDispatch({ type: "ADD", item: item });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {itemsFromStore.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, {
              ...item,
              amount: 1,
            })}
          />
        );
      })}
    </ul>
  );
  return (
    <Modal>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
