import { Routes, Route } from "react-router-dom";
import FirstPage from "./components/FirstPage";
import App1 from "./components/App1";
import Web from "./components/Web";
import Backend from "./components/Backend";
import Database from "./components/Database";
import Result from "./components/Result";
import { ChakraProvider } from '@chakra-ui/react'


function App() {
  return (
    <>
      <ChakraProvider>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="app" element={<App1 />} />
        <Route path="web" element={<Web />} />
        <Route path="backend" element={<Backend />} />
        <Route path="data" element={<Database />} />
        <Route path="result" element={<Result />} />
        <Route />
      </Routes>
      </ChakraProvider>
    </>
  );
}

export default App;
