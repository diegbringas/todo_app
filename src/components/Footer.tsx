import { ListofTareas } from "../types"
import { Filters } from "./Filters"

interface Props {
    activeCount: number
    tareas: ListofTareas
    completedCount: number
    filterSelected: string
    handleFilterChange: (filter: string) => void
    onClearCompleted: () => void
}

export const Footer: React.FC<Props> = ({ 
    activeCount = 0,
    completedCount = 0,
    filterSelected,
    handleFilterChange,
    onClearCompleted 
}) => {

  return (
    <footer className="footer">
      <span className="tarea-contador">
        <strong>{activeCount}</strong> tarea{activeCount !== 1 ? 's' : ''} pendiente{activeCount !== 1 ? 's' : ''}
      </span>

      <Filters
        filterSelected={filterSelected}
        onFilterChange={handleFilterChange}
      />

      {completedCount > 0 && (
        <button 
          className="clear-completed" 
          onClick={onClearCompleted}
        >
          Limpiar completadas
        </button>
      )}

      
    </footer>
  );
};
