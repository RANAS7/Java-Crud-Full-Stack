import AppBar from "./Component/AppBar";
import Student from "./Component/Student";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div>
        <p>hsdjnk;nalmx</p>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppBar />} />
            <Route path="/student" element={<Student />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
