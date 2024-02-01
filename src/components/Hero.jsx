import { useEffect } from "react";
import ScrollReveal from "scrollreveal";

const Hero = () => {
  useEffect(() => {
    const sr = ScrollReveal({
      origin: "top",
      distance: "60px",
      duration: 2500,
      delay: 400,
    });

    sr.reveal(`.hero__title`, {
      origin: "bottom",
    });
  }, []);

  return (
    <section className="relative h-screen hero">
      <div className="container mx-auto pt-20 px-4 text-center hero__content">
        <h1 className="text-4xl font-bold hero__title">
          Identify Flora & Fauna with AI
        </h1>
        <p className="mt-4 text-lg text-opacity-75 text-center hero__title">
         Every species has a story to tell
        </p>
      </div>
    </section>
  );
};

export default Hero;