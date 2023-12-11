import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { useFormik } from "formik";
import supabase from "../../config/supabaseConfig";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt, { hash } from "bcryptjs";
import basicSchemaLogin from "../../schemas/basicSchemaLogin";

function Login() {
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    // Fetch users from supabase
    const { data, error } = await supabase.from("QuizzApp-Users").select();

    // check in database for a object which has email matching with user typed email
    // if yes return entire object if not returns undefined
    const emailMatch = data.find((user) => user.email === values.email);

    if (emailMatch !== undefined) {
      const nameToLocalStorage =
        emailMatch.firstName + " " + emailMatch.secondName;

      // check if password for that particular user matches with the user typed one
      // return boolean
      const passwordMatch = await bcrypt.compare(
        values.password,
        emailMatch.password
      );

      // further if credentials work
      if (passwordMatch) {
        console.log("PASSWORD MATCH !!");
        navigate("/home");

        //set in local storage for user name display in app
        localStorage.setItem("name", nameToLocalStorage);
      } else {
        console.error("PASSWORD DOESN'T MATCH !!");
      }
    } else {
      console.error("EMAIL DOESN'T EXISTS");
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: basicSchemaLogin,
    onSubmit,
  });

  return (
    <div className="h-full flex flex-col justify-center">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col px-5 gap-4 py-10"
      >
        <h1 className="text-center font-bold text-2xl text-gray-200 mb-6">
          LOGIN
        </h1>
        {/* ------------------------------------------ EMAIL ------------------------------------------ */}
        <div className="flex flex-col h-20">
          {/* <label className="text-white" htmlFor="email">
          Email
        </label> */}
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            values={formik.values.email}
            className="bg-slate-500 px-4 py-2 text-lg text-gray-200 placeholder:text-gray-200 rounded-lg focus:outline-none"
            type="email"
            name="email"
            placeholder="Type your email"
          ></input>
          <p className="text-red-400">{formik.errors.email}</p>
        </div>

        {/* ------------------------------------------ PASSWORD ---------------------------------------- */}
        <div className="flex flex-col h-20">
          {/* <label className="text-white" htmlFor="password">
          Password
        </label> */}
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="bg-slate-500 px-4 py-2 text-lg placeholder:text-gray-200 rounded-lg focus:outline-none"
            type="password"
            name="password"
            placeholder="Choose a password"
          ></input>
          <p className="text-red-400">{formik.errors.password}</p>
        </div>
        {/* ------------------------------------------ SUBMIT BUTTON ------------------------------------ */}

        <button
          type="submit"
          className="text-lg font-bold text-gray-200 bg-slate-600 flex w-1/3 m-auto justify-center py-1 px-2 rounded-lg border-2 active:bg-opacity-0 transition"
        >
          Login
        </button>

        <Link to="/register">
          <div className="flex w-full justify-center items-center gap-2 mt-6">
            <p className="text-slate-300 text-center text-lg hover:underline">
              Register
            </p>
            <IoIosArrowForward color="rgb(203 213 225)" size={"17px"} />
          </div>
        </Link>
      </form>
    </div>
  );
}

export default Login;
