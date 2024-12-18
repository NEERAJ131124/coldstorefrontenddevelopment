import { toast } from "react-toastify";
import { axiosApi } from "../../Config/apiConfig";

export const submitFacility =async (data:any,navigate:any,reset:any) => {
    try {
        const response = await axiosApi.post('/storagefacility/add', data,{
            headers: {  
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
        });
        if (response.status !== 201) {
          throw new Error(`Failed to add Facility: ${response.status}`);
        }
        else{
            reset();
            toast.success(response.data.message);
            return response.data; // Axios automatically parses JSON
        }
      } 
      catch (error: any) {
        console.log(error)
        toast.error(error.response.data.message)
      }
}

export const updateFacility =async (data:any,navigate:any,reset:any) => {
  try {
      const response = await axiosApi.put(`/storagefacility/${data._id}`, data,{
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
      });
      if (response.status !== 201) {
        throw new Error(`Failed to update Facility: ${response.status}`);
      }
      else{
          reset();
          toast.success(response.data.message);
          return response.data; // Axios automatically parses JSON
      }
    } 
    catch (error: any) {
      console.log(error)
      toast.error(error.response.data.message)    
    }
}

export const getAllFacility =async (navigate:any) => {
  try {
      const response = await axiosApi.get(`/storagefacility`,{
      });
      if (response.status !== 200) {
        throw new Error(`Failed to send OTP: ${response.status}`);
      }
  
      return response.data; // Axios automatically parses JSON
    } catch (error: any) {
      console.log(error);
      // toast.error(error.response.data.message);
    }
}

export const getFacility =async (navigate:any) => {
    try {
        const response = await axiosApi.get(`/storagefacility/get`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
        });
        if (response.status !== 200) {
          throw new Error(`Failed to send OTP: ${response.status}`);
        }
    
        return response.data; // Axios automatically parses JSON
      } catch (error: any) {
        console.log(error);
        // toast.error(error.response.data.message);
      }
}

export const getFacilityDetails =async (id:any,navigate:any) => {
  try {
      const response = await axiosApi.get(`/storagefacility/${id}`,{
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
      });
      if (response.status !== 200) {
        throw new Error(`Failed to send OTP: ${response.status}`);
      }
  
      return response.data; // Axios automatically parses JSON
    } catch (error: any) {
      console.log(error);
      // toast.error(error.response.data.message);
    }
}

export async function getStorageType() {
    try {
      const response = await axiosApi.get('/storagetype', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (response.status !== 201 && response.status !==200) {
        console.log(response.data.message)
      }
   
      return response.data; 
    } catch (error: any) {
        if(error.code==="ERR_NETWORK"){
            return null;
        }
        else{
            console.error('Error fetching :', error);
        }
    }
}
  
export const deleteFacility =async (id:any,navigate:any) => {
  try {
      const response = await axiosApi.delete(`/storagefacility/${id}`,{
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
      });
      if (response.status !== 200) {
        throw new Error(`Failed to send OTP: ${response.status}`);
      }
      return response.data; // Axios automatically parses JSON
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
}