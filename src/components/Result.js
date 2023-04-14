import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
const { Configuration, OpenAIApi } = require("openai");

const  myFunction= async(prompt) => {
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

export default function Result() {
    const location = useLocation();
    const locObj=location.state.back;
    console.log(location);
    let finalRes="";

    const makeString = (loc) => {
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
    makeString();
    finalRes=finalRes.replaceAll(',',' ');
    console.log(finalRes);
    // const result = myFunction(finalRes)
    // console.log(result);
  return (
    <div>Result</div>
  )
}
