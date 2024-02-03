import { NavLink } from "react-router-dom";

const Header = () => {
    return (
      <header className=" py-4 px-6 flex items-center justify-between bg-slate-950 shadow-lg" id="header" >
        <NavLink to={"/"}>
        <h1 className="text-2xl font-bold text-white">FloraFauna.ai</h1>
        </NavLink>
        <nav className="flex items-center text-white">
          <a href="https://github.com/Tejas242/FloraFauna-ai" className="px-3">
            Github
          </a>
        </nav>
      </header>
    );
  };
  
  export default Header;