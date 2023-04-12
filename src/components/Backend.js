import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function Backend() {
  const location = useLocation();
  console.log(location);
  const [technologies, setTechnologies] = useState([
    { name: "NodeJS", proficiency: 0, projects: 0 },
    { name: "Express", proficiency: 0, projects: 0 },
    { name: "NestJS", proficiency: 0, projects: 0 },
    { name: "Django", proficiency: 0, projects: 0 },
    { name: "Flask", proficiency: 0, projects: 0 },
    { name: "Python", proficiency: 0, projects: 0 },
    { name: "PHP", proficiency: 0, projects: 0 },
    { name: "Laravel", proficiency: 0, projects: 0 },
    { name: "SpringBoot", proficiency: 0, projects: 0 },
    { name: "Java", proficiency: 0, projects: 0 },
    { name: "Ruby on Rails", proficiency: 0, projects: 0 },
    { name: "Ruby", proficiency: 0, projects: 0 },
  ]);

  const handleProficiencyChange = (event, index) => {
    const newTechnologies = [...technologies];
    newTechnologies[index].proficiency = parseInt(event.target.value);
    setTechnologies(newTechnologies);
  };

  const handleProjectsChange = (event, index) => {
    const newTechnologies = [...technologies];
    newTechnologies[index].projects = parseInt(event.target.value);
    setTechnologies(newTechnologies);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the selected options and projects
    console.log(technologies);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {technologies.map((tech, index) => (
          <div key={index}>
            <label>{tech.name}</label>
            <select onChange={(event) => handleProficiencyChange(event, index)}>
              <option value="0">Unfamiliar</option>
              <option value="1">Basic</option>
              <option value="2">Intermediate</option>
              <option value="3">Advanced</option>
            </select>
            <input
              type="number"
              placeholder="Number of projects"
              onChange={(event) => handleProjectsChange(event, index)}
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Backend;
