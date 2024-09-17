import React, { useMemo, useState } from 'react';
import PlusIcon from "../icons/PlusIcon";
import { Column, Id, Tarea } from "../types";
import ColumnContainer from "./ColumnContainer";
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TareaCard from './TareaCard';

function Tareas() {
    const [columns, setColumns] = useState<Column[]>([]);
    const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

    const [tareas, setTareas] = useState<Tarea[]>([]);
    const [activeColumn, setActiveColumn] = useState<Column | null>(null);

    const[activeTarea, setActiveTarea] = useState<Tarea | null>
    (null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3,
            },
        })
    );

    const createNewColumn = () => {
        const columnToAdd: Column = {
            id: generateId(),
            title: `Column ${columns.length + 1}`,
            tareas: [],
        };
        setColumns([...columns, columnToAdd]);
    };

    const deleteColumn = (id: Id) => {
        const filteredColumns = columns.filter((col) => col.id !== id);
        setColumns(filteredColumns);

        const nuevasTareas = tarea.filter(t => t.columnId !== id);
        setTareas(nuevasTareas);
    };

    const updateColumn = (id: Id, title: string) => {
        const newColumns = columns.map((col) => {
            if (col.id !== id) return col;
            return { ...col, title };
        });
        setColumns(newColumns);
    };

    const addTareaToColumn = (columnId: Id, newTarea: Tarea) => {
        setColumns(columns.map(column => {
            if (column.id === columnId) {
                return { ...column, tareas: [...column.tareas, newTarea] };
            }
            return column;
        }));
    };

    const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Column") {
        setActiveColumn(event.active.data.current.column);
    }

    if (event.active.data.current?.type === "Tarea") {
        setActiveTarea(event.active.data.current.tarea);
    }
};

    


    const onDragEnd = (event: DragEndEvent) => {
        setActiveColumn(null);
        setActiveTarea(null);

        const { active, over } = event;
        if (!over) return;

        const activeColumnId = active.id;
        const overColumnId = over.id;

        if (activeColumnId === overColumnId) return;

        setColumns(columns => {
            const activeColumnIndex = columns.findIndex((col) => col.id === activeColumnId);
            const overColumnIndex = columns.findIndex((col) => col.id === overColumnId);

            return arrayMove(columns, activeColumnIndex, overColumnIndex);
        });
    };

    function crearTarea(columnId: Id) {
        const newTarea: Tarea = {
            id: generateId(),
            columnId,
            content: `Task ${tareas.length + 1}`,  // Actualizado para usar content
            status: 'por hacer',
            completed: false,
        };

        setTareas([...tareas, newTarea]);
        addTareaToColumn(columnId, newTarea);
    }

    function updateTarea(id: Id, content: string) {  // Corregido el parámetro content
        const newTareas = tareas.map(tarea => {
            if (tarea.id !== id) return tarea;
            return { ...tarea, content };
        });

        setTareas(newTareas);
    }

    function deleteTarea(id: Id) {
        const newTareas = tareas.filter((tarea) => tarea.id !== id);
        setTareas(newTareas);
    }

    function onDragOver(event: DragOverEvent) {
      const { active, over } = event;
      if (!over) return;
  
      const activeId = active.id;
      const overId = over.id;
  
      const isActiveATarea = active.data.current?.type === "Tarea";
      const isOveraTarea = over.data.current?.type === "Tarea";
      const isOveraColumn = over.data.current?.type === "Column";
  
      if (!isActiveATarea) return;
  
      // Si estamos moviendo una tarea a otra tarea en la misma columna
      if (isActiveATarea && isOveraTarea) {
          setTareas(tareas => {
              const activeIndex = tareas.findIndex((t) => t.id === activeId);
              const overIndex = tareas.findIndex((t) => t.id === overId);
  
              return arrayMove(tareas, activeIndex, overIndex);
          });
      }
  
      // Si estamos moviendo una tarea a una columna diferente
      if (isActiveATarea && isOveraColumn) {
          const tareaMovida = tareas.find((t) => t.id === activeId);
          if (!tareaMovida) return;
  
          // Actualizamos la columna de la tarea movida
          setTareas(tareas.map(t => {
              if (t.id === activeId) {
                  return { ...t, columnId: overId }; // Actualiza la columna de la tarea
              }
              return t;
          }));
      }
  }
  
    
    function generateId() {
        return Math.floor(Math.random() * 10001);
    }

    return (
        <div className="relative m-auto w-full flex min-h-screen flex-col justify-center px-[40px]">
            <button
                onClick={createNewColumn}
                className="bg-blue-800 mt-16 w-[350px] left-2 min-w-[350px] rounded-lg border-columnBackgroundColor p-4 cursor-pointer hover:ring-2 flex gap-2 "
            >
                <PlusIcon />
                Agrega una columna
            </button>

            <DndContext 
                sensors={sensors} 
                onDragStart={onDragStart} 
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}
            >
                <div className="overflow-x-auto flex gap-4 mt-16 justify-center ">
                    <SortableContext 
                        items={columnsId}
                        strategy={verticalListSortingStrategy}
                    >
                        {columns.map(column => (
                            <ColumnContainer 
                                key={column.id}
                                column={column} 
                                deleteColumn={deleteColumn}
                                updateColumn={updateColumn}
                                crearTarea={crearTarea}
                                deleteTarea={deleteTarea}
                                updateTarea={updateTarea}
                                tarea={tareas.filter(t => t.columnId === column.id)}
                            />
                        ))}
                    </SortableContext>
                </div>
                {activeColumn && createPortal(
                    <DragOverlay>
                        <div className="w-[350px] bg-white border-2 border-rose-500 p-4 rounded-md">
                            {activeColumn.title}
                        </div>
                        {activeTarea && <TareaCard tarea={activeTarea} deleteTarea={deleteTarea}/>}
                    </DragOverlay>,
                    document.body
                )}
            </DndContext>
        </div>
    );
}

export default Tareas;
