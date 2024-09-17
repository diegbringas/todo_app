import React, { useMemo, useState } from "react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import PlusIcon from "../icons/PlusIcon";
import TareaCard from "./TareaCard";
import { Column, Id, Tarea } from "../types";
import TrashItem from "../icons/TrashItem";

interface Props {
    column: Column;
    deleteColumn: (id: Id) => void;
    updateColumn: (id: Id, title: string) => void;

    crearTarea: (columnId: Id) => void;
    updateTarea: (id:Id, content: string) => void; 
    deleteTarea: (id: Id) => void;
    tarea: Tarea[];  // Lista de tareas para esta columna
}

function ColumnContainer(props: Props) {
    const { column, deleteColumn, updateColumn, crearTarea, tarea, deleteTarea, updateTarea } = props;
    const [editMode, setEditMode] = useState(false);

    const TareaIds = useMemo(() => {
        return tarea.map((tarea) => tarea.id);
    }, [tarea]);

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: column.id,
        data: {
            type: 'Column',
            column,
        },
        disabled: editMode,
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    const toggleEditMode = () => {
        setEditMode((prev) => !prev);
        setMouseisOver(false);
    };

 
    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className=" opacity-50 bg-columnBackgroundColor w-[350px] h-[500px] opacity-40 border-2 border-rose-500 max-h-[500px] rounded-md flex flex-col"
            >
            </div>
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="bg-columnBackgroundColor w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"
        >
            <div
                {...attributes}
                {...listeners}
                onClick={() => setEditMode(true)}
                className="bg-mainBackgroundColor text-md h-[60px] cursor-grab rounded-md p-3 rounded-b-none border-columnBackgroundColor border-4 flex items-center justify-between"
            >
                <div className="flex gap-2 items-center">
                    <div className="flex justify-center items-center bg-columnBackgroundColor px-2 py-1 text-sm rounded-full">
                        {tarea.length}  {/* Muestra el número de tareas */}
                    </div>
                    {!editMode ? column.title : (
                        <input
                            className="bg-black text-white p-1 rounded"
                            value={column.title}
                            onChange={(e) => updateColumn(column.id, e.target.value)}
                            autoFocus
                            onBlur={() => setEditMode(false)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") setEditMode(false);
                            }}
                        />
                    )}
                </div>
                <button
                    onClick={() => deleteColumn(column.id)}
                    className="stroke-gray-500 hover:stroke-white hover:bg-columnBackgroundColor rounded px-1 py-2 transition-colors"
                >
                    <TrashItem />
                </button>
            </div>

            <div className="flex flex-grow flex-col p-2">
                
                <SortableContext items={TareaIds}>
                {tarea.length > 0 ? (
                    
                    tarea.map((t) => (
                        <TareaCard 
                        key={t.id} 
                        tarea={t} 
                        deleteTarea={deleteTarea} 
                        updateTarea={updateTarea}/>
                    ))
                ) : (
                    <p>No hay tareas en esta columna</p>
                )}
                </SortableContext>
            </div>

            <button
                className="p-4 hover:bg-mainBackgroundColor"
                onClick={() => crearTarea(column.id)}
            >
                <PlusIcon />
            </button>
        </div>
    );
}

export default ColumnContainer;
