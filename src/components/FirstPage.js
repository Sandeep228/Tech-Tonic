import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppData } from "../constants/Data";
import { questions } from "../constants/question";
import { Box, Button, Center, Heading, Checkbox, Select, Input, Text } from '@chakra-ui/react'


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
    college.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleCheckboxChange = (e) => {
    const { id, value, checked } = e.target;
    setAnswers({ ...answers, [id]: checked ? value : undefined });
  };

  const formatTargetValue = (data) => {
    let value = data;
    if (value === "short(1-5)") {
      return "short";
    } else if (value === "Medium (5-8)") {
      return "medium";
    } else if (value === "long(more than 8 months)") {
      return "long";
    } else if (value === "Very small (1-5)") {
      return "very small";
    } else if (value === "Small (5-10)") {
      return "small";
    } else if (value === "Medium (10-50)") {
      return "medium";
    } else if (value === "Large (More than 50)") {
      return "large";
    }
  };

  function handleOption1Change(event) {
    const value = formatTargetValue(event.target.value);
    setOption1(value);
  }

  function handleOption2Change(event) {
    const value = formatTargetValue(event.target.value);
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
      return "Advanced";
    } else if (result < 6 && result > 3) {
      return "Intermediate";
    } else {
      return "Basic";
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const res = handlecheck();
    if (projectype === "Mob") {
      navigate("/app", {
        replace: true,
        state: { option1, option2, inputValue, projectype, res },
      });
    } else if (projectype === "Web") {
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
    projectype = "Mob";
  } else if (isWeb) {
    projectype = "Web";
  }

  return (
  <>
  <Box backgroundColor={"teal"}  w='100%' h='100vh'>
    <Heading color={"white"} textAlign='center' pt='5'>Welcome to Tech-Tonic</Heading>
    <Center p='23'>
    <form onSubmit={handleSubmit} style={{backgroundColor:"white" , borderRadius:"12px", padding:"20px"}} >
      <label>
        Time Duration (in months):
        <Select onChange={handleOption1Change} placeholder='Expected project duration (in months)' required>
          <option value="short(1-5)">short(1-5)</option>
          <option value="Medium (5-8)"> Medium (5-8)</option>
          <option value="long(more than 8 months)">
            long(more than 8 months)
          </option>
        </Select>
      </label>
    <br />
      <label>
        Team Size:
        <Select onChange={handleOption2Change} placeholder='Select your team size' required>
          <option value="Very small (1-5)"> Very small (1-5)</option>
          <option value="Small (5-10)"> Small (5-10)</option>
          <option value="Medium (10-50)"> Medium (10-50)</option>
          <option value="Large (More than 50)"> Large (More than 50)</option>
        </Select>
      </label>
      <br />
      <div>
        <label>
          App Idea:
          <Input
            w='xl'
            type="text"
            list="colleges"
            placeholder="Select your project idea"
            onChange={(e) => setInputValue(e.target.value)}
            required
          />
          <datalist id="colleges">
            {filteredIdea.map((college) => (
              <option value={college} key={college} />
            ))}
          </datalist>
        </label>
      </div>
   
      <Text fontSize='2xl'>Designing skills</Text>
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

      <Button colorScheme='teal' onClick={() => add()} type="submit">Next</Button>
    </form>
    </Center>
    </Box>
    </>
  );
}
export default CollegeInput;
