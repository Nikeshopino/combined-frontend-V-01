import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  // Helper function to check if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white w-full mt-[-10px]">
      <div className="flex justify-between items-center w-full overflow-x-auto">
        <Link
          to="/"
          className={`relative text-black text-sm font-semibold p-2 w-[16.66%] flex justify-center items-center group ${isActive('/') ? 'text-blue-800' : 'hover:text-blue-800'}`}
        >
          All
          <span
            className={`absolute block w-full h-0.5 bottom-0 left-0 transition-colors duration-300 ${isActive('/') ? 'bg-gradient-to-b from-[#0551F6] to-[#0D3A9D] h-1' : 'bg-black group-hover:bg-gradient-to-b from-[#0551F6] to-[#0D3A9D] h-0.5'}`}
          ></span>
        </Link>
        <Link
          to="/events/Cricket"
          className={`relative text-black text-sm font-semibold p-2 w-[16.66%] flex justify-center items-center group ${isActive('/events/Cricket') ? 'text-blue-800' : 'hover:text-blue-800'}`}
        >
          Cricket
          <span
            className={`absolute block w-full h-0.5 bottom-0 left-0 transition-colors duration-300 ${isActive('/events/Cricket') ? 'bg-gradient-to-b from-[#0551F6] to-[#0D3A9D] h-1' : 'bg-black group-hover:bg-gradient-to-b from-[#0551F6] to-[#0D3A9D] h-0.5'}`}
          ></span>
        </Link>
        <Link
          to="/events/CurrentAffair"
          className={`relative text-black text-sm font-semibold p-2 w-[16.66%] flex justify-center items-center group ${isActive('/events/CurrentAffair') ? 'text-blue-800' : 'hover:text-blue-800'}`}
        >
          Current Affairs
          <span
            className={`absolute block w-full h-0.5 bottom-0 left-0 transition-colors duration-300 ${isActive('/events/CurrentAffair') ? 'bg-gradient-to-b from-[#0551F6] to-[#0D3A9D] h-1' : 'bg-black group-hover:bg-gradient-to-b from-[#0551F6] to-[#0D3A9D] h-0.5'}`}
          ></span>
        </Link>
        <Link
          to="/events/Football"
          className={`relative text-black text-sm font-semibold p-2 w-[16.66%] flex justify-center items-center group ${isActive('/events/Football') ? 'text-blue-800' : 'hover:text-blue-800'}`}
        >
          Football
          <span
            className={`absolute block w-full h-0.5 bottom-0 left-0 transition-colors duration-300 ${isActive('/events/Football') ? 'bg-gradient-to-b from-[#0551F6] to-[#0D3A9D] h-1' : 'bg-black group-hover:bg-gradient-to-b from-[#0551F6] to-[#0D3A9D] h-0.5'}`}
          ></span>
        </Link>
        <Link
          to="/events/Youtube"
          className={`relative text-black text-sm font-semibold p-2 w-[16.66%] flex justify-center items-center group ${isActive('/events/Youtube') ? 'text-blue-800' : 'hover:text-blue-800'}`}
        >
          YouTube
          <span
            className={`absolute block w-full h-0.5 bottom-0 left-0 transition-colors duration-300 ${isActive('/events/Youtube') ? 'bg-gradient-to-b from-[#0551F6] to-[#0D3A9D] h-1' : 'bg-black group-hover:bg-gradient-to-b from-[#0551F6] to-[#0D3A9D] h-0.5'}`}
          ></span>
        </Link>
        <Link
  to="/events/F1 Racing"
  className={`relative text-black text-sm font-semibold p-2 w-[16.66%] flex justify-center items-center group ${isActive('/events/F1%20Racing') ? 'text-blue-800' : 'text-black hover:text-blue-800'}`}
>
  F1 Racing
  <span
    className={`absolute block w-full bottom-0 left-0 transition-all duration-300 ${isActive('/events/F1%20Racing') ? 'bg-gradient-to-b from-[#0551F6] to-[#0D3A9D] h-1' : 'bg-black group-hover:bg-gradient-to-b from-[#0551F6] to-[#0D3A9D] h-0.5'}`}
  ></span>
</Link>
        
      </div>
    </nav>
  );
};

export default Navbar;
