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
        <h1 className="text-4xl font-bold hero__title text-white">
          Identify Flora & Fauna with AI
        </h1>
        <p className="mt-4 text-lg text-opacity-75 text-center hero__title text-white">
         Every species has a story to tell
        </p>
      </div>
      <div className="h-screen flex items-center justify-center hero__title">
      <button className='w-[10rem] py-[20px] px-[10px] rounded-3xl bg-[#98EC65] hover:bg-[#81E047] mt-[1rem]' >
        <a href="#output">Explore Now</a>
      </button>
      </div>
      
    </section>
  );
};

export default Hero;