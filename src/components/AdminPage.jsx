import React, { useEffect, useState } from "react";
import Subject from "./Subject";
import supabase from "../config/supabaseConfig";
import { FaCirclePlus } from "react-icons/fa6";
import { FaSpinner } from "react-icons/fa";

function Subjects() {
  const [quizArray, setQuizArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subjectSelected, setSubjectSelected] = useState("");

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

  const handleChange = (event) => {
    setSubjectSelected(event.target.value);
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
      <select onChange={handleChange}>
        {quizArray.map((item) => {
          return <option value={item.title}>{item.title}</option>;
        })}
      </select>

      {/* DE PROBA de aici se continua ------------------------------------------- */}
      <div>
        <p>{subjectSelected}</p>
      </div>
    </div>
  );
}

export default Subjects;

// FURTHER TO CONTINU THIS SUBJECT SELECTED EDITING
// title input
// questions input
// input ect....
