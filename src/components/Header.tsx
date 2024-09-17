const links = ["Aplicacion", "Servicios", "Sobre la empresa"]

function Header() {
  return (
    <nav className="bg-gray-700 flex justify-between items-center h-20 p-4 ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
        />
      </svg>
      <p className="ml-4 font-semibold  hover:text-blue-600 p-16 mr-auto">Administrador de Tareas</p>
      <ul className="flex gap-6 list-none text-gray-200 font-semibold"> 
        {links.map((link) => <li key={link} > <a>{ link }</a></li>)}</ul>
    </nav>
  );
}

export default Header;
