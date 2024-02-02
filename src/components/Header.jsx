import { NavLink } from "react-router-dom";

const Header = () => {
    return (
      <header className=" py-4 px-6 flex items-center justify-between bg-slate-950 shadow-lg" id="header" >
        <NavLink to={"/"}>
        <h1 className="text-2xl font-bold text-white">FloraFauna.ai</h1>
        </NavLink>
        <nav className="flex items-center text-white">
          <button className='w-[10rem] py-[8px] rounded-3xl bg-[#98EC65] hover:bg-[#81E047] mt-[1rem]'>
          <a href="https://github.com/Tejas242/FloraFauna-ai">
            Github
          </a>
          </button>
        </nav>
      </header>
    );
  };
  
  export default Header;