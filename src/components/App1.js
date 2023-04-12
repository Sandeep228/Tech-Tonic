import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CheckboxForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let res1;

  const [technologies, setTechnologies] = useState({
    reactnative: { proficiency: "unfamiliar", projects: 0 },
    flutter: { proficiency: "unfamiliar", projects: 0 },
    swift: { proficiency: "unfamiliar", projects: 0 },
    xml: { proficiency: "unfamiliar", projects: 0 },
  });

  const handleProficiencyChange = (event) => {
    const { name, value } = event.target;
    setTechnologies((prevTechnologies) => ({
      ...prevTechnologies,
      [name]: { ...prevTechnologies[name], proficiency: value },
    }));
  };

  const handleProjectsChange = (event) => {
    const { name, value } = event.target;
    setTechnologies((prevTechnologies) => ({
      ...prevTechnologies,
      [name]: { ...prevTechnologies[name], projects: parseInt(value) },
    }));
  };

  const calculateScore = () => {
    let reactnativeScore = 0;
    let flutterScore = 0;
    let swift = 0;
    let xml = 0;

    // Iterate over each technology
    Object.keys(technologies).forEach((tech) => {
      const proficiency = technologies[tech].proficiency;
      const projects = technologies[tech].projects;

      // Calculate score based on proficiency level
      let score = 0;
      switch (proficiency) {
        case "basic":
          score = 1;
          break;
        case "intermediate":
          score = 2;
          break;
        case "advanced":
          score = 3;
          break;
        default:
          score = 0;
      }
      // Multiply score by number of projects
      const total = score + projects;
      // Add total score to ReactJS or NextJS score
      if (tech === "reactnative") {
        reactnativeScore += total;
      } else if (tech === "flutter") {
        flutterScore += total;
      } else if (tech === "swift") {
        swift += total;
      } else if (tech === "xml") {
        xml += total;
      }
    });
    const arr = [
      {
        reactnative: reactnativeScore,
        flutter: flutterScore,
        swift: swift,
        xml: xml,
      },
    ];
    res1 = largest(arr);

    const back = {
      option1: `${location.state?.option1}`,
      option2: `${location.state?.option2}`,
      inputValue: `${location.state?.inputValue}`,
      projectype: `${location.state?.projectype}`,
      res: `${location.state?.res}`,
      res2: res1,
    };

    navigate("/backend", {
      replace: true,
      state: { back },
    });
    console.log(res1);
    return res1;
  };
  //logic error
  const largest = (arr) => {
    console.log(arr);
    if (Object.values(arr[0]).every((val) => val === 0)) {
      return ["N/A", "N/A"];
      console.log("NA");
    } else {
      // eslint-disable-next-line
      const [firstKey, firstValue] = Object.entries(arr[0]).sort(
        (a, b) => b[1] - a[1]
      )[0];
      // eslint-disable-next-line
      const [secondKey, secondValue] = Object.entries(arr[0]).sort(
        (a, b) => b[1] - a[1]
      )[1];

      return { firstKey, secondKey };
    }
  };

  return (
    <div>
      <div>
        <label>
          React Native:
          <select
            name="reactnative"
            value={technologies["reactnative"].proficiency}
            onChange={handleProficiencyChange}
          >
            <option value="basic">Basic</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="unfamiliar">Unfamiliar</option>
          </select>
          <input
            type="number"
            min="0"
            name="reactnative"
            value={technologies["reactnative"].projects}
            onChange={handleProjectsChange}
          />
        </label>
      </div>
      <div>
        <label>
          Flutter
          <select
            name="flutter"
            value={technologies["flutter"].proficiency}
            onChange={handleProficiencyChange}
          >
            <option value="basic">Basic</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="unfamiliar">Unfamiliar</option>
          </select>
          <input
            type="number"
            min="0"
            name="flutter"
            value={technologies["flutter"].projects}
            onChange={handleProjectsChange}
          />
        </label>
      </div>
      <div>
        <label>
          Swift
          <select
            name="swift"
            value={technologies["swift"].proficiency}
            onChange={handleProficiencyChange}
          >
            <option value="basic">Basic</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="unfamiliar">Unfamiliar</option>
          </select>
          <input
            type="number"
            min="0"
            name="swift"
            value={technologies["swift"].projects}
            onChange={handleProjectsChange}
          />
        </label>
      </div>
      <div>
        <label>
          XML
          <select
            name="xml"
            value={technologies["xml"].proficiency}
            onChange={handleProficiencyChange}
          >
            <option value="basic">Basic</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="unfamiliar">Unfamiliar</option>
          </select>
          <input
            type="number"
            min="0"
            name="xml"
            value={technologies["xml"].projects}
            onChange={handleProjectsChange}
          />
        </label>
      </div>

      <button onClick={() => calculateScore()}> add </button>
    </div>
  );
};

export default CheckboxForm;
