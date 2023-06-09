import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Center, Heading, Checkbox, Select, Input, Text } from '@chakra-ui/react'


const CheckboxForm = () => {
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();
  let res=[];
  let needParsing=true;
  let output=""

  const [technologies, setTechnologies] = useState({
    MongoDB: { proficiency: "unfamiliar", projects: 0 },
    MySQL: { proficiency: "unfamiliar", projects: 0 },
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
    let MySQL = 0;
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
      } else if (tech === "MySQL") {
        MySQL += total;
      } else if (tech === "Postgres") {
        Postgres += total;
      } else if (tech === "GraphQL") {
        GraphQL += total;
      }
    });
    let arr = [
      {
        MongoDB: MongoDB,
        MySQL: MySQL,
        Postgres: Postgres,
        GraphQL: GraphQL,
      },
    ];
    
    if (hasAllzeros(arr)) {
      needParsing = false;
      res = [{firstKey:"N/A", secondKey:"N/A"}];
    }

    if (needParsing == true) {
      let obj = sortArray(arr);
      if (hasThreeZeros(obj)) {
        const firstPair = Object.keys(obj)[0];
        res = [{firstKey:firstPair, secondKey:"N/A"}];
        needParsing = false;
      }
    }

    if (needParsing == true) {
      if (hasMoreSameParameters(arr)) {
        const TeamSize = location.state.back.TeamSize;
        arr = manipulateArray(arr, TeamSize);
        res = largest(arr);
        needParsing=false;
      }
    }
   
    if(needParsing==true){
      res=largest(arr);
    }


    const back = {
      duration: `${location.state?.back?.duration}`,
      TeamSize: `${location.state?.back?.TeamSize}`,
      projectName: `${location.state?.back?.projectName}`,
      projectType: `${location.state?.back?.projectType}`,
      frontendProficiency: `${location.state?.back?.frontendProficiency}`,
      backendProficiency: `${location.state?.back?.backendProficiency}`,
      designingSkills:`${location.state?.back?.designingSkills}`,
      DBProficiency: `${res[0].firstKey} ${res[0].secondKey}`
    };

    navigate("/result", {
      replace: true,
      state: { back },
    });
    console.log("db array",res);
    return res;
  };

  const hasAllzeros = (arr) => {
    const MongoDBScore = arr[0].MongoDB;
    const SQLScore = arr[0].MySQL;
    const PostgresScore = arr[0].Postgres;
    const GraphQLScore = arr[0].GraphQL;
    if (
      MongoDBScore == 0 &&
      SQLScore == 0 &&
      PostgresScore == 0 &&
      GraphQLScore == 0
    ) {
      return true;
    }else{
      return false;
    }
  };

  const hasThreeZeros = (obj) => {
    if (obj[Object.keys(obj)[1]] === 0) {
      return true;
    } else {
      return false;
    }
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
    const MongoDBScore = arr[0].MongoDB;
    const SQLScore = arr[0].MySQL;
    const PostgresScore = arr[0].Postgres;
    const GraphQLScore = arr[0].GraphQL;

    if (teamsize === "very small") {
      newArr = [
        {
          MongoDB: MongoDBScore + 2,
          MySQL: SQLScore + 1,
          Postgres: PostgresScore,
          GraphQL: GraphQLScore,
        },
      ];
    } else if (teamsize === "small") {
      newArr = [
        {
          MongoDB: MongoDBScore + 2,
          MySQL: SQLScore + 3,
          Postgres: PostgresScore + 1,
          GraphQL: GraphQLScore,
        },
      ];
    } else if (teamsize === "medium") {
      newArr = [
        {
          MySQL: SQLScore + 2,
          MongoDB: MongoDBScore + 1,
          Postgres: PostgresScore + 1,
          GraphQL: GraphQLScore,
        },
      ];
    } else if (teamsize === "large") {
      newArr = [
        {
          MySQL: SQLScore + 3,
          GraphQL: GraphQLScore + 2,
          Postgres: PostgresScore + 1,
          MongoDB: MongoDBScore,
        },
      ];
    }
    return newArr;
  };

  //logic error
  const largest = (arr) => {
    if (Object.values(arr[0]).every((val) => val === 0)) {
      return [{firstKey:"N/A", secondKey:"N/A"}];
    } else {
      // eslint-disable-next-line
      const [firstKey, firstValue] = Object.entries(arr[0]).sort(
        (a, b) => b[1] - a[1]
      )[0];
      // eslint-disable-next-line
      const [secondKey, secondValue] = Object.entries(arr[0]).sort(
        (a, b) => b[1] - a[1]
      )[1];

      return [{ firstKey:firstKey, secondKey:secondKey }];
    }
  };

  return (
    <Box backgroundColor={"teal"}  w='100%' h='100vh'>
    <Heading color={"white"} textAlign='center' py={5}>Database Proficiency</Heading>
    <Center>
    <div style={{backgroundColor:"white" , borderRadius:"12px", padding:"20px", width:"700px"}}>
      <div>
        <label>
          MongoDB
          <Select
            name="MongoDB"
            value={technologies["MongoDB"].proficiency}
            onChange={handleProficiencyChange}
          >
            <option value="basic">Basic</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="unfamiliar">Unfamiliar</option>
          </Select>
          <div style={{height:'10px'}}></div>
          <span>
          <label for="MongoDB" style={{fontSize:"15px"}}>Enter number of projects done in MongoDB:</label>
           &nbsp; &nbsp; &nbsp; 
          <Input
            type="number"
            min="0"
            name="MongoDB"
            value={technologies["MongoDB"].projects}
            onChange={handleProjectsChange}
            variant='filled'
            w='50'
          />
          </span>
        </label>
      </div>
      <div>
        <label>
          MySQL
          <Select
            name="MySQL"
            value={technologies["MySQL"].proficiency}
            onChange={handleProficiencyChange}
          >
            <option value="basic">Basic</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="unfamiliar">Unfamiliar</option>
          </Select>
          <div style={{height:'10px'}}></div>
          <span>
          <label for="MySQL" style={{fontSize:"15px"}}>Enter number of projects done in MySQL:</label>
           &nbsp; &nbsp; &nbsp; 
          <Input
            type="number"
            min="0"
            name="MySQL"
            value={technologies["MySQL"].projects}
            onChange={handleProjectsChange}
            variant='filled'
            w='50'
          />
          </span>
        </label>
      </div>
      <div>
        <label>
          Postgres
          <Select
            name="Postgres"
            value={technologies["Postgres"].proficiency}
            onChange={handleProficiencyChange}
          >
            <option value="basic">Basic</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="unfamiliar">Unfamiliar</option>
          </Select>
          <div style={{height:'10px'}}></div>
          <span>
          <label for="Postgres" style={{fontSize:"15px"}}>Enter number of projects done in Postgres:</label>
           &nbsp; &nbsp; &nbsp; 
          <Input
            type="number"
            min="0"
            name="Postgres"
            value={technologies["Postgres"].projects}
            onChange={handleProjectsChange}
            variant='filled'
            w='50'
          />
          </span>
        </label>
      </div>
      <div>
        <label>
          GraphQL
          <Select
            name="GraphQL"
            value={technologies["GraphQL"].proficiency}
            onChange={handleProficiencyChange}
          >
            <option value="basic">Basic</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="unfamiliar">Unfamiliar</option>
          </Select>
          <div style={{height:'10px'}}></div>
          <span>
          <label for="GraphQL" style={{fontSize:"15px"}}>Enter number of projects done in GraphQL:</label>
           &nbsp; &nbsp; &nbsp; 
          <Input
            type="number"
            min="0"
            name="GraphQL"
            value={technologies["GraphQL"].projects}
            onChange={handleProjectsChange}
            variant='filled'
            w='50'
          />
          </span>
        </label>
      </div>

      <Button colorScheme='teal' onClick={() => calculateScore()}>Add</Button>
    </div>
    </Center>
    </Box>
  );
};

export default CheckboxForm;
