import { useContext } from "react";
import { useSelector } from "react-redux";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props: any) => {
  const itemsFromCart = useSelector((state: any) => state.items);

  return (
    <button className={classes.button} onClick={props.onShowCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{itemsFromCart.length}</span>
    </button>
  );
};

export default HeaderCartButton;
