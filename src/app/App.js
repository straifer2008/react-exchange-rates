import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {persistStore} from "redux-persist";
import {BrowserRouter} from "react-router-dom";
import {Header} from "./containers";
import configureStore from "./store/store";
import Loader from "./components/loader";
import AppRoutes from "./routes/appRoutes";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistStore(store)}>
        <div className="App">
          <BrowserRouter>

            <Header />

            <main className="main">
              <AppRoutes />
            </main>

          </BrowserRouter>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
