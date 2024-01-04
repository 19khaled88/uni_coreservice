import { SemesterRegistration ,Prisma,PrismaClient, SemesterRegistrationStatus} from "@prisma/client";
import ApiError from "../../../errors/ApiError";
import { IFilters, IPagination } from "../../../interfaces/paginationType";
import { calculatePagination } from "../../../helpers/paginationCalculate";
import { registerdSemesterSearchableFields, semesterUpdatingMapping } from "./constants";
import { IGenericResponse } from "../../../shared/constants";
import moment from 'moment'
import { semester_register_response } from "./interface";
import { semesterRegisterController } from "./controller";

const prisma = new PrismaClient()


const registerSemester=async(payload:SemesterRegistration)=>{

    const isAnySemesterUpcomingOrOngoing = await prisma.semesterRegistration.findFirst({
        where:{
            OR:[
                {status:SemesterRegistrationStatus.ONGOING},
                {status:SemesterRegistrationStatus.UPCOMMING}
            ]
        }
    });

    if(isAnySemesterUpcomingOrOngoing){
        throw new ApiError(400,`This semester already with ${isAnySemesterUpcomingOrOngoing.status} status`)
    }

    const response = await prisma.semesterRegistration.create({
        data:payload
    })
    return response 
}

const getAllRegisteredSemester=async(paginationOptions:IPagination,filter:IFilters):Promise<IGenericResponse<semester_register_response[]> | null>=>{
    const { page, limit, sortBy, sortOrder } = paginationOptions;
    const { searchTerm, ...filters } = filter;

    const paginate = calculatePagination({ page, limit, sortBy, sortOrder });

    const andCondition = [];

    if (searchTerm) {
      andCondition.push({
        OR: registerdSemesterSearchableFields.map((item) => {
          return {
            [item]: {
              contains: searchTerm,
              mode: "insensitive",
            },
          };
        }),
      });
    }
  
    if (Object.keys(filters).length > 0) {
      andCondition.push({
        AND: Object.keys(filters).map((field) => ({
          [field]: {
              equals:(filters as any)[field],
          },
        })),
      });
    }

    const finalConditions: Prisma.SemesterRegistrationWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

    const res = await prisma.semesterRegistration.findMany({
        where: finalConditions,
        include:{
            academicSemester:true
        },
        take: paginate.limit,
        skip: paginate.skip,
        orderBy:
          paginate.sortBy && paginate.sortOrder
            ? { [paginate.sortBy]: paginate.sortOrder }
            : { createdAt: "asc" },
      });

    const total = await prisma.semesterRegistration.count();

    const formattedResult = res.map(item => ({
        ...item,
        // startDate: new Date(item.startDate).toLocaleDateString(), // Adjust the formatting as needed
        // endDate:new Date(item.endDate).toLocaleString(),
        // createdAt:new Date(item.createdAt).toLocaleString(),
        // updatedAt:new Date(item.updatedAt).toLocaleString()
        startDate:moment(item.startDate).format('MMMM Do YYYY, h:mm:ss a'),
        endDate:moment(item.endDate).format('MMMM Do YYYY, h:mm:ss a'),
        createdAt:moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a'),
        updatedAt:moment(item.updatedAt).format('MMMM Do YYYY, h:mm:ss a')
      }));
      

    return {
    meta: {
        page: paginate.page,
        limit: paginate.limit,
        total,
    },
    data: formattedResult,
    };
}

const deleteRegistedSemester=async(id:string):Promise<SemesterRegistration>=>{
    const ifExist = await prisma.semesterRegistration.findFirst({
        where:{
            id:id
        }
    })
    if(!ifExist){
        throw new ApiError(400,'This semester not registerd yet')
    }
    const response = await prisma.semesterRegistration.delete({
        where:{
            id:id 
        }
    })
    return response
}

const updateRegistedSemester=async(id:string,payload:Partial<SemesterRegistration>):Promise<SemesterRegistration>=>{
    
    const ifExist = await prisma.semesterRegistration.findFirst({
        where:{
            id:id
        }
    })
    if(!ifExist){
        throw new ApiError(400,'This semester not registerd yet')
    }
   
   if(payload.status && semesterUpdatingMapping[ifExist.status] !== payload.status){
    throw new ApiError(400,'Semester status must be consistant, Like: UPCOMMING >> ONGOING >> ENDED')
   }
    

    // const isAnySemesterUpcomingOrOngoing = await prisma.semesterRegistration.findFirst({
    //     where:{
    //         AND:[
    //             {
    //                 id:id
    //             }
    //         ],
    //         OR:[
    //             {status:SemesterRegistrationStatus.ONGOING},
    //             {status:SemesterRegistrationStatus.UPCOMMING}
    //         ]
    //     }
    // });
  

    // if(isAnySemesterUpcomingOrOngoing){
    //     throw new ApiError(400,`Semester cannot be updted with ${isAnySemesterUpcomingOrOngoing.status} status`)
    // }


    const response = await prisma.semesterRegistration.update({
        where:{
            id:id 
        },
        data:payload,
        include:{
            academicSemester:true
        }
    })
    return response
}

export const semesterRegistrationService = {
    registerSemester,
    getAllRegisteredSemester,
    deleteRegistedSemester,
    updateRegistedSemester
}