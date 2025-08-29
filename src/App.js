import React from "react";
import FeaturesCase from "./Components/featuresCase";
import "./index.css";

function App() {
  return (
    <div>
      <FeaturesCase />
      <div className="h-[200vh] bg-gray-100">
        {/* Extra content for scroll test */}
      </div>
    </div>
  );
}

export default App;
