
export type ICourseCreate = {
    title:string,
    code:string,
    credits:number,
    preRequisiteCourses:{
        courseId:string
    }[]
}

export type ICourseResponse ={
    "id": "8ca4ae8e-d42a-4d6e-b3d7-38beb2fe156e",
    title: string,
    code: string,
    credits: number,
    preRequisite:  {
        courseId: string,
        preRequisiteId: string,
        preRequisite: {
            title: string,
            code: string,
            credits: number,
        }
    }[]
    preRequisiteFor: {}[]
}


export type ICourseFaculty ={
    // Define the structure of CourseFaculty if not already done in the Prisma schema
   
    courseId: string;
    facultyId: string;
  }