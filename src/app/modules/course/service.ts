import { CourseFaculty, Prisma, PrismaClient } from "@prisma/client";
import {  ICourseCreate, ICourseFaculty } from "./interface";
import ApiError from "../../../errors/ApiError";
const prisma = new PrismaClient()

const createCourse=async(payload:ICourseCreate)=>{
    const {preRequisiteCourses, ...courses} = payload 
    const response = await prisma.$transaction(async(transactionClient)=>{
        const res = await transactionClient.course.create({
            data:courses
        });

        if(preRequisiteCourses && preRequisiteCourses.length > 0){
            for(let index=0; index < preRequisiteCourses.length; index++){
                const createPrerequisite = await transactionClient.courseToPrerequisite.create({
                    data:{
                        courseId:res.id,
                        preRequisiteId:preRequisiteCourses[index].courseId
                    }
                })
                
            }
        }

        return res
    })

    if(response){
        const course = await prisma.course.findUnique({
            where:{
                id:response.id
            },
            include:{
                preRequisite:{
                    include:{
                      
                        preRequisite:true
                    }
                },
                preRequisiteFor:{
                    include:{
                        course:true,
                       
                        
                    }
                }
            }
        })
        return course
    }
}

const courseAssignToFaculty=async(courseId:string,faculties:string[]):Promise<CourseFaculty[]>=>{
    try {
        const data: Prisma.CourseFacultyCreateManyInput[] = faculties.map((facultyId) => ({
          courseId,
          facultyId,
        }));
    
        // Use createMany to insert records
        const createManyResponse = await prisma.courseFaculty.createMany({
          data,
        });
    
        // Fetch the created records based on the courseId and facultyIds
        const createdRecords = await prisma.courseFaculty.findMany({
          where: {
            courseId,
            facultyId: {
              in: faculties,
            },
            
          },
          include:{
            faculty:true,
            course:true
          }
        });

        return createdRecords;
      } catch (error) {
        throw error;
      } 
}

const deleteAssignedCourse =async(courseId:string,faculties:string[])=>{
    try {  
        // Use createMany to insert records
        const deleteManyResponse = await prisma.courseFaculty.deleteMany({
          where:{
            courseId,
            facultyId:{
                in:faculties
            }
          }
        });

    
        // Fetch the created records based on the courseId and facultyIds
        const remaningRecords = await prisma.courseFaculty.findMany({
          where: {
            courseId,
            facultyId: {
              notIn: faculties,
            },
            
          },
          include:{
            faculty:true,
            course:true
          }
        });

        return remaningRecords;
      } catch (error) {
        throw error;
      } 
}

export const courseService ={
    createCourse,
    courseAssignToFaculty,
    deleteAssignedCourse
}