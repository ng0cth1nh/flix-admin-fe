import FormInput from "../../../components/formInput/FormInput";
import { useState } from "react";
import "./forgotPassword.scss";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    phone: "",
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
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/confirmOTP",values.phone);
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
        <input type="submit" className="button" value="Tiếp tục"/>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <p className="link">Đăng nhập</p>
        </Link>
      </form>
    </div>
  );
};

export default ForgotPassword;