import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { store } from "./store/store";
import "./App.scss";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
    </Provider>
  );
}

export default App;
