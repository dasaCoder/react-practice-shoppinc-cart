import { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props: any) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();
  const submitHandler = (event: any) => {
    event.preventDefault();
    const entredAmount =
      amountInputRef.current && amountInputRef.current["value"];
    const numericAmount = entredAmount ? +entredAmount : 0;

    if (numericAmount < 1 || numericAmount > 5) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(entredAmount);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
