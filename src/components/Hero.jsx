import SpeciesInfo from './SpeciesInfo';

const Hero = () => {
  return (
    <section className="relative h-screen">
      <div className="container mx-auto pt-20 px-4 text-center">
        <h1 className="text-4xl font-bold">
          Identify Flora & Fauna with AI
        </h1>
        <p className="mt-4 text-lg text-opacity-75">
          Simply upload a photo and discover the wonders of nature.
        </p>
      </div>
      <SpeciesInfo />
    </section>
  );
};

export default Hero;
