import { useEffect, useState } from "react";
import "./App.css";
import ReactJson from 'react-json-view'

// import the fingerprintjs opensource library
import FingerprintJS from "@fingerprintjs/fingerprintjs";

export default function App() {
  const [fpHash, setFpHash] = useState("");
  const [fpInfo, setFpInfo] = useState("");

  // create and set the fingerprint as soon as
  // the component mounts
  useEffect(() => {
    const setFp = async () => {
      const fp = await FingerprintJS.load();
      const fpResult = await fp.get();

      setFpHash(fpResult.visitorId);
      setFpInfo(fpResult);
    };

    setFp();
  }, []);
  return (
    <div>
      <h1>This is the fingerprint hash</h1>
      <h3>Hash: {fpHash}</h3>
      <hr/>
      <ReactJson src={fpInfo} />
    </div>
  );
}
