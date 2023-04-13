import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";

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
    console.log(finalRes);
  return (
    <div>Result</div>
  )
}
