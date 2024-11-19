import Body from "./Component/Body";
import Profile from "./Component/Profile";
import Login from "./Component/Login";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utilish/appStore";
import Feed from "./Component/Feed";
import Connections from "./Component/Connections";
import Requests from "./Component/Requests";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Requests />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
