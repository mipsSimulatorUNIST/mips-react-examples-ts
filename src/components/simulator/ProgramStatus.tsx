import { simulator } from "mips-simulator-js/dist";
import { simulatorOutputType } from "mips-simulator-js/dist/src/utils/functions";
import { useEffect, useState } from "react";

const ProgramStatus = ({ fileContent }: { fileContent: string[] }) => {
  const [result, setResultState] = useState<simulatorOutputType | null>(null);
  const [history, setHistoryState] = useState<simulatorOutputType[] | null>(
    null
  );
  const [count, setCount] = useState(0);

  const fetchSimulator = async (fileContent: string[] | null) => {
    if (fileContent) {
      const { result, history } = await simulator(fileContent, 1000, true);
      setResultState(result);
      setHistoryState(history);
    }
  };

  const handleCounterNext = () => {
    if (history) {
      const historySize = history.length;
      setCount((prev) => {
        if (historySize <= prev + 1) {
          return prev;
        } else return prev + 1;
      });
    }
  };

  const handleCounterPrevious = () => {
    setCount((prev) => {
      if (prev > 0) {
        return prev - 1;
      } else return prev;
    });
  };

  useEffect(() => {
    if (fileContent) {
      fetchSimulator(fileContent);
    }
    return () => {
      setCount(0);
      setResultState(null);
      setHistoryState(null);
    };
  }, [fileContent]);

  return (
    <div>
      <div>
        <button onClick={handleCounterPrevious}>prev</button>
        <button onClick={handleCounterNext}>next</button>
      </div>

      {history ? (
        <div style={{ display: "flex", gap: "5px" }}>
          <div>
            <div>PC</div>
            <div style={{ border: "1px solid black" }}>{history[count].PC}</div>
            <div>Data Section</div>
            <div style={{ border: "1px solid black" }}>
              {Object.entries(history[count].dataSection).map(
                ([address, value]) => (
                  <div key={address}>
                    {address}: {value}
                  </div>
                )
              )}
            </div>
            <div>Stack Section</div>
            <div style={{ border: "1px solid black" }}>
              {Object.entries(history[count].stackSection).map(
                ([address, value]) => (
                  <div key={address}>
                    {address}: {value}
                  </div>
                )
              )}
            </div>
          </div>
          <div>
            <div>Registers</div>
            <div style={{ border: "1px solid black" }}>
              {Object.entries(history[count].registers).map(
                ([address, value]) => (
                  <div key={address}>
                    {address}: {value}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      ) : (
        "simulating..."
      )}
    </div>
  );
};

export default ProgramStatus;
