import {Model} from 'mongoose'

type Title = | 'Faculty of science and engineering' | 'Faculty of Business Administration' | 'Faculty of Arts and Social science';
export const title =['Faculty of science and engineering', 'Faculty of Business Administration', 'Faculty of Arts and Social science']
export type IAcademicFaculty = {
    id:string,
    title:'Faculty of science and engineering' |'Faculty of Business Administration' | 'Faculty of Arts and Social science',
   
}

export type AcademicFacultyModel =Model<IAcademicFaculty, Record<string, unknown>>