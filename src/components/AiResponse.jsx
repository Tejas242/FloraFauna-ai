import { useEffect, useRef , useState } from "react";
import { useLocation } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
// import bg1 from '../assets/Animal.jpg'



const AIResponse = () => {
  const aiResponseRef = useRef(null);
  const { aiResponse, image } = useLocation().state;
  const [loading, setLoading] = useState(true);

  // const style = {
  //     backgroundImage: `url(${bg1})`,
  //     backgroundPosition: 'center',
  //     backgroundSize: 'cover',
  //     backgroundRepeat: 'no-repeat',
  //   }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000); // Set loading time to 2 seconds

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ScaleLoader size={50} color={"#123abc"} loading={loading} />
      </div>
    );
  }

  return (
    <div className="lg:container mx-auto py-8" ref={aiResponseRef}>
      {!aiResponse && (
        <div className="text-center text-gray-600">
          <p className="text-lg">Loading ...</p>
        </div>
      )}
      {aiResponse && (
        <div className="backdrop-blur-sm rounded-xl shadow-md p-8 bg-lime-100">
          <img src={image} className="w-100 h-80  rounded-xl" />
          <h2 className="text-xl font-semibold mb-4">Most Likely Species:</h2>
          <p className="text-gray-700 mb-2">
            Scientific Name: {aiResponse.most_likely_species.scientific_name}
          </p>
          <p className="text-gray-700 mb-2">
            Common Names:{" "}
            {aiResponse.most_likely_species.common_names.join(", ")}
          </p>
          <p className="text-gray-700 mb-2">Brief Description:</p>
          <ul className="list-disc list-inside mb-4">
            {aiResponse.most_likely_species.brief_description.map(
              (desc, index) => (
                <li key={index} className="text-gray-700">
                  {desc}
                </li>
              )
            )}
          </ul>
          <p className="text-gray-700 mb-2">
            Confidence Level:{" "}
            {Math.round(aiResponse.most_likely_species.confidence_level * 100) +
              "%"}
          </p>
          <div className="mt-4">
            <hr className="border-t-2 border-gray-300 mx-auto w-full" />
          </div>
          <h2 className="text-xl font-semibold mt-8">Overall Appearance:</h2>
          <p className="text-gray-700 mb-4">{aiResponse.overall_appearance}</p>
          <div className="mt-4 pt-5">
            <hr className="border-t-2 border-gray-300 mx-auto w-full" />
          </div>

          <h2 className="text-xl font-semibold pt-5">
            Distinguishing Features:
          </h2>
          <ul className="list-disc list-inside mb-4">
            {aiResponse.distinguishing_features.map((desc, index) => (
              <li key={index} className="text-gray-700">
                {desc}
              </li>
            ))}
          </ul>

          <div className="mt-4 pt-5">
            <hr className="border-t-2 border-gray-300 mx-auto w-full" />
          </div>

          <h2 className="text-xl font-semibold pt-5">Habitat:</h2>
          <p className="text-gray-700 mb-4">{aiResponse.habitat}</p>

          <div className="mt-4 pt-5">
            <hr className="border-t-2 border-gray-300 mx-auto w-full" />
          </div>

          <h2 className="text-xl font-semibold pt-5">Geographic Location:</h2>
          <p className="text-gray-700 mb-4">{aiResponse.geographic_location}</p>

          <div className="mt-4 pt-5">
            <hr className="border-t-2 border-gray-300 mx-auto w-full" />
          </div>

          <h2 className="text-xl font-semibold pt-5">
            Links to Additional Resources:
          </h2>
          <ul className="list-disc list-inside">
            {aiResponse.links_to_additional_resources.map((resource, index) => (
              <li key={index} className="text-gray-700">
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {resource.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AIResponse;
