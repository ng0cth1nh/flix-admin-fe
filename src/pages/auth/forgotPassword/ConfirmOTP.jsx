import FormInput from "../../../components/formInput/FormInput";
import { useState, useEffect } from "react";
import "./ConfirmOTP.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import { useSelector, useDispatch } from "react-redux";
import { setErrorMessage, setLoading } from "../../../features/auth/authSlice";
import ApiContants from "../../../constants/Api";
import LoadingState from "../../../constants/LoadingState";
import getErrorMessage from "../../../utils/getErrorMessage";
import Loading from "../../../components/loading/Loading";

const ConfirmOTP = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const authAPI = useAxios();
  const dispatch = useDispatch();
  const { errorMessage, loading } = useSelector((state) => state.auth);
  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
    otp: "",
  });
  useEffect(() => {
    dispatch(setErrorMessage(null));
    dispatch(setLoading(LoadingState.IDLE));
  }, [dispatch]);

  const inputs = [
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Nhập mật khẩu",
      errorMessage:
        "Mật khẩu phải từ 6 đến 10 kí tự và bao gồm ít nhất 1 số hoặc 1 kí tự!",
      label: "Mật khẩu*",
      pattern: "^((?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,10})$",
      required: true,
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Nhập lại mật khẩu",
      errorMessage: "Mật khẩu nhập lại không khớp!",
      label: "Nhập lại mật khẩu",
      pattern: values.password,
      required: true,
      isLast: true,
    },
    {
      id: 1,
      name: "otp",
      type: "text",
      placeholder: "Nhập mã OTP",
      errorMessage: "Mã OTP gồm 6 số!",
      label: "Mã OTP*",
      pattern: "^([0-9]{6})$",
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    console.log("otp: ", values.otp);
    e.preventDefault();
    try {
      dispatch(setLoading(LoadingState.PENDING));
      const response = await authAPI.post(ApiContants.CONFIRM_OTP, {
        phone: state.phone,
        otp: values.otp,
      });
      await authAPI.put(
        ApiContants.CHANGE_PASSWORD,
        {
          newPassword: values.password,
        },
        {
          headers: {
            Authorization: `Bearer ${response.data.accessToken}`,
          },
        }
      );
      dispatch(setLoading(LoadingState.SUCCEEDED));
      navigate("/");
    } catch (err) {
      dispatch(setLoading(LoadingState.FAILED));
      dispatch(setErrorMessage(getErrorMessage(err)));
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="confirm-otp">
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
        <button className="button">Đổi mật khẩu</button>
        <Link to="/" style={{ textDecoration: "none" }}>
          <p className="link">Đăng nhập</p>
        </Link>
      </form>
    </div>
  );
};

export default ConfirmOTP;
