const Header = () => {
    return (
      <header className=" py-4 px-6 flex items-center justify-between bg-purple-400 shadow-lg">
        <h1 className="text-2xl font-bold">FloraFauna.ai</h1>
        <nav className="flex items-center">
          <a href="/" className="px-3">
            Github
          </a>
        </nav>
      </header>
    );
  };
  
  export default Header;