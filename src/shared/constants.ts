export const paginationFields =['page','limit','sortBy','sortOrder']

export type IGenericResponse<T> ={
    meta:{
        page:number,
        limit:number,
        total:number
    },
    data:T
}

