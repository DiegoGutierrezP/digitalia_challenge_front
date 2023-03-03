import axios from "../config/axios";

export const login = async (form,setLoading,callbackLogin) => {
  try {
    setLoading(true);
    let res = await axios.post(`Auth/Login`,form),
      json = await res.data;

    //console.log(json);

    callbackLogin('success',json.data);

  } catch (err) {
    console.log(err, err.response);
    callbackLogin('error',err?.response?.data?.message || 'Ocurrio un error');
  }finally{
    setLoading(false);
}
};


export const register = async (form,setLoading,fnCallback) => {
    try {
        setLoading(true);
      let res = await axios.post(`Auth/RegistrarUsuario`,form),
        json = await res.data;
  
      //console.log(json)
      fnCallback('success',json);
    } catch (err) {
      console.log(err, err.response);
      fnCallback('error',err?.response?.data?.message || 'Ocurrio un error');
    }finally{
        setLoading(false);
    }
  };

