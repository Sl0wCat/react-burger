import { FC, ReactElement, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

// Редьюсеры
import { logout } from "../../services/reducers/user";
import { getLogoutSuccess, getUser, useAppDispatch, useAppSelector } from "../../services/store";

export const LogoutPage: FC = (): ReactElement => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const user = useAppSelector(getUser);

    const logoutSuccess = useAppSelector(getLogoutSuccess);

    const [needRedirect, setNeedRedirect] = useState(false);

    useEffect(() => {
        if (!user)
            setNeedRedirect(true);
        dispatch(logout());
    }, [dispatch, navigate, user]);

    if (logoutSuccess || needRedirect) {
        localStorage.clear();
        return <Navigate to='/' />
    }
    return <></>;
}