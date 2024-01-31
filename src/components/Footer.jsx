

import SpeciesInfo from "./SpeciesInfo";



const Footer = () => {

    return (
      <div className="p-8">
        {/* ... (your existing UploadSection and AIResponse components) */}
        <SpeciesInfo/>
  
        <footer className="mt-12 text-center text-gray-500">
          <p>&copy; 2024 Species Information System. All rights reserved.</p>
          <p>Built with love using React and Google Generative AI.</p>
        </footer>
      </div>
    );
  };
  
  export default Footer;