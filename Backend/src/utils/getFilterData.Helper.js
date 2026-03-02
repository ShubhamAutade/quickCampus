


export function getFilterData (filter) {


  // this helper for college user matalb ki college walo keliye 
    const {requiredExamCategory , requiredExamMarks, requiredStudentCast} = filter


    // this for students 

    const {requiredCourses , requiredCity}  = filter

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
    filter.courses = requiredCourses
  }

  if(requiredCity) {
    filter.city = requiredCity
  }
  

    return  filterData
}