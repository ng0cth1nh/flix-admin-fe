import FormInput from "../../../components/formInput/FormInput";
import { useState, useEffect } from "react";
import "./forgotPassword.scss";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setErrorMessage, setLoading } from "../../../features/auth/authSlice";
import useAxios from "../../../hooks/useAxios";
import ApiContants from "../../../constants/Api";
import getErrorMessage from "../../../utils/getErrorMessage";
import LoadingState from "../../../constants/LoadingState";
import Loading from "../../../components/loading/Loading";

const ForgotPassword = () => {
  const authAPI = useAxios();
  const { errorMessage, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    phone: "",
  });
  useEffect(() => {
    dispatch(setErrorMessage(null));
    dispatch(setLoading(LoadingState.IDLE));
  }, [dispatch]);

  const inputs = [
    {
      id: 1,
      name: "phone",
      type: "text",
      placeholder: "Nhập số điện thoại",
      errorMessage: "Số điện thoại không đúng!",
      label: "Số điện thoại*",
      pattern: "^(03|05|07|08|09|01[2|6|8|9])([0-9]{8})$",
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(LoadingState.PENDING));
      await authAPI.post(ApiContants.SEND_OTP, {
        phone: values.phone,
        roleType: "ADMIN",
      });
      dispatch(setLoading(LoadingState.SUCCEEDED));
      navigate("/confirmOTP", { state: { phone: values.phone } });
    } catch (err) {
      dispatch(setLoading(LoadingState.FAILED));
      dispatch(setErrorMessage(getErrorMessage(err)));
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="forgotpassword">
      <form
        onSubmit={handleSubmit}
        className="form"
        style={{ opacity: loading === LoadingState.PENDING ? 0.5 : 1 }}
      >
        <h1 className="title">Đổi mật khẩu</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        {loading === LoadingState.PENDING && <Loading />}
        {errorMessage && (
          <p style={{ color: "red", fontSize: "12px" }}>{errorMessage}</p>
        )}
        <input type="submit" className="button" value="Tiếp tục" />
        <Link to="/" style={{ textDecoration: "none" }}>
          <p className="link">Đăng nhập</p>
        </Link>
      </form>
    </div>
  );
};

export default ForgotPassword;
