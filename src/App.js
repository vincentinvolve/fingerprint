import { useEffect, useState } from "react";
import "./App.css";
import ReactJson from "react-json-view";

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
      fpResult.meta = {};
      // console.log(navigator);

      const entrophy = await navigator.userAgentData.getHighEntropyValues([
        "architecture",
        "model",
        "platformVersion",
        "fullVersionList",
      ]);
      fpResult.meta.userAgent = navigator.userAgent;
      fpResult.meta.architecture = entrophy.architecture;
      fpResult.meta.isMobile = entrophy.mobile;
      fpResult.meta.platform = entrophy.platform;
      fpResult.meta.platformVersion = entrophy.platformVersion;

      setFpHash(fpResult.visitorId);
      setFpInfo(fpResult);
    };

    setFp();
  }, []);
  return (
    <div>
      <h1>This is the fingerprint hash</h1>
      <h3>Hash: {fpHash}</h3>
      <hr />
      <ReactJson src={fpInfo} />
    </div>
  );
}
