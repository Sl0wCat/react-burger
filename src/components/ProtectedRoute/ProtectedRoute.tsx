import { Navigate, useLocation } from "react-router-dom";
import { getAuthChecked, getUser, useAppSelector } from "../../services/store";
import { FC } from "react";

interface IProtected {
  onlyUnAuth: boolean,
  component: JSX.Element
}

const Protected: FC<IProtected> = ({ onlyUnAuth, component }) => {
  // isAuthChecked это флаг, показывающий что проверка токена произведена
  const isAuthChecked = useAppSelector(getAuthChecked);
  const user = useAppSelector(getUser);
  const location = useLocation();

  if (!isAuthChecked) {
    // Запрос еще выполняется
    // Выводим прелоадер в ПР
    return <p>loading...</p>;
  }

  if (onlyUnAuth && user) {
    // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
    // Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
};

export default Protected;
