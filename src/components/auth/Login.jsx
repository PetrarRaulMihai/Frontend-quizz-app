import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { useFormik } from "formik";
import supabase from "../../config/supabaseConfig";
import { useState } from "react";

function Login() {
  const onSubmit = async (values) => {
    // Fetch users from supabase
    const { data, error } = await supabase.from("quizzAppUsers").select();
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      if (
        values.email === data[i].email &&
        values.password === data[i].password
      ) {
        console.log("Credentials match");
      } else {
        console.log("Credentials doesn't match");
      }
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
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
          <p className="text-red-400"></p>
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
          <p className="text-red-400"></p>
        </div>
        {/* ------------------------------------------ SUBMIT BUTTON ------------------------------------ */}

        <button className="text-lg font-bold text-gray-200 bg-slate-600 flex w-1/3 m-auto justify-center py-1 px-2 rounded-lg border-2 active:bg-opacity-0 transition">
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
