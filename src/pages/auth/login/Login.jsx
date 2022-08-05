import FormInput from "../../../components/formInput/FormInput";
import { useState, useEffect } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import useAxios from "../../../hooks/useAxios";
import LoadingState from "../../../constants/LoadingState";
import Loading from "../../../components/loading/Loading";
import {
  setErrorMessage,
  setLoading,
  tryLocalSignIn,
} from "../../../features/auth/authSlice";

const Login = () => {
  const authAPI = useAxios();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { errorMessage, loading, token } = useSelector((state) => state.auth);
  const [values, setValues] = useState({
    phone: "",
    password: "",
  });
  useEffect(() => {
    if (token) {
      navigate("/home", { replace: true });
    }
  }, [token, navigate]);

  useEffect(() => {
    dispatch(tryLocalSignIn({ dispatch }));
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
      isLast: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        login({
          authAPI,
          username: values.phone,
          password: values.password,
          roleType: "ADMIN",
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="login">
      <form
        onSubmit={handleSubmit}
        className="form"
        style={{ opacity: loading === LoadingState.PENDING ? 0.5 : 1 }}
      >
        <h1 className="title">Đăng nhập</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            style={{ marginBottom: "15px" }}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        {loading === LoadingState.PENDING && <Loading />}
        {errorMessage && (
          <p style={{ color: "red", fontSize: "12px" }}>{errorMessage}</p>
        )}
        <button className="button">Đăng nhập</button>
        <Link to="/forgotpassword" style={{ textDecoration: "none" }}>
          <p className="link">Quên mật khẩu?</p>
        </Link>
      </form>
    </div>
  );
};

export default Login;
