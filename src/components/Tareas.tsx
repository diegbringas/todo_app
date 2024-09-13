import { type Tarea as Tareatype, type TareaId, type ListofTareas } from "../types";
import { Tarea } from "./Tarea";

interface Props {
    tareas: ListofTareas;
    onToggleCompleteTarea: ({ id, completed }: Pick<Tareatype, 'id' | 'completed'>) => void;
    onRemoveTarea: (id: TareaId) => void;
    onStatusChange: (id: TareaId, newStatus: 'por hacer' | 'en progreso' | 'completado') => void; 
}

export const Tareas: React.FC<Props> = ({ tareas, onToggleCompleteTarea, onRemoveTarea, onStatusChange }) => {
    return (
        <div className="Board">
            <div className="column">
                <h2>Por hacer</h2>
                <ul className="tarea-lista">
                    {tareas
                        .filter(tarea => tarea.status === 'por hacer')
                        .map(tarea => (
                            <li key={tarea.id} className={`${tarea.completed ? 'completed' : ''}`}>
                                <Tarea
                                    id={tarea.id}
                                    title={tarea.title}
                                    completed={tarea.completed}
                                    onToggleCompleteTarea={onToggleCompleteTarea}
                                    onRemoveTarea={onRemoveTarea}
                                    onStatusChange={onStatusChange} 
                                />
                            </li>
                        ))}
                </ul>
            </div>

            <div className="column">
                <h2>En progreso</h2>
                <ul className="tarea-lista">
                    {tareas
                        .filter(tarea => tarea.status === 'en progreso')
                        .map(tarea => (
                            <li key={tarea.id} className={`${tarea.completed ? 'completed' : ''}`}>
                                <Tarea
                                    id={tarea.id}
                                    title={tarea.title}
                                    completed={tarea.completed}
                                    onToggleCompleteTarea={onToggleCompleteTarea}
                                    onRemoveTarea={onRemoveTarea}
                                    onStatusChange={onStatusChange} 
                                />
                            </li>
                        ))}
                </ul>
            </div>

            <div className="column">
                <h2>Completado</h2>
                <ul className="tarea-lista">
                    {tareas
                        .filter(tarea => tarea.status === 'completado')
                        .map(tarea => (
                            <li key={tarea.id} className={`${tarea.completed ? 'completed' : ''}`}>
                                <Tarea
                                    id={tarea.id}
                                    title={tarea.title}
                                    completed={tarea.completed}
                                    onToggleCompleteTarea={onToggleCompleteTarea}
                                    onRemoveTarea={onRemoveTarea}
                                    onStatusChange={onStatusChange} 
                                />
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};
