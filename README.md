# MIPS-React-Examples-ts

<img width="645" alt="image" src="https://user-images.githubusercontent.com/44657722/221390787-348e0b04-470e-4fe3-9f35-70b09042703b.png">

[_demo example_ &rarr;](https://mipssimulatorunist.github.io/mips-react-examples-ts/)

## 0. Install

```bash
$ npm i mips-simulator-js
```

## 1. sample_input

please prepare `sample_inputs` in `public` folder!

you can find it in `node_modules > mips-simulator-js > sample_input` or [_here_ &rarr;](https://github.com/mipsSimulatorUNIST/simulator/tree/main/sample_input)

## 2. Assembler

you can see the code of assembler in [_here_ &rarr;](https://github.com/mipsSimulatorUNIST/mips-react-examples-ts/tree/main/src/components/Assembler)

### 2-1) Assembler Selector

#### Assembler.tsx

```ts
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
```

### 2-2) Assembly Language

#### Assembly.tsx

```ts
import { useEffect } from "react";

function Assembly({
  fileContent,
  setFileContent,
  fileName,
}: {
  fileContent: string[];
  setFileContent: React.Dispatch<React.SetStateAction<string[]>>;
  fileName: string;
}) {
  useEffect(() => {
    const fetchFile = async (filePath: string) => {
      await fetch(filePath)
        .then((response) => response.text())
        .then((text) => {
          setFileContent(text.split("\n"));
        });
    };
    const filePath = `${process.env.PUBLIC_URL}/sample_input/${fileName}`;
    fetchFile(filePath);
  }, [fileName, setFileContent]);

  return (
    <div style={{ margin: "10px" }}>
      <h2>{fileName} Assembly</h2>
      <div style={{ border: "1px solid black" }}>
        {fileContent
          ? fileContent.map((line, index) => {
              return (
                <div
                  key={index}
                  style={{ border: "0.5px solid grey", textAlign: "center" }}
                >
                  {line}
                </div>
              );
            })
          : "loading..."}
      </div>
    </div>
  );
}

export default Assembly;
```

### 2-3) Binary Language

#### Binary.tsx

```ts
import { assemble } from "mips-simulator-js/dist";
import { useEffect, useState } from "react";

function Binary({
  fileContent,
  fileName,
}: {
  fileContent: string[];
  fileName: string;
}) {
  const [binaryContent, setBinaryContent] = useState([""]);
  useEffect(() => {
    const { output, mappingDetail } = assemble(fileContent);
    setBinaryContent(output);
  }, [fileContent, fileName]);

  return (
    <div style={{ margin: "10px" }}>
      <h2>{fileName} Binary</h2>
      <div style={{ border: "1px solid black" }}>
        {binaryContent
          ? binaryContent.map((line, index) => {
              return (
                <div
                  key={index}
                  style={{ border: "0.5px solid grey", textAlign: "center" }}
                >
                  {line}
                </div>
              );
            })
          : "loading..."}
      </div>
    </div>
  );
}

export default Binary;
```
