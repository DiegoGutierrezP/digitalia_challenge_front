import axios from "../config/axios";

export const getAllRecibos = async (usuarioId, setRecibos, setLoading) => {
  try {
    setLoading(true);
    let res = await axios.get(`Recibos/GetAllRecibos/${usuarioId}`),
      json = await res.data;

    setRecibos(json.data);
  } catch (err) {
    console.log(err, err.response);
    setRecibos([]);
  } finally {
    setLoading(false);
  }
};

export const postCrearRecibo = async (form,setLoading,callbackAfterApi) => {
    try {
      setLoading(true);
      let res = await axios.post(`Recibos`,form),
        json = await res.data;

      callbackAfterApi('success',json.message)
      
    } catch (err) {
      console.log(err, err.response);
      callbackAfterApi('error',err?.response?.data?.message || 'Ocurrio un error')
    } finally {
      setLoading(false);
    }
  };


  export const generatePDFRecibo = async(idRecibo,setLoading)=>{
    try{
        setLoading(true);
        let res = await axios.get(`Recibos/generarPdf/${idRecibo}`,{
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/pdf'
            },
        }),
        data2 = await res.data;

        const url = window.URL.createObjectURL(new Blob([data2]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `recibo_${idRecibo}.pdf`); //or any other extension
            document.body.appendChild(link);
            link.click();
    }catch(err){
        console.log(err,err.response)
        //setResponse({type:"error",action:"cotizacionOP",open:true,content:JSON.stringify(err.response)})
    }finally{
        setLoading(false);
    }
}