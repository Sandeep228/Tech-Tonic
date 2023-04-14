import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Center, Heading, Checkbox, Select, Input, Text, Stack, HStack } from '@chakra-ui/react'

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
    flask: { proficiency: "unfamiliar", projects: 0 },
    python: { proficiency: "unfamiliar", projects: 0 },
    php: { proficiency: "unfamiliar", projects: 0 },
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
        Node: nodejs,
        Express: express,
        NestJS: nestjs,
        Django: django,
        Flask: flask,
        Python: python,
        PHP: php,
        Laravel: laravel,
        Springboot: springboot,
        Java: java,
        Ruby: ruby,
      },
    ];
    res11 = largest(arr);

    const back = {
      duration: `${location.state?.back?.duration}`,
      TeamSize: `${location.state?.back?.TeamSize}`,
      projectName: `${location.state?.back?.projectName}`,
      projectType: `${location.state?.back?.projectType}`,
      frontendProficiency: `${location.state?.back?.frontendProficiency}`,
      designingSkills: `${location.state?.back?.designingSkills}`,
      backendProficiency: res11,
    };

    navigate("/data", {
      replace: true,
      state: { back },
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
    <Box backgroundColor={"teal"}  w='100%' h='200vh'>
    <Heading color={"white"} textAlign='center' py={5}>Frontend Proficiency</Heading>
    <Center>
    <div style={{backgroundColor:"white" , borderRadius:"12px", padding:"20px", width:"700px"}}>
      <div>
        <label>
          <Text fontSize='xl'> NodeJS: </Text>
          <HStack>
          <Select
            name="nodejs"
            value={technologies["nodejs"].proficiency}
            onChange={handleProficiencyChange}
          >
            <option value="unfamiliar">Unfamiliar</option>
            <option value="basic">Basic</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </Select>
          <Input
            type="number"
            min="0"
            name="nodejs"
            value={technologies["nodejs"].projects}
            onChange={handleProjectsChange}
        
          />
         </HStack>
        </label>
      </div>
      <div>
        <label>
        <Text fontSize='xl'> Express: </Text>
          <HStack>
          <Select
            name="express"
            value={technologies["express"].proficiency}
            onChange={handleProficiencyChange}
    
          >
            <option value="basic">Basic</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="unfamiliar">Unfamiliar</option>
          </Select>
          <Input
            type="number"
            min="0"
            name="express"
            value={technologies["express"].projects}
            onChange={handleProjectsChange}
          />
          </HStack>
        </label>
      </div>
      <div>
        <label>
        <Text fontSize='xl'> NestJS: </Text>
          <HStack>
          <Select
            name="nestjs"
            value={technologies["nestjs"].proficiency}
            onChange={handleProficiencyChange}
          >
            <option value="basic">Basic</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="unfamiliar">Unfamiliar</option>
          </Select>
          <Input
            type="number"
            min="0"
            name="nestjs"
            value={technologies["nestjs"].projects}
            onChange={handleProjectsChange}
          />
          </HStack>
        </label>
      </div>
      <div>
        <label>
        <Text fontSize='xl'> Django: </Text>
          <HStack>
          <Select
            name="django"
            value={technologies["django"].proficiency}
            onChange={handleProficiencyChange}
          >
            <option value="basic">Basic</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="unfamiliar">Unfamiliar</option>
          </Select>
          <Input
            type="number"
            min="0"
            name="django"
            value={technologies["django"].projects}
            onChange={handleProjectsChange}
          />
          </HStack>
        </label>
      </div>
      <div>
        <label>
        <Text fontSize='xl'> Flask: </Text>
          <HStack>
          <Select
            name="flask"
            value={technologies["flask"].proficiency}
            onChange={handleProficiencyChange}
          >
            <option value="basic">Basic</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="unfamiliar">Unfamiliar</option>
          </Select>
          <Input
            type="number"
            min="0"
            name="flask"
            value={technologies["flask"].projects}
            onChange={handleProjectsChange}
          />
          </HStack>
        </label>
      </div>
      <div>
        <label>
        <Text fontSize='xl'> Python: </Text>
          <HStack>
          <Select
            name="python"
            value={technologies["python"].proficiency}
            onChange={handleProficiencyChange}
          >
            <option value="basic">Basic</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="unfamiliar">Unfamiliar</option>
          </Select>
          <Input
            type="number"
            min="0"
            name="python"
            value={technologies["python"].projects}
            onChange={handleProjectsChange}
          />
          </HStack>
        </label>
      </div>
      <div>
        <label>
        <Text fontSize='xl'> PHP: </Text>
          <HStack>
          <Select
            name="php"
            value={technologies["php"].proficiency}
            onChange={handleProficiencyChange}
          >
            <option value="basic">Basic</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="unfamiliar">Unfamiliar</option>
          </Select>
          <Input
            type="number"
            min="0"
            name="php"
            value={technologies["php"].projects}
            onChange={handleProjectsChange}
          />
          </HStack>
        </label>
      </div>
      <div>
        <label>
        <Text fontSize='xl'> Laravel: </Text>
          <HStack>
          <Select
            name="laravel"
            value={technologies["laravel"].proficiency}
            onChange={handleProficiencyChange}
          >
            <option value="basic">Basic</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="unfamiliar">Unfamiliar</option>
          </Select>
          <Input
            type="number"
            min="0"
            name="laravel"
            value={technologies["laravel"].projects}
            onChange={handleProjectsChange}
          />
          </HStack>
        </label>
      </div>
      <div>
        <label>
        <Text fontSize='xl'> SpringBoot: </Text>
          <HStack>
          <Select
            name="springboot"
            value={technologies["springboot"].proficiency}
            onChange={handleProficiencyChange}
          >
            <option value="basic">Basic</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="unfamiliar">Unfamiliar</option>
          </Select>
          <Input
            type="number"
            min="0"
            name="springboot"
            value={technologies["springboot"].projects}
            onChange={handleProjectsChange}
          />
          </HStack>
        </label>
      </div>
      <div>
        <label>
        <Text fontSize='xl'> Java: </Text>
          <HStack>
          <Select
            name="java"
            value={technologies["java"].proficiency}
            onChange={handleProficiencyChange}
          >
            <option value="basic">Basic</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="unfamiliar">Unfamiliar</option>
          </Select>
          <Input
            type="number"
            min="0"
            name="java"
            value={technologies["java"].projects}
            onChange={handleProjectsChange}
          />
          </HStack>
        </label>
      </div>
      <div>
        <label>
        <Text fontSize='xl'> Ruby: </Text>
          <HStack>
          <Select
            name="ruby"
            value={technologies["ruby"].proficiency}
            onChange={handleProficiencyChange}
          >
            <option value="basic">Basic</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="unfamiliar">Unfamiliar</option>
          </Select>
          <Input
            type="number"
            min="0"
            name="ruby"
            value={technologies["ruby"].projects}
            onChange={handleProjectsChange}
          />
          </HStack>
        </label>
      </div>
      <Button colorScheme='teal' onClick={() => calculateScore()}>Next</Button>
    </div>
    </Center>
    </Box>
  );
}

export default Backend;
