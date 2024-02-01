// import SpeciesInfo from "./SpeciesInfo";

// const Footer = () => {
//   return (
//     <div className="p-8 ">
//       {/* ... (your existing UploadSection and AIResponse components) */}
//       <p className="mt-4 text-lg text-opacity-75 text-center">
//         Simply upload a photo and discover the wonders of nature.
//       </p>
      
//       <div className="species-info-container">
//         <SpeciesInfo />
//       </div>
      
//       <footer className="mt-12 text-center text-gray-500 footer-container">
//         <p>&copy; 2024 Species Information System. All rights reserved.</p>
//         <p>Built with love using React and Google Generative AI.</p>
//       </footer>
//     </div>
//   );
// };

// export default Footer;


import { useEffect, useRef } from "react";
import ScrollReveal from "scrollreveal";
import SpeciesInfo from "./SpeciesInfo";

const Footer = () => {
  const speciesInfoRef = useRef(null);

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
    <div className="p-8 ">
      {/* ... (your existing UploadSection and AIResponse components) */}
      <p className="mt-4 text-lg text-opacity-75 text-center">
        Simply upload a photo and discover the wonders of nature.
      </p>

      <div className="species-info-container" ref={speciesInfoRef}>
        <SpeciesInfo />
      </div>

      <footer className="mt-12 text-center text-gray-500 footer-container">
        <p>&copy; 2024 Species Information System. All rights reserved.</p>
        <p>Built with love using React and Google Generative AI.</p>
      </footer>
    </div>
  );
};

export default Footer;
