import { useState, useEffect } from "react";
import {
  projectStorage,
  projectFirestore,
  timestamp,
} from "../firebase/config";

// Hook zaduzen za fule upload i vracanje vrednosti (proggres, error, url..)
const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  // Koristimo useEffect jer se file menja
  useEffect(() => {
    // Refs
    // Kada upload nesto koristeci ovaj ref zelimo da file ima ime fajla koji upload
    const storageRef = projectStorage.ref(file.name);
    // Ref za kolekciju u kojoj cuvamo url
    const collectionRef = projectFirestore.collection("images");
    // Upload file u ref gore. .put je async, tako da nam treba nesto da znamo kada je zavrseno
    storageRef.put(file).on(
      "state_changed",
      (snap) => {
        // snap je objekat koji ima vrednosti preko kojih mozemo da odredimo progress
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        // Nalazi file koji smo upload, uzima URL
        const url = await storageRef.getDownloadURL();
        // Takodje moramo da sacuvamo url u Firestore
        // Timestamp izvlacimo iz config.js (firebase)
        const createdAt = timestamp();
        collectionRef.add({ url, createdAt });
        setUrl(url);
      }
    );
  }, [file]);
  return { progress, url, error };
};

export default useStorage;
