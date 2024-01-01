import { Schema, model } from 'mongoose'
import { AcademicFacultyModel, IAcademicFaculty, title } from './interface'


const academicFacultySchema = new Schema<IAcademicFaculty>(
    {
        title: {
            type: String,
            required: true,
            enum: title
        }
    },
    {
        timestamps: true,
    },
)


export const AcademicFaculty = model<IAcademicFaculty, AcademicFacultyModel>('AcademicFaculty', academicFacultySchema)



