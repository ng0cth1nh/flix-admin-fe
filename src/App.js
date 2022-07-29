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
import ListCategories from "./pages/category/ListCategories";
import SingleCategory from "./pages/category/SingleCategory";
import ListServices from "./pages/service/ListServices";
import SingleService from "./pages/service/SingleService";
import ListSubServices from "./pages/sub-service/ListSubServices";
import SingleSubService from "./pages/sub-service/SingleSubService";
import ListFeedbacks from "./pages/feedback/ListFeedbacks";
import FeedbackDetail from "./pages/feedback/FeedbackDetail";
import NewFeedback from "./pages/feedback/NewFeedback";
import UpdateFeedback from "./pages/feedback/UpdateFeedback";
import ListCustomers from "./pages/customer/ListCustomers";

function App() {
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
        <Route path="/customers">
          <Route index element={<ListCustomers />} />
        </Route>
        <Route path="/feedbacks">
          <Route index element={<ListFeedbacks />} />
          <Route path="feedback/new" exact element={<NewFeedback />} />
          <Route path="feedback/update/:feedbackId" exact element={<UpdateFeedback />} />
          <Route path="feedback/view/:feedbackId" exact element={<FeedbackDetail />} />
        </Route>

        <Route path="/categories">
          <Route index element={<ListCategories />} />
          <Route path="category" exact element={<SingleCategory />} />
          <Route path=":categoryId/services">
            <Route index element={<ListServices />} />
            <Route path="service" element={<SingleService />} />
            <Route path=":serviceId/subservices">
              <Route index element={<ListSubServices />} />
              <Route path="subservice" element={<SingleSubService />} />
            </Route>
          </Route>
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
    // <ThemeProvider theme={theme}>
    <Router>{routes}</Router>
    // </ThemeProvider>
  );
}

export default App;
