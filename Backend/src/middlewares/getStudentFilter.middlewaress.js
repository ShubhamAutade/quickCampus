

export const getStudentFilter = async (req , res, next )  => {
    try {

        // get filter


      const rowFilter = req.cookies.studentFilter

       const  filter = rowFilter ? JSON.parse(rowFilter) : {}


       req.filter = filter

        next()
        
    } catch (error) {
        return res.status(500).json({
            success : false ,
            message : `something wrong to getFilter`
        })
    }
}