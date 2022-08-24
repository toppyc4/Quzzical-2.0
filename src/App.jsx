import { useState } from "react";
import topBlob from "./imgs/topBlob.svg";
import bottomBlob from "./imgs/bottomBlob.svg";
import Intro from "./Intro";

const App = () => {
  return (
    <div className="h-screen relative overflow-hidden">
      <img
        src={topBlob}
        className="absolute top-0 right-0 -rotate-12 translate-x-1/2 -translate-y-1/2 scale-75 sm:scale-50"
        alt="yellow blob"
      />
      <img
        src={bottomBlob}
        className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 scale-75 sm:scale-50"
        alt="blue blob"
      />
      <Intro />
    </div>
  );
};

export default App;
