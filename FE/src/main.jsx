import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./store/store.jsx";
import { Provider } from "react-redux";
import jwtInterceptors from './utilities/jwtInterceptors.jsx'


jwtInterceptors()
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
