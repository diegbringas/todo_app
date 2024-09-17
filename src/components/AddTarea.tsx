import { useState } from 'react';

interface Props {
  onAddTarea: (title: string, status: 'por hacer' | 'en progreso' | 'completado') => void;
}

export const AddTarea: React.FC<Props> = ({ onAddTarea }) => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<'por hacer' | 'en progreso' | 'completado'>('por hacer');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (title.trim()) {
      onAddTarea(title, status);
      setTitle(''); 
    }
  };

  return (

    <form onSubmit={handleSubmit} className='form-tarea'>

      <h2>Agrega la tarea</h2>
      <div className="add-tarea1">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Escribe una nueva tarea"
      />
      </div>
      <div className="add-tarea2">
      <select value={status} onChange={(e) => setStatus(e.target.value as 'por hacer' | 'en progreso' | 'completado')}>
        <option value="por hacer">Por hacer</option>
        <option value="en progreso">En progreso</option>
        <option value="completado">Completado</option>
      </select>
      </div>
      <button type="submit" className='add-tarea3'>Agregar</button>
    </form>
  );
};
