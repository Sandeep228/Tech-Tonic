import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Backend() {
  const location = useLocation();
  const navigate = useNavigate();
  let res11;

  console.log(location);

  const [technologies, setTechnologies] = useState({
    nodejs: { proficiency: "unfamiliar", projects: 0 },
    express: { proficiency: "unfamiliar", projects: 0 },
    nestjs: { proficiency: "unfamiliar", projects: 0 },
    django: { proficiency: "unfamiliar", projects: 0 },
    flask: { roficiency: "unfamiliar", projects: 0 },
    python: { proficiency: "unfamiliar", projects: 0 },
    php: { ficiency: "unfamiliar", projects: 0 },
    laravel: { proficiency: "unfamiliar", projects: 0 },
    springboot: { proficiency: "unfamiliar", projects: 0 },
    java: { proficiency: "unfamiliar", projects: 0 },
    ruby: { proficiency: "unfamiliar", projects: 0 },
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
    let nodejs = 0;
    let express = 0;
    let nestjs = 0;
    let django = 0;
    let flask = 0;
    let python = 0;
    let php = 0;
    let laravel = 0;
    let springboot = 0;
    let java = 0;
    let ruby = 0;

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
      if (tech === "nodejs") {
        nodejs += total;
      } else if (tech === "express") {
        express += total;
      } else if (tech === "nestjs") {
        nestjs += total;
      } else if (tech === "django") {
        django += total;
      } else if (tech === "flask") {
        flask += total;
      } else if (tech === "python") {
        python += total;
      } else if (tech === "php") {
        php += total;
      } else if (tech === "laravel") {
        laravel += total;
      } else if (tech === "springboot") {
        springboot += total;
      } else if (tech === "java") {
        java += total;
      } else if (tech === "ruby") {
        ruby += total;
      }
    });

    const arr = [
      {
        nodejs: nodejs,
        express: express,
        nestjs: nestjs,
        django: django,
        flask: flask,
        python: python,
        php: php,
        laravel: laravel,
        springboot: springboot,
        java: java,
        ruby: ruby,
      },
    ];
    res11 = largest(arr);

    const back2 = {
      option1: `${location.state?.option1}`,
      option2: `${location.state?.option2}`,
      inputValue: `${location.state?.inputValue}`,
      projectype: `${location.state?.projectype}`,
      res: `${location.state?.res}`,
      res2: `${location.state?.res1}`,
      res3: res11,
    };

    navigate("/data", {
      replace: true,
      state: { back2 },
    });
    console.log(res11);
    return res11;
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
          NodeJS:
          <select
            name="nodejs"
            value={technologies["nodejs"].proficiency}
            onChange={handleProficiencyChange}
          >
            <option value="basic">Unfamiliar</option>
            <option value="1">Basic</option>
            <option value="2">Intermediate</option>
            <option value="3">Advanced</option>
          </select>
          <input
            type="number"
            min="0"
            name="nodejs"
            value={technologies["nodejs"].projects}
            onChange={handleProjectsChange}
          />
        </label>
      </div>
      <div>
        <label>
          express:
          <select
            name="express"
            value={technologies["express"].proficiency}
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
            name="express"
            value={technologies["express"].projects}
            onChange={handleProjectsChange}
          />
        </label>
      </div>
      <div>
        <label>
          nestjs
          <select
            name="nestjs"
            value={technologies["nestjs"].proficiency}
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
            name="nestjs"
            value={technologies["nestjs"].projects}
            onChange={handleProjectsChange}
          />
        </label>
      </div>
      <div>
        <label>
          django
          <select
            name="django"
            value={technologies["django"].proficiency}
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
            name="django"
            value={technologies["django"].projects}
            onChange={handleProjectsChange}
          />
        </label>
      </div>
      <div>
        <label>
          flask
          <select
            name="flask"
            value={technologies["flask"].proficiency}
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
            name="flask"
            value={technologies["flask"].projects}
            onChange={handleProjectsChange}
          />
        </label>
      </div>
      <div>
        <label>
          python:
          <select
            name="python"
            value={technologies["python"].proficiency}
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
            name="python"
            value={technologies["python"].projects}
            onChange={handleProjectsChange}
          />
        </label>
      </div>
      <div>
        <label>
          php
          <select
            name="php"
            value={technologies["php"].proficiency}
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
            name="php"
            value={technologies["php"].projects}
            onChange={handleProjectsChange}
          />
        </label>
      </div>
      <div>
        <label>
          laravel
          <select
            name="laravel"
            value={technologies["laravel"].proficiency}
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
            name="laravel"
            value={technologies["laravel"].projects}
            onChange={handleProjectsChange}
          />
        </label>
      </div>
      <div>
        <label>
          springboot
          <select
            name="springboot"
            value={technologies["springboot"].proficiency}
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
            name="springboot"
            value={technologies["springboot"].projects}
            onChange={handleProjectsChange}
          />
        </label>
      </div>
      <div>
        <label>
          java
          <select
            name="java"
            value={technologies["java"].proficiency}
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
            name="java"
            value={technologies["java"].projects}
            onChange={handleProjectsChange}
          />
        </label>
      </div>
      <div>
        <label>
          ruby
          <select
            name="ruby"
            value={technologies["ruby"].proficiency}
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
            name="ruby"
            value={technologies["ruby"].projects}
            onChange={handleProjectsChange}
          />
        </label>
      </div>
      <button onClick={() => calculateScore()}> add </button>
    </div>
  );
}

export default Backend;
