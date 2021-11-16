import { useEffect, useState } from "react";
// import SplashScreen from "./Pages/SplashScreen";
import DashboardScreen from "./Pages/DashboardScreen";
import ws from "./utils/Websocket";

function App() {
  const [splash, setSplash] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 2000);

    return;
  }, []);
  return (
    <div className="bg-gray-800 h-screen py-5 px-5 md:px-10">
      <DashboardScreen />
    </div>
  );
}

export default App;
