import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectHomePage = ({children}) => {
        const {user} = useSelector(store => store.auth);
        const navigate = useNavigate();

        useEffect(() => {
            if(user==null){
                navigate("/");
            }
        },[]);


        return (
            <>
            {children}
            </>
        )
}

export default ProtectHomePage;