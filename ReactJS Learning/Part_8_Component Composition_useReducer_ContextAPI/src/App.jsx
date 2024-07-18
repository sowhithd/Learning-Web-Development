import Header from "./components/Header.jsx";
import Shop from "./components/Shop.jsx";
import Product from "./components/Product.jsx";
import CartContextProvider  from "./store/shopping-cart-context.jsx";
import {DUMMY_PRODUCTS} from './dummy-products.js';

function App() {

  return (
    <CartContextProvider>
      <Header />
      {/*<Shop onAddItemToCart={handleAddItemToCart} />*/}
      {/*
        Component Composition:
        We at least got rid of parts of that prop drilling problem.
        Though, and that's the downside of this solution, you typically don't want to use this solution for all your component layers.
        Because it would mean that in the end, all your components just end up in the app component and all the other components are 
        just wrapper components.Which you could do, but which would of course lead to a pretty bloated app component
      */}
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </Shop>
    </CartContextProvider>
  );
}

export default App;
