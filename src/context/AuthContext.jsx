import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();


let initialUser = localStorage.getItem('dataUser') ? JSON.parse(localStorage.getItem("dataUser")) : null;
let initialToken = localStorage.getItem('token') || null;
 


const AuthProvider = ({children})=>{
    const [user,setUser] = useState(initialUser);
    const [token,setToken] = useState(initialToken);
    const [isAuth, setIsAuth] = useState(false)
    const navigate = useNavigate()

    const handleAuth = (data)=>{
        console.log(data);
        let {user : userData,token : tokenData} = data;
        setUser(userData);
        setToken(tokenData)
        localStorage.setItem("dataUser",JSON.stringify(userData));
        localStorage.setItem("token",tokenData);
        //console.log(auth);
        //setIsAuth(true);
    }

    const logout = ()=>{
        setUser(null);
        setToken(null)
        localStorage.setItem("dataUser",null);
        localStorage.setItem("token",null);
        localStorage.clear();
        //setIsAuth(false);
        //navigate('auth/login');
    }

    useEffect(() => {
     if(user && token){
        setIsAuth(true);
     }else{
        setIsAuth(false);
     }
    }, [user,token])
    

    const data = {user,token,handleAuth,setUser,setToken,logout,isAuth};

    return <AuthContext.Provider value={data} >{children}</AuthContext.Provider>
}

export {AuthProvider};
export default AuthContext;