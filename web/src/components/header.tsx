import { FaCode } from "react-icons/fa";
import { NavLink } from "./nav-link";

export function Header() {
  return (
    <div className="flex items-center gap-5 py-2">
      <FaCode size={35} className="bg-orange-300 rounded-md p-2 text-zinc-950" /> 

      <nav className="flex items-center gap-5">
        <NavLink>Eventos</NavLink>
        <NavLink>Participantes</NavLink>
      </nav>
    </div>
  );
}
