import FormInput from "../../../components/formInput/FormInput";
import { useState } from "react";
import "./login.scss";
import { Link } from "react-router-dom";

const Login = () => {
  const [values, setValues] = useState({
    phone: "",
    password: "",
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
      isLast:true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="form">
        <h1 className="title">Đăng nhập</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            style={{marginBottom:'15px'}}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button className="button">Đăng nhập</button>
        <Link to="/forgotpassword" style={{ textDecoration: "none" }}>
          <p className="link">Quên mật khẩu?</p>
        </Link>
      </form>
    </div>
  );
};

export default Login;
