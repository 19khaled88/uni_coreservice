export const filterFields = ['searchTerm','startDate','endDate','status','minCredit','maxCredit']
export const registerdSemesterSearchableFields=['startDate','endDate','status','minCredit','maxCredit']


export const semesterUpdatingMapping:{[key:string]:string} ={
    UPCOMMING : 'ONGOING',
    ONGOING : 'ENDED',
    ENDED :'UPCOMMING'
}