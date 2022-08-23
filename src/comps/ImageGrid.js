import React from "react";
import useFirestore from "../Hooks/useFirestore";

const ImageGrid = () => {
  const { docs } = useFirestore("images");
  console.log(docs);

  return (
    <div className="img-grid">
      {docs &&
        docs.map((doc) => (
          <div className="img-wraper" key={doc.id}>
            <img src={doc.url} alt="pic" />
          </div>
        ))}
    </div>
  );
};

export default ImageGrid;
