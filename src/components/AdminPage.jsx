import React, { useEffect, useState, useRef } from "react";
import Subject from "./Subject";
import supabase from "../config/supabaseConfig";
import { FaCirclePlus } from "react-icons/fa6";
import { FaSpinner } from "react-icons/fa";
import { useFormik } from "formik";
import { object } from "yup";

function Subjects() {
  const [quizArray, setQuizArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subjectSelected, setSubjectSelected] = useState("");
  const inputRef = useRef();

  const [optionObject, setOptionObject] = useState({
    answer: "",
    options: [],
    question: "",
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      icon: "",
      questions: [],
    },
  });

  useEffect(() => {
    const fetchSupa = async () => {
      try {
        const { data, error } = await supabase.from("QuizzApp-Quizz").select();
        setQuizArray(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSupa();
  }, []);

  // add options in array of options
  const addOption = () => {
    setOptionObject({
      ...optionObject,
      options: [...optionObject.options, inputRef.current.value],
    });
    console.log(optionObject);
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  return (
    <div className="px-5">
      <div className="flex gap-5 px-3 bg-[#3c4d67] py-2 items-center text-white font-bold rounded-xl">
        <div className=" rounded-lg">
          <FaCirclePlus
            color=" rgb(34 197 94 / var(--tw-bg-opacity)"
            size={"50px"}
          />
        </div>
        <p className="text-lg">Add new subject</p>
      </div>
      {/* <select onChange={handleChange}>
        {quizArray.map((item) => {
          return <option value={item.title}>{item.title}</option>;
        })}
      </select> */}

      {/* DE PROBA de aici se continua ------------------------------------------- */}
      <div>{/* <p>{subjectSelected}</p> */}</div>

      {/* Add subject form */}
      {true && (
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
          {/* Title */}
          <input type="text" placeholder="Subject title"></input>
          {/* Icon */}
          <input type="text" placeholder="Icon"></input>

          {/* Questions $ answers */}
          <div className="flex flex-col gap-5">
            <input type="text" placeholder="Question"></input>
            <input type="text" placeholder="Answer"></input>
            <div>
              <input
                ref={inputRef}
                name="options"
                type="text"
                placeholder="Option"
              ></input>{" "}
              <button
                onClick={addOption}
                type="submit"
                className="bg-green-500"
              >
                ADD
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default Subjects;

// FURTHER TO CONTINU THIS SUBJECT SELECTED EDITING
// title input
// questions input
// input ect....

// mai departe luat valori de pe inpututir si pus in supabase
