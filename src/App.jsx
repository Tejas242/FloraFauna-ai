import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import bg from "./assets/Plant.jpg";
import Hero from "./components/Hero";
import Output from "./components/Output";

function App() {
  const style = {
    backgroundImage: `url(${bg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <>
      <main style={style}>
        <Header />
        <Hero/>
        <Output/>
        <Footer />
      </main>
    </>
  );
}

export default App;
