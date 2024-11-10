import store from "./reducer/reducer";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";

import { Routes, Route } from "react-router-dom";
import Products from "./pages/products";
import Cart from "./pages/cart";
import CheckOut from "./pages/checkOut";

function App() {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
        </Routes>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
