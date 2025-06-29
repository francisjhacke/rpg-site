import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import QuestionForm from "./components/QuestionForm";
import Avatar from "./components/Avatar";
import StatsDisplay from "./components/StatsDisplay";
import DailyQuests from "./components/DailyQuests";
import SiteHeader from "./components/SiteHeader";
import useStore from "./hooks/useStore";
import "./App.css";

function App() {
  const stats = useStore((state) => state.stats);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            stats ? (
              <Navigate to="/summary" replace />
            ) : (
              <div className="flex min-h-screen bg-white">
                <div className="flex flex-col justify-center items-center w-full max-w-xl p-8 mx-auto min-h-screen">
                  <div className="w-full flex flex-col items-center justify-center text-center min-h-[60vh]">
                    <SiteHeader subtitle="Answer a few questions to generate your RPG stats!" />
                    <QuestionForm />
                  </div>
                </div>
              </div>
            )
          }
        />
        <Route
          path="/summary"
          element={
            stats ? (
              <div className="flex min-h-screen bg-white">
                <div className="flex flex-col justify-center items-center w-full max-w-xl p-8 mx-auto min-h-screen">
                  <div className="w-full flex flex-col items-center justify-center text-center min-h-[60vh]">
                    <SiteHeader subtitle="Your RPG summary and next steps" />
                    <div className="flex flex-col gap-6 items-center w-full">
                      <Avatar stats={stats} />
                      <StatsDisplay stats={stats} />
                      <DailyQuests />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
