import { FaCode } from "react-icons/fa";

export function Header() {
  return (
    <div className="flex items-center gap-5 py-2">
      <FaCode size={35} className="bg-orange-300 rounded-md p-2 text-zinc-950" /> 

      <nav className="flex items-center gap-5">
        <a href="" className="font-medium text-sm text-zinc-300">Eventos</a>
        <a href="" className="font-medium text-sm">Participantes</a>
      </nav>
    </div>
  );
}
