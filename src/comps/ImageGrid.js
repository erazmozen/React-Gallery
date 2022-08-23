import React from "react";
import useFirestore from "../Hooks/useFirestore";

const ImageGrid = ({ setSelectedImage }) => {
  const { docs } = useFirestore("images");
  console.log(docs);

  return (
    <div className="img-grid">
      {docs &&
        docs.map((doc) => (
          <div
            className="img-wraper"
            key={doc.id}
            // Izvlacimo url i ubacujemo ga u state koji smo definisali u App.js preko props
            onClick={() => setSelectedImage(doc.url)}
          >
            <img src={doc.url} alt="pic" />
          </div>
        ))}
    </div>
  );
};

export default ImageGrid;
