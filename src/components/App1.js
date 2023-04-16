import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Center,
  Heading,
  Checkbox,
  Select,
  Input,
  Text,
} from "@chakra-ui/react";

const CheckboxForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let res = [];
  let needParsing = true;

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
    let swiftScore = 0;
    let xmlScore = 0;

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
        swiftScore += total;
      } else if (tech === "xml") {
        xmlScore += total;
      }
    });
    const arr = [
      {
        ReactNative: reactnativeScore,
        Flutter: flutterScore,
        Swift: swiftScore,
        XML: xmlScore,
      },
    ];

    if (hasAllzeros(arr)) {
      needParsing = false;
      res = [{ firstKey: "N/A", secondKey: "N/A" }];
    }

    if (needParsing == true) {
      let obj = sortArray(arr);
      if (hasThreeZeros(obj)) {
        const firstPair = Object.keys(obj)[0];
        res = [{ firstKey: firstPair, secondKey: "N/A" }];
        needParsing = false;
      }
    }

    if (needParsing == true) {
      if (hasMoreSameParameters(arr)) {
        const TeamSize = location.state.option2;
        arr = manipulateArray(arr, TeamSize);
        res = largest(arr);
        needParsing = false;
      }
    }

    if (needParsing == true) {
      res = largest(arr);
    }

    const back = {
      duration: `${location.state?.option1}`,
      TeamSize: `${location.state?.option2}`,
      projectName: `${location.state?.inputValue}`,
      projectType: `${location.state?.projectype}`,
      designingSkills: `${location.state?.res}`,
      frontendProficiency: `${res[0].firstKey} ${res[0].secondKey}`,
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
    let reactnativeScore = arr[0].ReactNative;
    let flutterScore = arr[0].Flutter;
    let swiftScore = arr[0].Swift;
    let xmlScore = arr[0].XML;

    if (
      reactnativeScore == 0 &&
      flutterScore == 0 &&
      swiftScore == 0 &&
      xmlScore == 0
    ) {
      return true;
    } else {
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
    let reactnativeScore = arr[0].ReactNative;
    let flutterScore = arr[0].Flutter;
    let swiftScore = arr[0].Swift;
    let xmlScore = arr[0].XML;

    if (teamsize === "very small") {
      newArr = [
        {
          ReactNative: reactnativeScore + 2,
          Flutter: flutterScore + 2,
          Swift: swiftScore + 1,
          XML: xmlScore + 1,
        },
      ];
    } else if (teamsize === "small") {
      newArr = [
        {
          ReactNative: reactnativeScore + 2,
          Flutter: flutterScore + 2,
          Swift: swiftScore + 1,
          XML: xmlScore + 1,
        },
      ];
    } else if (teamsize === "medium") {
      newArr = [
        {
          ReactNative: reactnativeScore + 2,
          Flutter: flutterScore + 2,
          Swift: swiftScore,
          XML: xmlScore,
        },
      ];
    } else if (teamsize === "large") {
      newArr = [
        {
          ReactNative: reactnativeScore + 2,
          Flutter: flutterScore + 2,
          Swift: swiftScore,
          XML: xmlScore,
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
          return true;
        }
      }
    }
  };

  //logic error
  const largest = (arr) => {
    console.log("arr", arr);
    if (Object.values(arr[0]).every((val) => val === 0)) {
      return [{ firstKey: "N/A", secondKey: "N/A" }];
    } else {
      // eslint-disable-next-line
      const [firstKey, firstValue] = Object.entries(arr[0]).sort(
        (a, b) => b[1] - a[1]
      )[0];
      // eslint-disable-next-line
      const [secondKey, secondValue] = Object.entries(arr[0]).sort(
        (a, b) => b[1] - a[1]
      )[1];

      return [{ firstKey: firstKey, secondKey: secondKey }];
    }
  };

  return (
    <Box backgroundColor={"teal"} w="100%" h="100vh">
      <Heading color={"white"} textAlign="center" py={5}>
        Frontend Proficiency
      </Heading>
      <Center>
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "20px",
            width: "700px",
          }}
        >
          <div>
            <label>
              React Native:
              <Select
                name="reactnative"
                value={technologies["reactnative"].proficiency}
                onChange={handleProficiencyChange}
              >
                <option value="basic">Basic</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="unfamiliar">Unfamiliar</option>
              </Select>
              <div style={{ height: "10px" }}></div>
              <span>
                <label for="reactnative" style={{ fontSize: "15px" }}>
                  Enter number of projects done in React Native:
                </label>
                &nbsp; &nbsp; &nbsp;
                <Input
                  type="number"
                  min="0"
                  name="reactnative"
                  value={technologies["reactnative"].projects}
                  onChange={handleProjectsChange}
                  variant="filled"
                  w="50"
                />
              </span>
            </label>
          </div>
          <div>
            <label>
              Flutter
              <Select
                name="flutter"
                value={technologies["flutter"].proficiency}
                onChange={handleProficiencyChange}
              >
                <option value="basic">Basic</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="unfamiliar">Unfamiliar</option>
              </Select>
              <div style={{ height: "10px" }}></div>
              <span>
                <label for="flutter" style={{ fontSize: "15px" }}>
                  Enter number of projects done in Flutter:
                </label>
                &nbsp; &nbsp; &nbsp;
                <Input
                  type="number"
                  min="0"
                  name="flutter"
                  value={technologies["flutter"].projects}
                  onChange={handleProjectsChange}
                  variant="filled"
                  w="50"
                />
              </span>
            </label>
          </div>
          <div>
            <label>
              Swift
              <Select
                name="swift"
                value={technologies["swift"].proficiency}
                onChange={handleProficiencyChange}
              >
                <option value="basic">Basic</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="unfamiliar">Unfamiliar</option>
              </Select>
              <div style={{ height: "10px" }}></div>
              <span>
                <label for="swift" style={{ fontSize: "15px" }}>
                  Enter number of projects done in Swift:
                </label>
                &nbsp; &nbsp; &nbsp;
                <Input
                  type="number"
                  min="0"
                  name="swift"
                  value={technologies["swift"].projects}
                  onChange={handleProjectsChange}
                  variant="filled"
                  w="50"
                />
              </span>
            </label>
          </div>
          <div>
            <label>
              XML
              <Select
                name="xml"
                value={technologies["xml"].proficiency}
                onChange={handleProficiencyChange}
              >
                <option value="basic">Basic</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="unfamiliar">Unfamiliar</option>
              </Select>
              <div style={{ height: "10px" }}></div>
              <span>
                <label for="xml" style={{ fontSize: "15px" }}>
                  Enter number of projects done in XML:
                </label>
                &nbsp; &nbsp; &nbsp;
                <Input
                  type="number"
                  min="0"
                  name="xml"
                  value={technologies["xml"].projects}
                  onChange={handleProjectsChange}
                  variant="filled"
                  w="50"
                />
              </span>
            </label>
          </div>

          <Button colorScheme="teal" onClick={() => calculateScore()}>
            Next
          </Button>
        </div>
      </Center>
    </Box>
  );
};

export default CheckboxForm;
