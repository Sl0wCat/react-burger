import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/reducers/user";

export function LogoutPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.user.user);

    const logoutSuccess = useSelector(state => state.user.logoutSuccess);

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