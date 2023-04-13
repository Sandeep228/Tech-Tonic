import { Routes, Route } from "react-router-dom";
import FirstPage from "./components/FirstPage";
import SecondPage from "./components/SecondPage";
import App1 from "./components/App1";
import Web from "./components/Web";
import Backend from "./components/Backend";
import Database from "./components/Database";
import Result from "./components/Result"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="secondpage" element={<SecondPage />} />
        <Route path="app" element={<App1 />} />
        <Route path="web" element={<Web />} />
        <Route path="backend" element={<Backend />} />
        <Route path="data" element={<Database />} />
        <Route path="result" element={<Result />} />
        <Route />
      </Routes>
    </>
  );
}

export default App;
