import Assembly from "./Assembly";
import { useRef, useState } from "react";
import Binary from "./Binary";

const Assembler = () => {
  const options = useRef([
    { value: "example1.s", label: "example1.s" },
    { value: "example2.s", label: "example2.s" },
    { value: "example3.s", label: "example3.s" },
    { value: "example4.s", label: "example4.s" },
    { value: "example5.s", label: "example5.s" },
    { value: "example6.s", label: "example6.s" },
    { value: "example7.s", label: "example7.s" },
  ]);

  const [fileContent, setFileContent] = useState(["Loading..."]);
  const [fileName, setFileName] = useState(options.current[0].value);

  const handleSelector = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFileName(event.target.value);
  };

  return (
    <>
      <h1>Assembler Example</h1>
      <select value={fileName} onChange={handleSelector}>
        {options.current.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Assembly
          fileContent={fileContent}
          setFileContent={setFileContent}
          fileName={fileName}
        />
        <Binary fileContent={fileContent} fileName={fileName} />
      </div>
    </>
  );
};

export default Assembler;
