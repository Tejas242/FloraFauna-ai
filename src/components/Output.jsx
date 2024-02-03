import { useEffect, useRef } from "react";
import ScrollReveal from "scrollreveal";
import SpeciesInfo from "./SpeciesInfo";
// import bg1 from '../assets/Animal.jpg'

const Output = () => {
  const speciesInfoRef = useRef(null);

  // const style = {
  //   backgroundImage: `url(${bg1})`,
  //   backgroundPosition: 'center',
  //   backgroundSize: 'cover',
  //   backgroundRepeat: 'no-repeat',
  // }

  useEffect(() => {
    const sr = ScrollReveal({
      origin: "bottom",
      distance: "60px",
      duration: 2500,
      delay: 400,
    });

    sr.reveal(speciesInfoRef.current, {
      interval: 100,
      viewFactor: 0.5,
    });
  }, []);

  return (
    <div className="p-10" id="output">
      {/* ... (your existing UploadSection and AIResponse components) */}
      <p className="mt-4 text-lg text-opacity-75 text-center text-white">
        Simply upload a photo and discover the wonders of nature.
      </p>

      <div className="species-info-container" ref={speciesInfoRef}>
        <SpeciesInfo />
      </div>
    </div>
  );
};

export default Output;