import React, { useEffect } from "react";
import useStorage from "../Hooks/useStorage";

const ProgressBar = ({ file, setFile }) => {
  const { url, progress } = useStorage(file);
  console.log(progress, url);
  // Koristimo trenutak kada dobijemo url kao znak da je upload zavrsen,
  // i skidamo progressbar
  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);
  return <div className="progress-bar" style={{ width: progress + "%" }}></div>;
};

export default ProgressBar;
