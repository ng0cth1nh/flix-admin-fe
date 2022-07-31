import Home from "./pages/main/home/Home";
import Login from "./pages/auth/login/Login";
import ForgotPassword from "./pages/auth/forgotPassword/ForgotPassword";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
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
import CustomerProfile from "./pages/customer/CustomerProfile";
import ListRepairers from "./pages/repairer/ListRepairers";
import RepairerProfile from "./pages/repairer/RepairerProfile";
import ListRequests from "./pages/request/ListRequests";
import RequestDetail from "./pages/request/RequestDetail";
import ListTransactions from "./pages/transaction/ListTransactions";

function App() {
  let routes;
  if (true) {
    routes = (
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/customers">
          <Route index element={<ListCustomers />} />
          <Route path="profile/:customerId" exact element={<CustomerProfile />} />
        </Route>
        <Route path="/repairers">
          <Route index element={<ListRepairers />} />
          <Route path="profile/:repairerId" exact element={<RepairerProfile />} />
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
        <Route path="/requests">
          <Route index element={<ListRequests />} />
          <Route path=":requestId" exact element={< RequestDetail/>} />
        </Route>
        <Route path="/feedbacks">
          <Route index element={<ListFeedbacks />} />
          <Route path="feedback/new" exact element={<NewFeedback />} />
          <Route path="feedback/update/:feedbackId" exact element={<UpdateFeedback />} />
          <Route path="feedback/view/:feedbackId" exact element={<FeedbackDetail />} />
        </Route>
        <Route path="/transactions">
          <Route index element={<ListTransactions />} />
          {/* <Route path=":transactionId" exact element={< RequestDetail/>} /> */}
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
