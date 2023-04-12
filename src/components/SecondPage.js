import React from "react";

import { useLocation } from "react-router-dom";

function SecondPage() {
  const location = useLocation();
  console.log(location);

  return (
    <div>
      <h1>Page 2</h1>
      <p>
        A {location.state.inputValue} in {location.state.projectype} with{" "}
        {location.state.option2} team in {location.state.option1} duration with{" "}
        {location.state.res}
        designing, react, N/A, node,spring and MySQL,Mongo skills”
      </p>
    </div>
  );
}
export default SecondPage;
