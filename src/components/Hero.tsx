import { Link } from "react-router-dom";
import todoImage from '../assets/images/todo1-1 (1).png';
import './Hero.css';


function Hero() {
  return (
    <div className="bg-cover bg-center h-screen flex items-center justify-between px-8">
      {/* Primer Div - Texto e Imagen */}
      <div className="text-center max-w-md p-4 relative inline-block mt-4">
        <h1 className="shadow-title ">
          GESTIONA PROYECTOS
        </h1>
        <h1 className="main-title ">
          GESTIONA PROYECTOS
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Organiza tus tareas y aumenta tu productividad con nuestra aplicación
          de gestión de proyectos.
        </p>
        <img
          src={todoImage}
          alt="Aplicación en acción"
          className="w-full h-auto max-w-4xl rounded-lg shadow-lg"
        />

        <Link to="/tareas">
          <button className="bg-blue-500 text-white px-6 py-3 mt-4 rounded-lg hover:bg-blue-700 transition duration-300">
            Ir a la página de tareas
          </button>
        </Link>
      </div>

      {/* Formulario */}
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md right-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Regístrate Ahora
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Ingresa tu nombre"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Correo
            </label>
            <input
              type="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Ingresa tu correo"
            />
          </div>
          <button className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}

export default Hero;
