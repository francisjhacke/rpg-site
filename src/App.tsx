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
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { IconUser, IconSword, IconSun } from "@tabler/icons-react";
import "./App.css";

function App() {
  const stats = useStore((state) => state.stats);
  const setStats = useStore((state) => state.setStats);

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
                    <QuestionForm onComplete={setStats} />
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
                <div className="flex flex-col justify-center items-center w-full max-w-4xl p-8 mx-auto min-h-screen">
                  <div className="w-full flex flex-col items-center justify-center text-center min-h-[60vh]">
                    <SiteHeader subtitle="Your RPG summary and next steps" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full px-2 md:px-0 mt-8">
                      {/* Character + Attributes Card */}
                      <Card>
                        <CardHeader>
                          <CardDescription>Your Character</CardDescription>
                          <CardTitle className="flex flex-col items-center gap-2">
                            <span className="text-4xl">
                              <IconUser />
                            </span>
                            <span>Adventurer</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center gap-4">
                          <Avatar stats={stats} />
                          <h4 className="text-lg font-semibold mb-2 flex items-center gap-2 justify-center">
                            <IconSword className="inline-block" /> Attributes
                          </h4>
                          <ul className="w-full flex flex-col gap-2 items-center">
                            {Object.entries(stats).map(([key, value]) => (
                              <li
                                key={key}
                                className="w-full flex justify-between border-b border-muted py-2 last:border-b-0"
                              >
                                <span className="capitalize font-medium">
                                  {key}
                                </span>
                                <span className="font-mono text-primary">
                                  {value}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                        <CardFooter className="flex flex-col items-center gap-2">
                          <Badge variant="outline">Level 1</Badge>
                        </CardFooter>
                      </Card>
                      {/* Daily Quests Card */}
                      <Card>
                        <CardHeader>
                          <CardDescription>Daily Quests</CardDescription>
                          <CardTitle className="flex flex-col items-center gap-2">
                            <span className="text-4xl">
                              <IconSun />
                            </span>
                            <span>Check In</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <DailyQuests />
                        </CardContent>
                      </Card>
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
