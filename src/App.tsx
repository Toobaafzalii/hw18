import { CardsContainer } from "./components/cardsContainer";
import store from "./reducer/reducer";
import { NavBar } from "./components/navBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { FiltersBox } from "./components/filtersBox";
import { Routes, Route } from "react-router-dom";
import { CheckOut } from "./pages/checkOut";
import Products from "./pages/products";

function App() {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/checkout" element={<CheckOut />} />
        </Routes>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
