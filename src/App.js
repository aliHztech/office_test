import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Task from "./components/Task";
import "bootstrap/dist/css/bootstrap.min.css";
import Edit from "./components/Edit";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/task/:id" element={<Task />}></Route>
          <Route path="/edit/:id/:key" element={<Edit />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
