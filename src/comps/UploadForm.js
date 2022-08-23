import React, { useState } from "react";
import ProgressBar from "./ProgresBar";

const UploadForm = () => {
  // State u kome cuvamo izabrani file
  const [file, setFile] = useState(null);
  // Dozvoljeni filetype
  const types = ["image/png", "image/jpeg"];
  // Error
  const [error, setError] = useState(null);

  const changeHandler = (e) => {
    // Iz event objekta uzimamo samo prvi file, stavicemo ga u local state
    let selected = e.target.files[0];
    // Samo ako je file izabran koristimo setFile da bismo update state. Takodje
    // moramo da proverimo dali je file type ono sto zelimo, napravicemo array sa
    // dozvoljenim filetype, definisano gore
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("File mora biti png ili jpeg");
    }
  };

  return (
    <form>
      <label>
        <input type="file" onChange={changeHandler} />
        <span>+</span>
      </label>
      <div className="output">
        {error && <div className="error">{error}</div>}
        {file && <div>{file.name}</div>}
        {file && <ProgressBar file={file} setFile={setFile} />}
      </div>
    </form>
  );
};

export default UploadForm;
