export const TAREA_FILTERS = {
    ALL: 'all',
    ACTIVE: 'active',
    COMPLETED: 'completed',
    PARTIAL: 'partial'

} as const 

export const FILTER_BUTTONS = {
    [TAREA_FILTERS.ALL] : {
        literal: 'Tareas',
        href: `/?filter=${TAREA_FILTERS.ALL}`

    },
    [TAREA_FILTERS.ACTIVE] : {
        literal: 'Activos',
        href: `/?filter=${TAREA_FILTERS.ACTIVE}`

    },
    [TAREA_FILTERS.COMPLETED] : {
        literal: 'Completados',
        href: `/?filter=${TAREA_FILTERS.COMPLETED}`

    },
} as const