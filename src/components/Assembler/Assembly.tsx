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
      console.log(filePath);
      await fetch(filePath)
        .then((response) => response.text())
        .then((text) => {
          console.log(text);
          setFileContent(text.split("\n"));
        });
    };
    const filePath = `sample_input/${fileName}`;
    console.log(filePath);
    fetchFile(filePath);
  }, [fileName, setFileContent]);

  useEffect(() => {
    console.log(fileContent);
  }, [fileContent]);

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
