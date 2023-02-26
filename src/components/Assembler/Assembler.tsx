import Assembly from "./Assembly";
import { useState } from "react";
import Binary from "./Binary";

const Assembler = () => {
  const [fileContent, setFileContent] = useState(["Loading..."]);
  return (
    <>
      <h1>Assembler Example</h1>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Assembly
          fileContent={fileContent}
          setFileContent={setFileContent}
          fileName={"example1.s"}
        />
        <Binary
          fileContent={fileContent}
          setFileContent={setFileContent}
          fileName={"example1.s"}
        />
      </div>
    </>
  );
};

export default Assembler;
