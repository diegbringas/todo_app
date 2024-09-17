import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TrashItem from "../icons/TrashItem";
import { Tarea, Id } from "../types";

interface Props {
    tarea: Tarea;
    deleteTarea: (id: Id) => void;
    updateTarea: (id: Id, content: string) => void;
}

function TareaCard({ tarea, deleteTarea, updateTarea }: Props) {
    const [editMode, setEditMode] = useState(false);
    const [mouseIsOver, setMouseIsOver] = useState(false);

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: tarea.id,
        data: {
            type: 'Tarea',
            tarea,
        },
        disabled: editMode,
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    const toggleEditMode = () => {
        setEditMode((prev) => !prev);
    };

    if (editMode) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                onClick={toggleEditMode}
                className="bg-mainBackgroundColor relative items-center flex text-left rounded-xl cursor-grab p-2.5 h-[100px] min-h-[100px] hover:ring-2 hover:ring-inset hover:ring-rose-500"
            >
                <textarea
                    className="h-[90%] w-full resize-none border-none rounded bg-transparent text-white"
                    value={tarea.content}
                    autoFocus
                    placeholder="Que tarea es"
                    onBlur={() => toggleEditMode()}
                    onKeyDown={e => {
                        if (e.key === "Enter") toggleEditMode();
                    }}
                    onChange={(e) => updateTarea(tarea.id, e.target.value)}
                />
            </div>
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onClick={toggleEditMode}
            className="bg-mainBackgroundColor relative items-center flex text-left rounded-xl cursor-grab p-2.5 h-[100px] min-h-[100px] hover:ring-2 hover:ring-inset hover:ring-rose-500"
            onMouseEnter={() => setMouseIsOver(true)}
            onMouseLeave={() => setMouseIsOver(false)}
        >
            <p className="my-auto h-[90%]">{tarea.content}</p>
            {mouseIsOver && (
                <button
                    onClick={() => deleteTarea(tarea.id)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2"
                >
                    <TrashItem />
                </button>
            )}
        </div>
    );
}

export default TareaCard;
