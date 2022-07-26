import Home from "./pages/main/home/Home";
import Login from "./pages/auth/login/Login";
import ForgotPassword from "./pages/auth/forgotPassword/ForgotPassword";
import List from "./pages/list/List";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import UserProfile from "./pages/user-profile/UserProfile";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ListCategories from "./pages/category/ListCategories";

function App() {
  console.log("createTheme", createTheme);
  const theme = createTheme({
    palette: {
      background: {
        paper: "#fff",
      },
      text: {
        primary: 'black',
        header: "#0941b0",
        // : "#46505A",
      },
      action: {
        active: "#001E3C",
      },
      status: {
        success: "#009688",
      },
    },
  });
  let routes;
  if (true) {
    routes = (
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/users">
          <Route index element={<List />} />
          <Route path=":userId" element={<Single />} />
          <Route
            path="new"
            element={<New inputs={userInputs} title="Add New User" />}
          />
        </Route>
        <Route path="/categories">
          <Route index element={<ListCategories />} />
          <Route path=":userId" element={<Single />} />
          <Route
            path="new"
            element={<New inputs={userInputs} title="Add New User" />}
          />
        </Route>
        <Route path="/products">
          <Route index element={<List />} />
          <Route path=":productId" element={<Single />} />
          <Route
            path="new"
            element={<New inputs={productInputs} title="Add New Product" />}
          />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/login" index element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }
  return (
    <ThemeProvider theme={theme}>
    <Router>{routes}</Router>
    </ThemeProvider>
  );
}

export default App;
