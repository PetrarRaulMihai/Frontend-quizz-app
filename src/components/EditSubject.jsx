import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import supabase from "../config/supabaseConfig";
import { useFormik } from "formik";

function EditSubject() {
  const { id } = useParams();
  const [questionNumber, setQuestionNumber] = useState(0);
  const [dataRowById, setDataRowById] = useState([]);
  const [flag, setFlag] = useState(false);
  const [options, setOptions] = useState([]);

  // Question number input handler
  const handleChange = (event) => {
    setQuestionNumber(event.target.value);
  };

  // FORMIK fileds set up
  const formik = useFormik({
    initialValues: {
      question: "",
      answer: "",
      options: "",
    },
  });

  const getQuestion = async () => {
    const { data, error } = await supabase
      .from("QuizzApp-Quizz")
      .select()
      .eq("id", id);

    setDataRowById(data[0]);
    setFlag(true);

    // dataRowById is async set so below is still in event loop queue, that's why we used data[0]
    console.log(data[0]?.questions?.[questionNumber - 1]?.options);

    // update
    formik.setValues({
      question: data[0]?.questions?.[questionNumber - 1]?.question || "",
      answer: data[0]?.questions?.[questionNumber - 1]?.answer || "",
    });
  };

  // DATABASE UPDATE AT SUBMIT
  const updateDB = async () => {
    // setOptions(dataRowById?.questions?.[questionNumber - 1]?.options);
    console.log("formik.values.options:", formik.values);
    console.log(formik.values);
    dataRowById.questions[0].options.map((e, index) => {
      console.log(e);
    });

    // BELOW DATABASE UPDATE
  };

  // The ANSWER which SAVED us ALWAYS
  useEffect(() => {
    formik.setFieldValue("options", options);
  }, [options]);

  const test = (e) => {
    setOptions([]);
  };

  return (
    <div className="px-5">
      <div className="flex items-center mb-5 gap-3">
        <label className="text-white" htmlFor="questionNumber">
          Question number
        </label>
        <input
          className="focus:outline-none bg-slate-500 rounded-xl py-1 text-center w-16"
          onChange={handleChange}
          type="number"
          name="questionNumber"
          placeholder="0"
        ></input>
        <button
          onClick={getQuestion}
          className="bg-orange-500 rounded-xl px-3 py-1 text-white"
        >
          Display
        </button>
      </div>
      {flag && (
        //this is dynamic
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
          {/* QUESTION */}
          <div className="flex flex-col">
            <label htmlFor="question">Question</label>
            <textarea
              id="question"
              className=" w-full resize-none bg-slate-500 rounded-xl px-4 py-1"
              type="text"
              placeholder="Question"
              name="question"
              value={formik.values.question}
              onChange={formik.handleChange}
            >
              {dataRowById.questions[questionNumber - 1]?.question}
            </textarea>
          </div>
          {/* ANSWER */}
          <div className="flex flex-col">
            <label htmlFor="answer">Answer</label>
            <textarea
              onChange={formik.handleChange}
              value={formik.values.answer}
              id="answer"
              className=" w-full resize-none bg-slate-500 rounded-xl px-4 py-1"
              type="text"
              placeholder="Answer"
            >
              {dataRowById.questions[questionNumber - 1]?.answer}
            </textarea>
          </div>
          {/* OPTIONS */}
          <div className="flex flex-col gap-2">
            {" "}
            {dataRowById.questions[questionNumber - 1].options.map(
              (option, index) => {
                return (
                  <div className="flex flex-col">
                    <label htmlFor="option">Option {index + 1}</label>
                    <textarea
                      onChange={test}
                      className=" w-full resize-none bg-slate-500 rounded-xl px-4 py-1"
                    >
                      {option}
                    </textarea>
                  </div>
                );
              }
            )}
          </div>
          {/* SUBMIT ON FORMIK */}
          <div className="flex justify-center">
            <button
              onClick={updateDB}
              type="button"
              className="bg-green-600 rounded-xl px-3 py-1 text-white mt-5"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default EditSubject;
