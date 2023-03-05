import { useState } from "react";
import Assembler from "./components/Assembler/Assembler";
import Simulator from "./components/simulator/Simulator";

function App() {
  const [on, setOn] = useState(true);
  const handleOn = () => {
    setOn((prev) => !prev);
  };
  return (
    <div>
      <button onClick={handleOn}>
        convert to {on ? "Simulator" : "Assembler"}
      </button>
      {on ? <Assembler /> : <Simulator />}
    </div>
  );
}

export default App;
