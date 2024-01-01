import mongoose, { Schema, model } from 'mongoose'
import { AcademicDepartmentModel, IAcademicDepartment,  } from './interface'

const academicDepartmentSchema = new Schema<IAcademicDepartment,AcademicDepartmentModel>(
    {
        title: {
            type: String,
            unique:true,
            required: true,
        },
        academicFaculty:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'AcademicFaculty'
        }
    },
    {
        timestamps: true,
        toJSON:{
            virtuals:true
        }
    },
)


export const AcademicDepartment = model<IAcademicDepartment, AcademicDepartmentModel>('AcademicDepartment', academicDepartmentSchema)



