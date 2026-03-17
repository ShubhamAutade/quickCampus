import axios from "axios"
import {useNavigate} from "react-router-dom"
import {useLoginUserStore} from "../storage/loginUserStore"
import toast from "react-hot-toast"



export const useLogout = () => {

const setUser = useLoginUserStore((state) => state.setUser)

const navigate = useNavigate()

const logout = async () => {
    try {

        const response  = await axios.get("http://localhost:8090/api/v1/auth/logout", {
            withCredentials : true
        })

        if(response.data.success) {

            setUser(null)

            toast.success(response?.data?.message || "Logout successfully")


        }
        
    } catch (err) {

        setUser(null)

        navigate('/login')

        toast.error(response?.data?.message || "logOut with some errors")
        
    }
}

return {logout}


}

