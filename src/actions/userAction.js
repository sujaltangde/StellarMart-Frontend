import axios from 'axios'
import { loginRequest, loginSuccess, loginFail, registerRequest, registerSuccess, registerFail, clearErrors, setIsLoginFalse, setIsLoginTrue, getMeRequest, getMeSuccess, getMeFail, updateProfileRequest, updateProfileSuccess, updateProfileFail, changePasswordRequest, changePasswordSuccess, changePasswordFail, allUsersRequest, allUsersSuccess, allUsersFail, userDetailsRequest, userDetailsSuccess, userDetailsFail, userUpdatedRequest, userUpdatedSuccess, userUpdatedFail, userDeleteRequest, userDeleteSuccess, userDeleteFail} from '../slices/UserSlice'
import { toast } from 'react-toastify';


export const login = (email, password) => async (dispatch) => {
    try {

        dispatch(loginRequest())

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };


        const { data } = await axios.post(`https://stellarmart-b.onrender.com/api/v1/login`, { email, password }, config)

        localStorage.setItem('token', data.token)

        dispatch(loginSuccess(data))
        toast.success("Login Successful !");
    }
    catch (err) {
        dispatch(loginFail(err.response.data.message));
        console.log(err.response.data.message)
        toast.error(err.response.data.message)
    }
}






export const register = (userData) => async (dispatch) => {
    try {

        dispatch(registerRequest())

        const { data } = await axios.post(`https://stellarmart-b.onrender.com/api/v1/register`, userData)

        localStorage.setItem('token', data.token)

        dispatch(registerSuccess(data));
        toast.success("Register Successful !");

    } catch (err) {
        dispatch(registerFail(err.response.data.message))
        if (err.response.data.message.includes("duplicate")) {
            toast.error("User already exists")
        } else {
            toast.error(err.response.data.message)
        }

    }
}




export const isLogin = () => async (dispatch) => {
    try {

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const { data } = await axios.get(`https://stellarmart-b.onrender.com/api/v1/isLogin`, config);

        dispatch(setIsLoginTrue())



    } catch (err) {
        dispatch(setIsLoginFalse())
    }
}


export const me = () => async (dispatch) => {
    try {

        dispatch(getMeRequest());

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const { data } = await axios.get("https://stellarmart-b.onrender.com/api/v1/me", config)

        dispatch(getMeSuccess(data.user));

    } catch (err) {
        dispatch(getMeFail(err.response.data.message));
    }
}


export const updateMe = (userData) => async (dispatch) => {

    try {
        dispatch(updateProfileRequest());

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const { data } = await axios.put("https://stellarmart-b.onrender.com/api/v1/me/update", userData, config);

        dispatch(updateProfileSuccess(data));
        dispatch(getMeSuccess(data.user))
        toast.success("Profile Updated Successfully !")
    } catch (err) {
        dispatch(updateProfileFail(err.response.data.message));
        toast.error(err.response.data.message)
    }

}


export const changePassword = (passData) => async (dispatch) => {
    try{    

        dispatch(changePasswordRequest()) ;

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const {data} = await axios.put("https://stellarmart-b.onrender.com/api/v1/password/update",passData,config) ;

        dispatch(changePasswordSuccess()) ;

        toast.success("Password Updated Successfully !")

    }catch(err){
        dispatch(changePasswordFail(err.response.data.message))
        toast.error(err.response.data.message) ;
    }
}


// Get ALl Users --admin
export const getAllUsers = () => async (dispatch) => {
    try{
        dispatch(allUsersRequest())
        
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const {data} = await axios.get("https://stellarmart-b.onrender.com/api/v1/admin/users",config) ;

        dispatch(allUsersSuccess(data.AllUsers))

    }catch(err){
        dispatch(allUsersFail(err.response.data.message))
    }
}


// Get User Details --admin
export const getUserDetails = (id) => async (dispatch) => {
    try{
        dispatch(userDetailsRequest()) ;

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const {data} = await axios.get(`https://stellarmart-b.onrender.com/api/v1/admin/user/${id}`,config)

        dispatch(userDetailsSuccess(data.user)) ;

    }catch(err){
        dispatch(userDetailsFail(err.response.data.message))
    }
}


// Update User -- admin
export const updateUser = (id, newdata) => async (dispatch) => {
    try{
        dispatch(userUpdatedRequest())

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const {data} = await axios.put(`https://stellarmart-b.onrender.com/api/v1/admin/user/${id}`, newdata, config) ;

        dispatch(userUpdatedSuccess(data.success)) ;
        dispatch(getUserDetails(id))
        toast.success(data.message) ;

    }catch(err){
        dispatch(userUpdatedFail(err.response.data.message)) ;
        toast.error(err.response.data.message)
    }
}


// Delete User -- admin
export const deleteUser = (id) => async (dispatch) => {
    try{
        dispatch(userDeleteRequest())

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const {data} = await axios.delete(`https://stellarmart-b.onrender.com/api/v1/admin/user/${id}`, config) ;

        dispatch(userDeleteSuccess(data.success)) ;
        toast.success("User Deleted Successfully !") ;
        dispatch(getAllUsers())

    }catch(err){
        dispatch(userDeleteFail(err.response.data.message)) ;
        toast.error(err.response.data.message)
    }
}




// Clearing Errors
export const clearError = () => async (dispatch) => {
    dispatch(clearErrors())
}