import React, { Fragment, useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";

function App() {
  const [isShowCart, setIsShowCart] = useState(false);

  const showCartHandler = () => {
    setIsShowCart(true);
  };

  const hideCartHander = () => setIsShowCart(false);

  return (
    <Fragment>
      {isShowCart && <Cart onHideCart={hideCartHander} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;
