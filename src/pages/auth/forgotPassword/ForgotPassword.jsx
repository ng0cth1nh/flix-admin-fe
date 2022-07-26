import FormInput from "../../../components/formInput/FormInput";
import { useState } from "react";
import "./forgotPassword.scss";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [values, setValues] = useState({
    phone: "",
    password: "",
    confirmPassword:""
  });

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
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="forgotpassword">
      <form onSubmit={handleSubmit} className="form">
        <h1 className="title">Đổi mật khẩu</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button className="button">Đổi mật khẩu</button>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <p className="link">Đăng nhập</p>
        </Link>
      </form>
    </div>
  );
};

export default ForgotPassword;