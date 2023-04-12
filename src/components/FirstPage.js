import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppData } from "../constants/Data";
import { questions } from "../constants/question";

function CollegeInput() {
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");

  const [inputValue, setInputValue] = useState("");
  const [isWeb, setIsWeb] = useState(false);
  const [isApp, setIsApp] = useState(false);
  const [answers, setAnswers] = useState({});
  const [result, setresult] = useState(0);

  const navigate = useNavigate();

  const filteredIdea = AppData.filter((college) =>
    college.toLowerCase().startsWith(inputValue.toLowerCase())
  );

  const handleCheckboxChange = (e) => {
    const { id, value, checked } = e.target;
    setAnswers({ ...answers, [id]: checked ? value : undefined });
  };

  const formatTargetValue = (data) =>{
    let value=data;
    if(value=="short(1-5)"){
      return "short"
    }
    else if(value=="Medium (5-8)"){
      return "medium"
    }else if(value=="long(more than 8 months)"){
      return "long"
    }else if(value=="Very small (1-5)"){
      return "very small"
    }else if(value=="Small (5-10)"){
       return "small"
    }else if(value=="Medium (10-50)"){
      return "medium"
    }else if(value=="Large (More than 50)"){
      return "large"
    }
  }

  function handleOption1Change(event) {
    const value= formatTargetValue(event.target.value);
    setOption1(value);
  }

  function handleOption2Change(event) {
    const value= formatTargetValue(event.target.value);
    setOption2(value);
  }

  function handleWebCheckboxChange() {
    setIsWeb(!isWeb);
    setIsApp(false);
  }

  function handleAppCheckboxChange() {
    setIsApp(!isApp);
    setIsWeb(false);
  }

  const add = () => {
    const sum = Object.values(answers).reduce((total, value) => {
      return total + Number(value); // add value to total, converting to a number
    }, 0);

    setresult(sum);
    return sum;
  };
  function handlecheck() {
    //check for desgin
    if (result >= 6) {
      return "advanced";
    } else if (result < 6 && result > 3) {
      return "intermediate";
    } else {
      return "basic";
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const res = handlecheck();
    if (projectype === "app") {
      navigate("/app", {
        replace: true,
        state: { option1, option2, inputValue, projectype, res },
      });
    } else if (projectype === "web") {
      navigate("/web", {
        replace: true,
        state: { option1, option2, inputValue, projectype, res },
      });
    } else {
      navigate("/secondpage", {
        replace: true,
        state: { option1, option2, inputValue, projectype, res },
      });
    }
  }

  let projectype = "";
  if (isApp) {
    projectype = "app";
  } else if (isWeb) {
    projectype = "web";
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Time Duration: in months
        <select value={option1} onChange={handleOption1Change}>
          <option>Select an month</option>
          <option value="short(1-5)">short(1-5)</option>
          <option value="Medium (5-8)"> Medium (5-8)</option>
          <option value="long(more than 8 months)">
            long(more than 8 months)
          </option>
        </select>
      </label>
      <br />
      <label>
        Team Size:
        <select value={option2} onChange={handleOption2Change}>
          <option>Select an team size</option>
          <option value="Very small (1-5)"> Very small (1-5)</option>
          <option value="Small (5-10)"> Small (5-10)</option>
          <option value="Medium (10-50)"> Medium (10-50)</option>
          <option value="Large (More than 50)"> Large (More than 50)</option>
        </select>
      </label>
      <br />
      <div>
        <label>
          App Idea:
          <input
            type="text"
            list="colleges"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <datalist id="colleges">
            {filteredIdea.map((college) => (
              <option value={college} key={college} />
            ))}
          </datalist>
        </label>
      </div>

      <p>Designing skills</p>
      <div>
        {questions.map((q) => (
          <div key={q.id}>
            <p>{q.question}</p>
            {q.options.map((option) => (
              <div key={option.value}>
                <label>
                  <input
                    type="checkbox"
                    id={q.id}
                    value={option.value}
                    checked={answers[q.id] === option.value}
                    onChange={handleCheckboxChange}
                  />
                  {option.text}
                </label>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div>
        <label>Project Type:</label>
        <label>
          <input
            type="checkbox"
            checked={isWeb}
            value="Web"
            onChange={handleWebCheckboxChange}
          />
          Web
        </label>
        <label>
          <input
            type="checkbox"
            checked={isApp}
            value="App"
            onChange={handleAppCheckboxChange}
          />
          App
        </label>
      </div>

      <button onClick={() => add()} type="submit">
        Next
      </button>
    </form>
  );
}
export default CollegeInput;
