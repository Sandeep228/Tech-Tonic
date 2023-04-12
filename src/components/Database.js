import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CheckboxForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let res1;

  const [technologies, setTechnologies] = useState({
    MongoDB: { proficiency: "unfamiliar", projects: 0 },
    Sql: { proficiency: "unfamiliar", projects: 0 },
    Postgres: { proficiency: "unfamiliar", projects: 0 },
    GraphQL: { proficiency: "unfamiliar", projects: 0 },
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
    let MongoDB = 0;
    let SQL = 0;
    let Postgres = 0;
    let GraphQL = 0;

    // Iterate over each technology
    Object.keys(technologies).forEach((tech) => {
      const proficiency = technologies[tech].proficiency;
      const projects = technologies[tech].projects;

      // Calculate score based on profici
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
      if (tech === "MongoDB") {
        MongoDB += total;
      } else if (tech === "SQL") {
        SQL += total;
      } else if (tech === "Postgres") {
        Postgres += total;
      } else if (tech === "GraphQL") {
        GraphQL += total;
      }
    });
    const arr = [
      {
        MongoDB: MongoDB,
        SQL: SQL,
        Postgres: Postgres,
        GraphQL: GraphQL,
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

    navigate("/result", {
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
          MongoDB
          <select
            name="MongoDB"
            value={technologies["MongoDB"].proficiency}
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
            name="MongoDB"
            value={technologies["MongoDB"].projects}
            onChange={handleProjectsChange}
          />
        </label>
      </div>
      <div>
        <label>
          SQL
          <select
            name="Sql"
            value={technologies["Sql"].proficiency}
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
            name="Sql"
            value={technologies["Sql"].projects}
            onChange={handleProjectsChange}
          />
        </label>
      </div>
      <div>
        <label>
          Postgres
          <select
            name="Postgres"
            value={technologies["Postgres"].proficiency}
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
            name="Postgres"
            value={technologies["Postgres"].projects}
            onChange={handleProjectsChange}
          />
        </label>
      </div>
      <div>
        <label>
          GraphQL
          <select
            name="GraphQL"
            value={technologies["GraphQL"].proficiency}
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
            name="GraphQL"
            value={technologies["GraphQL"].projects}
            onChange={handleProjectsChange}
          />
        </label>
      </div>

      <button onClick={() => calculateScore()}> add </button>
    </div>
  );
};

export default CheckboxForm;
