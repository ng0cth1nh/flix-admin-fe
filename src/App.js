import Home from "./pages/main/home/Home";
import Login from "./pages/auth/login/Login";
import ForgotPassword from "./pages/auth/forgotPassword/ForgotPassword";
import {
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
import TransactionDetail from "./pages/transaction/TransactionDetail";
import WithdrawRequest from "./pages/request/WithdrawRequest";
import ListAccessories from "./pages/accessories/ListAccessories";
import SingleAccessories from "./pages/accessories/SingleAccessories";
import ConfirmOTP from "./pages/auth/forgotPassword/ConfirmOTP";
import CustomRouter from "./customRoutes/customRoutes";
import history from "./customRoutes/history";
import Error from "./pages/error/Error";
import WithdrawRequestDetail from "./pages/request/WithdrawRequestDetail";

function App() {
  return (
    <CustomRouter history={history}>
      <Routes>
        <Route path="/" index element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/confirmOTP" element={<ConfirmOTP />} />
        <Route path="/home" index element={<Home />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/customers">
          <Route index element={<ListCustomers />} />
          <Route
            path="profile/:customerId"
            exact
            element={<CustomerProfile />}
          />
        </Route>
        <Route path="/repairers">
          <Route index element={<ListRepairers />} />
          <Route
            path="profile/:repairerId"
            exact
            element={<RepairerProfile />}
          />
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
          <Route path=":requestId" exact element={<RequestDetail />} />
        </Route>
        <Route path="/feedbacks">
          <Route index element={<ListFeedbacks />} />
          <Route path="feedback/new" exact element={<NewFeedback />} />
          <Route
            path="feedback/update"
            exact
            element={<UpdateFeedback />}
          />
          <Route
            path="feedback/view/:feedbackId"
            exact
            element={<FeedbackDetail />}
          />
        </Route>
        <Route path="/accessories">
          <Route index element={<ListAccessories />} />
          <Route path="single" exact element={<SingleAccessories />} />
        </Route>
        <Route path="/transactions">
          <Route index element={<ListTransactions />} />
          <Route path=":transactionId" exact element={<TransactionDetail />} />
        </Route>
        <Route path="/withdraws">
          <Route index element={<WithdrawRequest />} />
          <Route
            path=":withdrawId"
            exact
            element={<WithdrawRequestDetail />}
          />
        </Route>
        <Route path="/error" exact element={<Error />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </CustomRouter>
  );
}

export default App;
