import FormInput from "../../../components/formInput/FormInput";
import { useState } from "react";
import "./ConfirmOTP.scss";
import { Link } from "react-router-dom";

const ConfirmOTP = () => {
  const [values, setValues] = useState({
    phone: "",
    password: "",
    confirmPassword:""
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="confirm-otp">
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

export default ConfirmOTP;