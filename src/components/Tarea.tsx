import { TareaId, type Tarea as TareaType } from "../types";

interface Props extends TareaType {
    onToggleCompleteTarea: ({ id, completed }: Pick<TareaType, 'id' | 'completed'>) => void;
    onRemoveTarea: (id: TareaId) => void;
    onStatusChange: (id: TareaId, newStatus: 'por hacer' | 'en progreso' | 'completado') => void; 
}

export const Tarea: React.FC<Props> = ({ id, title, completed, onRemoveTarea, onToggleCompleteTarea, onStatusChange }) => {
    const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>): void => {
        onToggleCompleteTarea({
            id,
            completed: event.target.checked,
        });
    };

    return (
        <div className="view">
            <input
                className="toggle"
                type="checkbox"
                checked={completed}
                onChange={handleChangeCheckbox}
            />

            <label>{title}</label>
            <button
                className="destroy"
                onClick={() => {
                    onRemoveTarea(id);
                }}
            >
                x
            </button>
            <button onClick={() => onStatusChange(id, 'por hacer')}>Mover a Por hacer</button>
            <button onClick={() => onStatusChange(id, 'en progreso')}>Mover a En progreso</button>
            <button onClick={() => onStatusChange(id, 'completado')}>Mover a Completado</button>
        </div>
    );
};
