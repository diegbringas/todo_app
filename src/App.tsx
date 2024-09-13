import { useState } from "react";
import { Tareas } from "./components/Tareas";
import { FilterValue, TareaId, type Tarea as TareaType } from "./types";
import { TAREA_FILTERS } from "./consts";
import { Footer } from "./components/Footer";

const mockTareas: TareaType[] = [
  {
    id: 1,
    title: 'Completar el código restante',
    completed: true,
    status: 'por hacer'
  },
  {
    id: 2,
    title: 'Comprar las cosas para la cena',
    completed: false,
    status: 'en progreso'
  },
  {
    id: 3,
    title: 'Aprender React Js',
    completed: false,
    status: 'completado'
  }
];

const App = (): JSX.Element => {
  const [tareas, setTareas] = useState<TareaType[]>(mockTareas);
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TAREA_FILTERS.ALL);

  const handleRemove = (id: TareaId): void => {
    const nuevaTareas = tareas.filter(tarea => tarea.id !== id);
    setTareas(nuevaTareas);
  };

  const handleCompleted = ({ id, completed }: Pick<TareaType, 'id' | 'completed'>): void => {
    const nuevaTareas = tareas.map(tarea => {
      if (tarea.id === id) {
        return {
          ...tarea,
          completed
        };
      }
      return tarea;
    });
    setTareas(nuevaTareas);
  };

  const handleStatusChange = (id: TareaId, newStatus: 'por hacer' | 'en progreso' | 'completado'): void => {
    const nuevasTareas = tareas.map(tarea => {
      if (tarea.id === id) {
        return {
          ...tarea,
          status: newStatus
        };
      }
      return tarea;
    });
    setTareas(nuevasTareas);
  };

  return (
    <div className="tareasapp">
      <Tareas
        onToggleCompleteTarea={handleCompleted}
        onRemoveTarea={handleRemove}
        onStatusChange={handleStatusChange} 
        tareas={tareas}
      />
      <Footer
        activeCount={tareas.filter(tarea => !tarea.completed).length}
        completedCount={tareas.length - tareas.filter(tarea => !tarea.completed).length}
        filterSelected={filterSelected}
        handleFilterChange={setFilterSelected}
        onClearCompleted={() => setTareas(tareas.filter(tarea => !tarea.completed))}
      />
    </div>
  );
};

export default App;
