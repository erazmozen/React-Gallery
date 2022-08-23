import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

// Ovde aktivno gledamo za dokumente dodane u kolekciju, vracamo ih i
// prolazimo kroz njih kako bismo ih prikazali
const useFirestore = (collection) => {
  const [docs, setDocs] = useState([]);
  // Opet koristimo useEffect kako bismo update svaki put kada je novi dokument dodat
  useEffect(() => {
    const unsub = projectFirestore
      .collection(collection)
      .orderBy("createdAt", "desc")
      // snap nas obavestava svaki put kada se stanje promeni u firestore
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          // .data nam prepisuje vrednosi koje se beleze u firestore databazi (id, url, timestamp)
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
      });

    // Ako je ImageGrid unmountovan, ne zelimo da pratimo databazu
    return () => unsub();
  }, [collection]);
  return { docs };
};

export default useFirestore;
