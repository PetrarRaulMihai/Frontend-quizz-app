import React, { useEffect, useState } from "react";
import Subject from "./Subject";
import supabase from "../config/supabaseConfig";
import { FaCirclePlus } from "react-icons/fa6";
import { FaSpinner } from "react-icons/fa";
import { useFormik } from "formik";

function Subjects() {
  const [quizArray, setQuizArray] = useState([]);
  const [loading, setLoading] = useState(true);

  const [questions, setQuestions] = useState([]);

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
    console.log(quizArray);
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      icon: "",
      question: "",
      answer: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      questions: [],
    },
  });

  const addQuestion = () => {
    const newQuestion = {
      question: formik.values.question,
      answer: formik.values.answer,
      options: [
        formik.values.option1,
        formik.values.option2,
        formik.values.option3,
        formik.values.option4,
      ],
    };

    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);

    formik.setFieldValue("question", "");
    formik.setFieldValue("answer", "");
    formik.setFieldValue("option1", "");
    formik.setFieldValue("option2", "");
    formik.setFieldValue("option3", "");
    formik.setFieldValue("option4", "");
  };

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      questions: questions,
    });
  }, [questions]);

  const submitAllData = async () => {
    const { error } = await supabase.from("QuizzApp-Quizz").insert({
      title: formik.values.title,
      icon: formik.values.icon,
      questions: formik.values.questions,
    });

    console.log(formik.values.questions);
    formik.resetForm();
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

      {/* Add subject form */}

      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
        {/* Title */}
        <input
          type="text"
          placeholder="Subject title"
          name="title"
          onChange={formik.handleChange}
          value={formik.values.title}
        ></input>
        {/* Icon */}
        <input
          type="text"
          placeholder="Icon"
          name="icon"
          onChange={formik.handleChange}
          value={formik.values.icon}
        ></input>

        <div className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Question"
            name="question"
            onChange={formik.handleChange}
            value={formik.values.question}
          ></input>
          <input
            type="text"
            placeholder="Answer"
            name="answer"
            onChange={formik.handleChange}
            value={formik.values.answer}
          ></input>
          {/* option inputs */}
          <div>
            <input
              name="option1"
              type="text"
              placeholder="Option1"
              onChange={formik.handleChange}
              value={formik.values.option1}
            ></input>{" "}
            <input
              name="option2"
              type="text"
              placeholder="Option2"
              onChange={formik.handleChange}
              value={formik.values.option2}
            ></input>{" "}
            <input
              name="option3"
              type="text"
              placeholder="Option3"
              onChange={formik.handleChange}
              value={formik.values.option3}
            ></input>{" "}
            <input
              name="option4"
              type="text"
              placeholder="Option4"
              onChange={formik.handleChange}
              value={formik.values.option4}
            ></input>{" "}
          </div>
        </div>

        <button type="button" onClick={addQuestion}>
          Add question
        </button>

        <div>
          <button
            className="bg-green-500 p-4"
            type="button"
            onClick={submitAllData}
          >
            Submit all data
          </button>
        </div>
      </form>

      {/* end of form. building the delete function */}

      <div>
        {quizArray.map((quizz) => {
          return <p>{quizz.title}</p>;
        })}
      </div>
    </div>
  );
}

export default Subjects;

// FURTHER TO CONTINU THIS SUBJECT SELECTED EDITING
// title input
// questions input
// input ect....

// mai departe luat valori de pe inpututir si pus in supabase
