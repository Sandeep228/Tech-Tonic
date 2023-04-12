import { Routes, Route } from "react-router-dom";
import FirstPage from "./components/FirstPage";
import SecondPage from "./components/SecondPage";
import App1 from "./components/App1";
import Web from "./components/Web";
import Backend from "./components/Backend";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="secondpage" element={<SecondPage />} />
        <Route path="app" element={<App1 />} />
        <Route path="web" element={<Web />} />
        <Route path="backend" element={<Backend />} />
        <Route />
      </Routes>
    </>
  );
}

export default App;
