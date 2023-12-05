import React, { useEffect, useState } from "react";
import Subject from "./Subject";
import supabase from "../config/supabaseConfig";
import { FaSpinner } from "react-icons/fa";

function Subjects() {
  const [quizArray, setQuizArray] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSupa = async () => {
      try {
        const { data, error } = await supabase.from("quizz").select();
        setQuizArray(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSupa();
  }, []);

  return (
    <div className="flex flex-col gap-6 px-5">
      {loading ? (
        <div className="loading-spinner flex justify-center">
          <FaSpinner size={"70px"} />
        </div>
      ) : (
        quizArray.map((subject, index) => (
          <Subject
            id={subject.id}
            title={subject.title}
            icon={subject.icon}
            key={subject.id}
            questions={subject.questions}
          />
        ))
      )}
    </div>
  );
}

export default Subjects;
