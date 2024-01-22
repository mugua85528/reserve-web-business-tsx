import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/style.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Setting from "./components/Setting";
import LoadData from "./components/LoadData";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/load" element={<LoadData />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
