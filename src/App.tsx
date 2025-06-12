import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./components/main/Home";
import Footer from "./components/main/Footer";
import Header from "./components/main/Header";
import Register from "./components/users/Register";
import Login from "./components/users/Login";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
