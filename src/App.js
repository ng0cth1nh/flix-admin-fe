import HomePage from "./pages/main/home/HomePage";
import LoginPage from "./pages/auth/login/LoginPage";
import ForgotPasswordPage from "./pages/auth/forgotPassword/ForgotPasswordPage";
import { Route, Routes, Navigate } from "react-router-dom";
import UserProfilePage from "./pages/user-profile/UserProfilePage";
import ListCategoriesPage from "./pages/category/ListCategoriesPage";
import SingleCategoryPage from "./pages/category/SingleCategoryPage";
import ListServicesPage from "./pages/service/ListServicesPage";
import SingleServicePage from "./pages/service/SingleServicePage";
import ListSubServicesPage from "./pages/sub-service/ListSubServicesPage";
import SingleSubServicePage from "./pages/sub-service/SingleSubServicePage";
import ListFeedbacksPage from "./pages/feedback/ListFeedbacksPage";
import FeedbackDetailPage from "./pages/feedback/FeedbackDetailPage";
import NewFeedbackPage from "./pages/feedback/NewFeedbackPage";
import UpdateFeedbackPage from "./pages/feedback/UpdateFeedbackPage";
import ListCustomersPage from "./pages/customer/ListCustomersPage";
import CustomerProfilePage from "./pages/customer/CustomerProfilePage";
import ListRepairersPage from "./pages/repairer/ListRepairersPage";
import RepairerProfilePage from "./pages/repairer/RepairerProfilePage";
import ListRequestsPage from "./pages/request/ListRequestsPage";
import RequestDetailPage from "./pages/request/RequestDetailPage";
import ListTransactionsPage from "./pages/transaction/ListTransactionsPage";
import TransactionDetailPage from "./pages/transaction/TransactionDetailPage";
import WithdrawRequestPage from "./pages/request/WithdrawRequestPage";
import ListAccessoriesPage from "./pages/accessories/ListAccessoriesPage";
import SingleAccessoriesPage from "./pages/accessories/SingleAccessoriesPage";
import ConfirmOTPPage from "./pages/auth/forgotPassword/ConfirmOTPPage";
import CustomRouter from "./customRoutes/customRoutes";
import history from "./customRoutes/history";
import Error from "./pages/error/Error";
import WithdrawRequestDetailPage from "./pages/request/WithdrawRequestDetailPage";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import ListVouchersPage from "./pages/voucher/ListVouchersPage";
function App() {
  const { token } = useSelector((state) => state.auth);
  if (!token && !Cookies.get("token")) {
    console.log("logout");
    return (
      <CustomRouter history={history}>
        <Routes>
          <Route path="/" index element={<LoginPage />} />
          <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
          <Route path="/confirmOTP" element={<ConfirmOTPPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </CustomRouter>
    );
  }
  return (
    <CustomRouter history={history}>
      <Routes>
        <Route path="/home" index element={<HomePage />} />
        <Route path="/userProfile" element={<UserProfilePage />} />
        <Route path="/vouchers" element={<ListVouchersPage />} />
        <Route path="/customers">
          <Route index element={<ListCustomersPage />} />
          <Route
            path="profile/:customerId"
            exact
            element={<CustomerProfilePage />}
          />
        </Route>
        <Route path="/repairers">
          <Route index element={<ListRepairersPage />} />
          <Route
            path="profile/:repairerId"
            exact
            element={<RepairerProfilePage />}
          />
        </Route>
        <Route path="/categories">
          <Route index element={<ListCategoriesPage />} />
          <Route path="category" exact element={<SingleCategoryPage />} />
          <Route path=":categoryId/services">
            <Route index element={<ListServicesPage />} />
            <Route path="service" element={<SingleServicePage />} />
            <Route path=":serviceId/subservices">
              <Route index element={<ListSubServicesPage />} />
              <Route path="subservice" element={<SingleSubServicePage />} />
            </Route>
          </Route>
        </Route>
        <Route path="/requests">
          <Route index element={<ListRequestsPage />} />
          <Route path=":requestId" exact element={<RequestDetailPage />} />
        </Route>
        <Route path="/feedbacks">
          <Route index element={<ListFeedbacksPage />} />
          <Route path="feedback/new" exact element={<NewFeedbackPage />} />
          <Route path="feedback/update" exact element={<UpdateFeedbackPage />} />
          <Route
            path="feedback/view/:feedbackId"
            exact
            element={<FeedbackDetailPage />}
          />
        </Route>
        <Route path="/accessories">
          <Route index element={<ListAccessoriesPage />} />
          <Route path="single" exact element={<SingleAccessoriesPage />} />
        </Route>
        <Route path="/transactions">
          <Route index element={<ListTransactionsPage />} />
          <Route path=":transactionId" exact element={<TransactionDetailPage />} />
        </Route>
        <Route path="/withdraws">
          <Route index element={<WithdrawRequestPage />} />
          <Route path=":withdrawId" exact element={<WithdrawRequestDetailPage />} />
        </Route>
        <Route path="/error" exact element={<Error />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </CustomRouter>
  );
}

export default App;
