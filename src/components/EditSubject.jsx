import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import supabase from "../config/supabaseConfig";

function EditSubject() {
  const { id } = useParams();
  const [questionNumber, setQuestionNumber] = useState(0);
  const [dataRowById, setDataRowById] = useState([]);
  const [flag, setFlag] = useState(false);

  const handleChange = (event) => {
    setQuestionNumber(event.target.value);
  };

  const getQuestion = async () => {
    const { data, error } = await supabase
      .from("QuizzApp-Quizz")
      .select()
      .eq("id", id);

    setDataRowById(data[0]);
    setFlag(true);

    console.log(dataRowById.questions[questionNumber - 1]);
  };

  return (
    <div className="px-5">
      <label htmlFor="questionNumber">Question number</label>
      <input
        className="focus:outline-none"
        onChange={handleChange}
        type="number"
        name="questionNumber"
        placeholder="0"
      ></input>
      <button onClick={getQuestion} className="bg-slate-500">
        Display
      </button>
      {flag && (
        <form>
          <textarea
            className=" w-full resize-none"
            type="text"
            placeholder="Question"
            value={dataRowById.questions[questionNumber - 1]?.question}
          ></textarea>
        </form>
      )}
    </div>
  );
}

export default EditSubject;
