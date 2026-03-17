import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useApplicationStore } from "../storage/applicationStore";

export const useStudentApplication = () => {

    const  setApplications = useApplicationStore((state) => state.setApplication)

  

    const studentApplication = async () => {


        try {

            const response = await axios.get("http://localhost:8090/api/v1/student/home/user/applications",{
                withCredentials : true
            })


             if(response.data.success) {

            setApplications(response?.data?.applications)

            toast.success(response?.data?.message || "your applications")

            console.log(response.data);
            


        }
            
        } catch (error) {
            
            console.log(error.response.data);
            

             toast.error(error?.response?.data?.message || "try again to see applications")
            
        }
    }
return {studentApplication}
}
