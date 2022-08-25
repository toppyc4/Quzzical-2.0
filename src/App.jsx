import { useState } from "react";
import topBlob from "./imgs/topBlob.svg";
import bottomBlob from "./imgs/bottomBlob.svg";
import Intro from "./Intro";
import Questions from "./components/Questions";

const App = () => {
  const [quizzing, setQuizzing] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-blue relative overflow-hidden">
      <img
        src={topBlob}
        className="pointer-events-none absolute top-0 right-0 -rotate-12 translate-x-1/2 -translate-y-1/2 sm:scale-50"
        alt="yellow blob"
      />
      {/* [870px], [1100px], [1000px] */}
      <img
        src={bottomBlob}
        className="pointer-events-none absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 sm:scale-50"
        alt="blue blob"
      />
      {quizzing ? <Questions /> : <Intro setQuizzing={setQuizzing} />}
    </div>
  );
};

export default App;
