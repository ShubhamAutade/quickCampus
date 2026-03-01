


export function getFilterData (filter) {


    const {requiredExamCategory , requiredExamMarks, requiredStudentCast} = filter

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

    return  filterData
}