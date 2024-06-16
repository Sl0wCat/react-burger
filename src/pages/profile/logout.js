import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/reducers/user";
import { getLogoutSuccess, getUser } from "../../services/store";

export function LogoutPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(getUser);

    const logoutSuccess = useSelector(getLogoutSuccess);

    useEffect(() => {
        if (!user) {
            return navigate(-1);
        }
        dispatch(logout());
    }, [dispatch, navigate, user]);
    
    if (logoutSuccess) {
        localStorage.clear();
    }
}