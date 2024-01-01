import mongoose, {Model} from 'mongoose'
export type IAcademicDepartment = {
    id:string,
    title:string,
    academicFaculty:mongoose.Schema.Types.ObjectId   
}

export type AcademicDepartmentModel =Model<IAcademicDepartment, Record<string, unknown>>