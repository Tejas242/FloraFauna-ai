
const AIResponse = ({ aiResponse, loading }) => {
  return (
    <div className="container mx-auto py-8">
      {loading && !aiResponse && (
        <div className="text-center text-gray-600">
          <p className="text-lg">Loading ...</p>
        </div>
      )}
      {aiResponse && (
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-4">Most Likely Species:</h2>
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
          <h2 className="text-2xl font-semibold mt-8">Overall Appearance:</h2>
          <p className="text-gray-700 mb-4">{aiResponse.overall_appearance}</p>

          <h2 className="text-2xl font-semibold">Distinguishing Features:</h2>
          <ul className="list-disc list-inside mb-4">
            {aiResponse.distinguishing_features.map((desc, index) => (
              <li key={index} className="text-gray-700">
                {desc}
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-semibold">Habitat:</h2>
          <p className="text-gray-700 mb-4">{aiResponse.habitat}</p>

          <h2 className="text-2xl font-semibold">Geographic Location:</h2>
          <p className="text-gray-700 mb-4">{aiResponse.geographic_location}</p>

          <h2 className="text-2xl font-semibold">
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
