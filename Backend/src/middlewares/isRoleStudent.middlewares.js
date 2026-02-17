
 export const isRoleStudent = async (req , res , next) => {


    try {

        // get role from req

        const role = req.user.role

        if(!role) {

            return res.status(401).json({
                success : false ,
                message : `role is empty please login and try again `
            })
        }


        // check role  === "STUDENT"
        if(role !== "STUDENT") {

            return res.status(401).json({
                success : false,
                message : `your role is not a student `
            })
        }
        

        // is all good 

        next()

    } catch (error) {

        return res.status(501).json({
            success : false,
            message : `server problem in isRoleStudent.middleware.js error = ${error}`
        })
        
    }
}
