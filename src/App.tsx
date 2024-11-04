import { CardsContainer } from "./components/cardsContainer";
import store from "./reducer/reducer";
import { NavBar } from "./components/navBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";

function App() {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NavBar />
        <section className="container mx-auto">
          <CardsContainer />
        </section>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
