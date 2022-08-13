const ApiContants = {
  LOGIN: "/login",
  SEND_OTP: "/forgot/password/sendOTP",
  CONFIRM_OTP: "/forgot/password/confirm",
  CHANGE_PASSWORD: "/forgot/password/reset",
  REFRESH_TOKEN: "https://flix-lj7prqscta-as.a.run.app/api/v1/token/refresh",
  FETCH_LIST_CUSTOMER: "/admin/customers",
  VIEW_CUSTOMER_INFO: "/admin/customer",
  SEARCH_CUSTOMER: "/admin/search/customers",
  FETCH_LIST_REPAIRER: "/admin/repairers",
  SEARCH_REPAIRER: "admin/search/repairers",
  VIEW_REPAIRER_INFO: "/admin/repairer",
  BAN_USER: "/admin/blackList",
  ADMIN_PROFILE: "/admin/profile",
  UPDATE_AVATAR: "/user/avatar",
  UPDATE_PASSWORD: "/user/changePassword",
  FETCH_LIST_WITHDRAW: "/admin/repairer/withdraw/histories",
  SEARCH_WITHDRAW: "/admin/repairer/withdraw/search",
  VIEW_WITHDRAW_DETAIL: "/admin/withdraw/detail",
  APPROVE_WITHDRAW: "/admin/withdraw/accept",
  REJECT_WITHDRAW: "/admin/withdraw/reject",
  CV_ACCEPT:"/admin/cv/accept",
  CV_REJECT:"/admin/cv/reject",
  TRANSACTION_LIST:"/admin/transactions",
  TRANSACTION_DETAIL:"/admin/transaction",
  TRANSACTION_SEARCH:"/admin/search/transactions",
  REQUEST_LIST:"/admin/requests",
  REQUEST_SEARCH:"/admin/search/request",
  REQUEST_DETAIL:"/admin/request",
  ACCESSORIES_LIST:"/admin/accessories",
  ACCESSORY_SEARCH: "/admin/search/accessories",
  ACCESSORY_SINGLE:"/admin/accessory",
  FEEDBACK_LIST:"/admin/feedbacks",
  FEEDBACK_SINGLE:"/admin/feedback",
  FEEDBACK_SEARCH:"/admin/search/feedbacks",
  CATEGORY_LIST:"/admin/categories",
  CATEGORY_SINGLE:"/admin/category",
  CATEGORY_SEARCH:"/admin/search/categories",
  CATEFORY_ALL:"/category/all",
  SERVICE_LIST:"/admin/services",
  SERVICE_SINGLE:"/admin/service",
  SERVICE_SEARCH:"/admin/search/services",
  SERVICE_SELECT_ALL:"/category/service/all",
  SUBSERVICE_LIST:"/admin/subServices",
  SUBSERVICE_SINGLE:"/admin/subService",
  SUBSERVICE_SEARCH:"/admin/search/subServices",
  COUNT_WITHDRAW:"/admin/withdraw/pending/count",
  COUNT_FEEDBACK:"/admin/feedback/pending/count",
};
export default ApiContants;
