import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CheckboxForm = () => {
  let needParsing = true;
  const location = useLocation();
  const navigate = useNavigate();

  const [technologies, setTechnologies] = useState({
    nextjs: { proficiency: "unfamiliar", projects: 0 },
    reactjs: { proficiency: "unfamiliar", projects: 0 },
    angular: { proficiency: "unfamiliar", projects: 0 },
    vue: { proficiency: "unfamiliar", projects: 0 },
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
    let reactScore = 0;
    let nextScore = 0;
    let vue = 0;
    let angular = 0;

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
      if (tech === "reactjs") {
        reactScore = reactScore + total;
      } else if (tech === "nextjs") {
        nextScore += total;
      } else if (tech === "angular") {
        angular += total;
      } else if (tech === "vue") {
        vue += total;
      }
    });
    let arr = [
      { ReactJS: reactScore, NextJS: nextScore, Vue: vue, Angular: angular },
    ];

    let res = [];

    if (hasAllzeros(arr)) {
      needParsing = false;
      res = ["N/A", "N/A"];
    }

    if (needParsing == true) {
      let obj = sortArray(arr);
      if (hasThreeZeros(obj)) {
        const firstPair = Object.keys(obj)[0];
        res = [firstPair, "N/A"];
        needParsing = false;
      }
    }

    if (needParsing == true) {
      if (hasMoreSameParameters(arr)) {
        const TeamSize = location.state.option2;
        arr = manipulateArray(arr, TeamSize);
        res = largest(arr);
        needParsing=false;
      }
    }
   
    if(needParsing==true){
      res=largest(arr);
    }

    const back = {
      duration: `${location.state?.option1}`,
      TeamSize: `${location.state?.option2}`,
      projectName: `${location.state?.inputValue}`,
      projectType: `${location.state?.projectype}`,
      designingSkills: `${location.state?.res}`,
      frontendProficiency: res,
    };
    
    navigate("/backend", {
      replace: true,
      state: { back },
    });
    return res;
  };

  const hasThreeZeros = (obj) => {
    if (obj[Object.keys(obj)[1]] === 0) {
      return true;
    } else {
      return false;
    }
  };

  const hasAllzeros = (arr) => {
    const reactScore = arr[0].ReactJS;
    const nextScore = arr[0].NextJS;
    const vueScore = arr[0].Vue;
    const angularScore = arr[0].Angular;
    if (
      reactScore == 0 &&
      nextScore == 0 &&
      vueScore == 0 &&
      angularScore == 0
    ) {
      return true;
    }else{
      return false;
    }
  };

  const sortArray = (arr) => {
    const obj = arr[0];
    const pairs = Object.entries(obj);
    pairs.sort((a, b) => b[1] - a[1]);
    const sortedObj = Object.fromEntries(pairs);
    return sortedObj;
  };

  const manipulateArray = (arr, teamsize) => {
    //reorder them as per project size
    let newArr = [];
    const reactScore = arr[0].react;
    const nextScore = arr[0].next;
    const vueScore = arr[0].vue;
    const angularScore = arr[0].angular;

    if (teamsize === "very small") {
      newArr = [
        {
          vue: vueScore + 2,
          react: reactScore + 1,
          next: nextScore,
          angular: angularScore,
        },
      ];
    } else if (teamsize === "small") {
      newArr = [
        {
          react: reactScore + 2,
          vue: vueScore + 3,
          next: nextScore + 1,
          angular: angularScore,
        },
      ];
    } else if (teamsize === "medium") {
      newArr = [
        {
          react: reactScore + 3,
          next: nextScore + 2,
          vue: vueScore + 1,
          angular: angularScore,
        },
      ];
    } else if (teamsize === "large") {
      newArr = [
        {
          angular: angularScore + 3,
          react: reactScore + 2,
          next: nextScore + 1,
          vue: vueScore,
        },
      ];
    }
    return newArr;
  };

  const hasMoreSameParameters = (arr) => {
    const kvPairs = arr[0];

    // Step 1: Sort the key-value pairs in descending order of the values
    const sortedPairs = Object.entries(kvPairs).sort((a, b) => b[1] - a[1]);

    // Step 2: Get the values of the top 2 keys
    const topValues = [sortedPairs[0][1], sortedPairs[1][1]];

    // Step 3 and 4: Check if any remaining key has the same value as the top 2, but is not one of them
    for (let i = 2; i < sortedPairs.length; i++) {
      const [key, value] = sortedPairs[i];
      if (value === topValues[0] || value === topValues[1]) {
        if (key !== sortedPairs[0][0] && key !== sortedPairs[1][0]) {
          console.log(
            `${key} has the same value as other keys and is not in top 2`
          );
          return true;
        }
      }
    }
  };

  const largest = (arr) => {
    if (Object.values(arr[0]).every((val) => val === 0)) {
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
          ReactJS:
          <select
            name="reactjs"
            value={technologies["reactjs"].proficiency}
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
            name="reactjs"
            value={technologies["reactjs"].projects}
            onChange={handleProjectsChange}
          />
        </label>
      </div>
      <div>
        <label>
          NextJS:
          <select
            name="nextjs"
            value={technologies["nextjs"].proficiency}
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
            name="nextjs"
            value={technologies["nextjs"].projects}
            onChange={handleProjectsChange}
          />
        </label>
      </div>
      <div>
        <label>
          Angular:
          <select
            name="angular"
            value={technologies["angular"].proficiency}
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
            name="angular"
            value={technologies["angular"].projects}
            onChange={handleProjectsChange}
          />
        </label>
      </div>
      <div>
        <label>
          Vue:
          <select
            name="vue"
            value={technologies["vue"].proficiency}
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
            name="vue"
            value={technologies["vue"].projects}
            onChange={handleProjectsChange}
          />
        </label>
      </div>
      <button onClick={() => calculateScore()}> add </button>
    </div>
  );
};

export default CheckboxForm;
