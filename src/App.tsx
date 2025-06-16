import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/main/Home";
import Footer from "./components/main/Footer";
import Header from "./components/main/Header";
import Register from "./components/users/Register";
import Login from "./components/users/Login";
import { AuthProvider } from "./contexts/AuthContext";
import BusanFoodList from "./components/busan/BusanFoodList";
import BusanFoodDetail from "./components/busan/BusanFoodDetail";

function App() {
  return (
    <AuthProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/busan-food/list" element={<BusanFoodList />} />
            <Route path="/busan-food/detail/:fno" element={<BusanFoodDetail />} />
          </Routes>
          <Footer />
        </Router>
    </AuthProvider>
  );
}

export default App;
