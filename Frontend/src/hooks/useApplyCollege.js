import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"

function useApplyCollege() {


    const [loading, setLoading] = useState(false)

    const submitApplication = async (collegeId, course) => {

        setLoading(true)

        try {

            const res = await axios.post(`http://localhost:8090/api/v1/student/home/${collegeId}/apply`,
                {
                    courseName: course
                },

                {
                    withCredentials: true
                }
            )

            toast.success("applied successfully ")

            return true


        } catch (err) {
   toast.error(err.response?.data?.message || "something Wrong")

   return false

        }

        finally {
            setLoading(false)
        }

       
    }

    return {submitApplication , loading}


}

export default useApplyCollege