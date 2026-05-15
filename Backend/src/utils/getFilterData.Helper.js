


export function getFilterData (filter) {


  // this helper for college user matalb ki college walo keliye 
    const {requiredExamCategory , requiredExamMarks, requiredStudentCast , requiredCourse , requiredCity , status} = filter


    

   let filterData = {}




   if(status) {
    filterData.status = status
   }

  if (requiredStudentCast) {
    filterData.castCategory = requiredStudentCast
  } 

  if (requiredExamCategory) {
    filterData.examCategory = requiredExamCategory
  } 

  // grater than aur equal marks finding 

  if (requiredExamMarks) {
    filterData.marks = { $gte : Number(requiredExamMarks)}
  } 



  // this part for student 

  if(requiredCourse) {
    filterData.courses = requiredCourse
  }

  if(requiredCity) {
    filterData.city = requiredCity
  }


    return  filterData
}  