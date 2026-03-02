


export function getFilterData (filter) {


  // this helper for college user matalb ki college walo keliye 
    const {requiredExamCategory , requiredExamMarks, requiredStudentCast , requiredCourses , requiredCity} = filter


    

   let filterData = {}





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

  if(requiredCourses) {
    filterData.courses = requiredCourses
  }

  if(requiredCity) {
    filterData.city = requiredCity
  }


    return  filterData
}