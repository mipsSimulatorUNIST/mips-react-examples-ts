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
