import React from 'react';
import { useEffect,useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Center, Heading, Checkbox, Select, Input, Text } from '@chakra-ui/react'
const { Configuration, OpenAIApi } = require("openai");


export default function Result() {
  const location = useLocation();
  let finalRes;
  let locObj=location.state.back;
  
  useEffect(() => {
    let locObj=location.state.back;
    makeString(locObj);
    async function getData() {
      const data = await openAPIDataFetch(finalRes);
      setResponseData(data);
    }
    getData();
  }, []);
    
  const [responseData, setResponseData] = useState(null);
  
    const makeString = (locObj) => {
       let duration= locObj.duration
        let TeamSize=locObj.TeamSize
        let projectName=locObj.projectName
        let projectType=locObj.projectType
        let frontendProficiency=locObj.frontendProficiency
        let designingSkills=locObj.designingSkills
        let backendProficiency=locObj.backendProficiency
        let DBProficiency1= locObj.DBProficiency

       finalRes=`A ${projectName} in ${projectType} with ${TeamSize} team in ${duration} duration with ${designingSkills} desgining ${frontendProficiency} ${backendProficiency} ${DBProficiency1} skills`
    };
     makeString(locObj);
     finalRes=finalRes.replaceAll(',',' ');
     console.log(finalRes);
     
    const  openAPIDataFetch= async(prompt) => {
      const configuration = new Configuration({
         apiKey: "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",
       });
       const openai = new OpenAIApi(configuration);
       
       const completion = await openai.createCompletion({ 
         model: "curie:ft-personal-2023-04-09-14-39-14",
         prompt:prompt,
         max_tokens:5
       });
       return completion.data.choices[0].text;
    }

  return (
    <Box backgroundColor={"teal"}  w='100%' h='100vh'>
    <Heading color={"white"} textAlign='center' py={5}>Recommended Techstack</Heading>
    <Center>
    <div style={{backgroundColor:"white" , borderRadius:"12px", padding:"20px", width:"700px"}}>
    <div>
      {responseData && <p>{JSON.stringify(responseData)}</p>}
    </div>
    <br />
    <Button colorScheme='teal'>Get more Information</Button>
    </div>
    </Center>
    </Box>
  )
}
