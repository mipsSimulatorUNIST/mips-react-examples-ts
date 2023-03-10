import { assemble } from "mips-simulator-js";
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
    const { output, mappingDetail: _ } = assemble(fileContent);
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
