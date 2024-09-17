import { TAREA_FILTERS } from "./consts"

export interface Tarea {
    id: number
    title:string 
    completed:boolean
    status: 'por hacer' | 'en progreso' | 'completado'  
}

export type TareaId = Pick<Tarea, 'id' >
export type TareaTitle = Pick<Tarea, 'title'>
export type TareaCompleted = Pick<Tarea, 'completed'>


export type ListofTareas = Tarea[]

export type FilterValue = typeof TAREA_FILTERS[keyof typeof TAREA_FILTERS]


export type Id =  string | number

import { TAREA_FILTERS } from "./consts"

export interface Tarea {
    id: number
    title:string 
    content:string
    status: 'por hacer' | 'en progreso' | 'completado'  
}

export type TareaId = Pick<Tarea, 'id' >
export type TareaTitle = Pick<Tarea, 'title'>
export type TareaCompleted = Pick<Tarea, 'completed'>


export type ListofTareas = Tarea[]

export type FilterValue = typeof TAREA_FILTERS[keyof typeof TAREA_FILTERS]


export type Id =  string | number

export type Column = {
    id: Id;
    title: string;
};
