import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./containers/Login";
import Body from "./containers/Body";
import Profile from "./containers/Profile";
import { Provider } from "react-redux";
import appStore from "./store/appStore";
import Feed from "./containers/Feed";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
