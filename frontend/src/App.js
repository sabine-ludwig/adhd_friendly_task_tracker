// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import TaskPage from './pages/TaskPage/TaskPage';
import RewardPage from './pages/RewardPage/RewardPage';
import TrendPage from './pages/TrendPage/TrendPage'

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import TaskForm from './components/TaskForm/TaskForm';
import TaskList from "./components/TaskList/TaskList";
import RewardList from "./components/RewardList/RewardList";
import RewardForm from './components/RewardForm/RewardForm';
import TrendsGraph from './components/TrendsGraph/TrendsGraph'

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/rewards" element={<RewardPage />} />
        {/* <Route path="/trends" element={<TrendPage />} /> */}
        <Route path="/add-task" element={<TaskForm />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
