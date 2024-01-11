import { OfferedCourseSetion, PrismaClient,Prisma } from "@prisma/client";
import ApiError from "../../../errors/ApiError";
import { IFilters, IPagination } from "../../../interfaces/paginationType";
import { IGenericResponse } from "../../../shared/constants";
import { calculatePagination } from "../../../helpers/paginationCalculate";
import { offeredCourseSectionSearchableFields } from "./constants";

const prisma =new PrismaClient();

interface ArbitraryData {
    [key: string]: any; // Allows any string key
  }

const create=async(payload:OfferedCourseSetion):Promise<OfferedCourseSetion>=>{
    const ifOfferedCourseExist = await prisma.offeredCourse.findFirst({
        where:{
            id:payload.offeredCourseId
        }
    })
    if(!ifOfferedCourseExist){
        throw new ApiError(400,'Selected offered course not exist')
    }
    payload.semesterRegistrationId = ifOfferedCourseExist.semesterRegistrationId

    const response =await prisma.offeredCourseSetion.create({
        data:payload
    })
    return response
}

const offeredCourseSections = async(paginationOptions:IPagination,filter:IFilters):Promise<IGenericResponse<OfferedCourseSetion[]> | null>=>{
    const { page, limit, sortBy, sortOrder } = paginationOptions;
    const { searchTerm, ...filters } = filter;
  
 
    const paginate = calculatePagination({ page, limit, sortBy, sortOrder });
  
    const andCondition = [];
  
    // if (searchTerm) {
    //   andCondition.push({
    //     OR: offeredCourseSectionSearchableFields.map((item) => {
    //       return {
    //         [item]: {
    //           contains: searchTerm,
    //           mode: "insensitive",
    //         },
    //       };
    //     }),
    //   });
    // }


    //   if (searchTerm) {
    //   andCondition.push({
    //     OR: offeredCourseSectionSearchableFields.map((item) => {
    //       return {
    //         [item]: {
    //             ...(typeof searchTerm === 'string'
    //               ? { contains: searchTerm, mode: 'insensitive' }
    //               : { equalTo: searchTerm }),
    //           },
    //       };
    //     }),
    //   });
    // }


    
  
    if (searchTerm) {
        andCondition.push({
          OR: offeredCourseSectionSearchableFields.map((item) => {
            const condition:ArbitraryData= {};

      if (item != 'maxCapacity'  ) {
        condition[item] = {
          contains: searchTerm,
          mode: 'insensitive',
        };
      } else if ( item === 'maxCapacity' && isNaN(parseInt(searchTerm))) {

        condition[item] = {
            equals: parseInt('0000000000000000000'),
           
          };
       
      }else{
        condition[item] = {
            equals: parseInt(searchTerm),
          };
      }

      return condition;
          }),
        });
      }

    if (Object.keys(filters).length > 0) {
      andCondition.push({
        AND: Object.keys(filters).map((field) => ({
          [field]: {
            equals: (filters as any)[field],
          },
        })),
      });
    }
   
    
    const finalConditions: Prisma.OfferedCourseSetionWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};
  
  
    const response = await prisma.offeredCourseSetion.findMany({
      where: finalConditions,
      take: paginate.limit,
      skip: paginate.skip,
      orderBy:
        paginate.sortBy && paginate.sortOrder
          ? { [paginate.sortBy]: paginate.sortOrder }
          : { createdAt: "asc" },
    });
    const total = await prisma.offeredCourseSetion.count();
  
    return {
      meta: {
        page: paginate.page,
        limit: paginate.limit,
        total,
      },
      data: response,
    };
  }
  
  const offeredCourseSection = async(id:string)=>{
    const response = await prisma.offeredCourseSetion.findFirst({
      where:{
        id:id
      }
    })
    return response
  }
  
  const offeredCourseSectionUpdate = async(id:string,payload:Partial<OfferedCourseSetion>):Promise<OfferedCourseSetion>=>{
    const response = await prisma.offeredCourseSetion.update({
      where:{
        id:id
      },
      data:payload
    })
    return response
  }
  
  const offeredCourseSectionDelete = async(id:string)=>{
    const response = await prisma.offeredCourseSetion.delete({
      where:{
        id:id
      }
    })
    return response
  }


export const offeredCourseSectionService = {
    create,
    offeredCourseSection,
    offeredCourseSections,
    offeredCourseSectionUpdate,
    offeredCourseSectionDelete
}