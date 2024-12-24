import { toast } from "react-toastify";
import { axiosApi } from "../../Config/apiConfig";

export async function submitPayRequest(data:any, navigate:any) {
  try {
    const response = await axiosApi.get(`/payment/pay?faclityId=${data.facilityId}`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
    });
    if (response.status !== 200) {
      toast.error(`${response.data.message}`);
    }
    return response.data; // Axios automatically parses JSON
  } catch (error: any) {
    if(error.code==="ERR_NETWORK"){
        navigate('/errors/error_503')
        return null;
    }
    else{
      console.log(error.response)
    }
  }
}