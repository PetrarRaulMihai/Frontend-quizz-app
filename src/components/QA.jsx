import React, { useEffect, useState } from "react";
import useStore from "../stores/myZusand";
import { useNavigate } from "react-router-dom";

function QA() {
  const navigate = useNavigate();
  const { subjectObject } = useStore();
  const [questionIndex, setQuestionIndex] = useState(0);

  const correctAnwers = [];
  const wrongAnwers = [];

  //array which stores ALL users answers
  const [usersChoices, setUsersChoices] = useState([]); //10 items
  //this state is storing users choice temporary
  const [userAnswer, setUserAnswer] = useState();

  const numberOfQuestions = subjectObject.questions.length;

  //A paragraph must be inserted if no answer is selected

  const handleSubmitAnswer = () => {
    if (usersChoices.length === numberOfQuestions - 1) {
      console.log("you reached");
      navigate("/endpage");
    }

    if (userAnswer) {
      setQuestionIndex((prev) => prev + 1);
      setUsersChoices([...usersChoices, userAnswer]);
    } else {
      console.log("pleaase choose a value");
    }

    setUserAnswer("");
  };

  const usersAnswer = (answer) => {
    setUserAnswer(answer);
  };

  useEffect(() => {
    console.log(subjectObject);
    console.log(numberOfQuestions);
    console.log(userAnswer);
    console.log(usersChoices);
  }, [userAnswer, usersChoices]);

  // for (let i = 0; i < arr1.length; i++) {
  //   if (arr1[i] === arr2[j]) {
  //   }
  // }

  return (
    <article className="px-5 flex flex-col gap-10">
      {/* Questions section */}
      <section className="flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <p className="italic text-[#91a2b7]">
            Question {questionIndex + 1} of 10
          </p>
          <p className="break-words text-white ">
            {subjectObject.questions[questionIndex].question}
          </p>
        </div>
        <input
          className="flex w-full"
          type="range"
          min="0"
          max="9"
          value={questionIndex}
        ></input>
        {/* OTHER VERSION OF RANGE SLIDER */}
        {/* <div className="flex-start flex h-2.5 w-full overflow-hidden rounded-full bg-blue-gray-50 font-sans text-xs font-medium">
          <div
            className={`flex h-full w-[${questionIndex}0%] items-center justify-center overflow-hidden break-all rounded-full bg-purple-600 text-white`}
          ></div>
        </div> */}
      </section>
      {/* Options section */}
      <section className="flex flex-col w-full items-center gap-3 py-2 rounded-lg">
        {subjectObject.questions[questionIndex].options.map((option, index) => {
          return (
            <div
              className={`${
                userAnswer === option ? "bg-[#a629f5]" : "bg-[#485972]"
              } flex gap-4 px-3  py-2 items-center rounded-xl w-full`}
              onClick={() => usersAnswer(option)}
            >
              <div className=" bg-[#f3f7fa] rounded-md">
                <p className="text-[#6f7784] font-bold text-lg px-3 py-1">{`${
                  index === 0
                    ? "A"
                    : index === 1
                    ? "B"
                    : index === 2
                    ? "C"
                    : index === 3
                    ? "D"
                    : ""
                }`}</p>
              </div>
              <p className="text-white font-semibold text-md">{option}</p>
            </div>
          );
        })}
      </section>
      {/* Submit button */}
      <button
        className="bg-[#a629f5] text-white font-semibold py-3 rounded-xl shadow-[0_0_1px_#fff,inset_0_0_3px_#fff,0_0_1px_#a629f5,0_0_1px_#a629f5,0_0_5px_#a629f5]"
        onClick={handleSubmitAnswer}
      >
        Submit answer
      </button>
    </article>
  );
}

export default QA;
