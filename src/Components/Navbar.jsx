import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 py-4 border-b">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `px-4 py-2 rounded-lg transition ${
            isActive ? "bg-blue-500 text-white" : "hover:bg-gray-700"
          }`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/pastes"
        className={({ isActive }) =>
          `px-4 py-2 rounded-lg transition ${
            isActive ? "bg-blue-500 text-white" : "hover:bg-gray-700"
          }`
        }
      >
        Pastes
      </NavLink>
    </div>
  );
};

export default Navbar;
