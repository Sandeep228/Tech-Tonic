import React from "react";
import axios from "axios";

import { useEffect, useState } from "react";
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
const { Configuration, OpenAIApi } = require("openai");

export default function Result() {
  const location = useLocation();
  const [loading, setLoading] = useState();
  let finalRes;
  const [linksArray, setLinksArray] = useState([]);
  let locObj = location.state.back;

  useEffect(() => {
    let locObj = location.state.back;
    makeString(locObj);
    async function getData() {
      const data = await openAPIDataFetch(finalRes);
      let result = data.split("stack")[0] + "stack";
      setResponseData(result);
    }
    getData();
  }, []);

  const [responseData, setResponseData] = useState(null);
  const [docs, setDocs] = useState();

  const makeString = (locObj) => {
    let duration = locObj.duration;
    let TeamSize = locObj.TeamSize;
    let projectName = locObj.projectName;
    let projectType = locObj.projectType;
    let frontendProficiency = locObj.frontendProficiency;
    let designingSkills = locObj.designingSkills;
    let backendProficiency = locObj.backendProficiency;
    let DBProficiency1 = locObj.DBProficiency;

    finalRes = `A ${projectName} in ${projectType} with ${TeamSize} team in ${duration} duration with ${designingSkills} desgining ${frontendProficiency} ${backendProficiency} ${DBProficiency1} skills`;
    finalRes = finalRes.replaceAll(",", " ");
  };
  makeString(locObj);
  finalRes = finalRes.replaceAll(",", " ");
  console.log(finalRes);

  const getDocumentation = async () => {
    setLoading(true);
    const myParam = `Get some resources for ${responseData}`;
    await axios
      .get(`https://chatbot-gpt.pujaagarwal5.repl.co/chatbot?prompt=${myParam}`)
      .then((data) => {
        // const data1= JSON.parse(data.data);
        setLoading(false);
        const links = data.data;
        const linkData = links.split("\n\n");
        setLinksArray(linkData);
        setDocs(data.data);
      });
  };

  const openAPIDataFetch = async (prompt) => {
    const configuration = new Configuration({
      apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createCompletion({
      model: "curie:ft-personal-2023-04-16-17-31-39",
      prompt: prompt,
      max_tokens: 6,
    });
    return completion.data.choices[0].text;
  };

  return (
    <Box backgroundColor={"teal"} w="100%" h="500vh">
      <Heading color={"white"} textAlign="center" py={5}>
        Recommended Techstack
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
          <div>{responseData && <p>{JSON.stringify(responseData)}</p>}</div>
          <br />
          <Button colorScheme="teal" onClick={() => getDocumentation()}>
            Get more Information
          </Button>
          <br />
          <div>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <div>
                <div>
                  <ul style={{ listStyleType: "none" }}>
                    {linksArray.map((link, index) => (
                      <li key={index}>
                        <p>{link}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </Center>
    </Box>
  );
}
