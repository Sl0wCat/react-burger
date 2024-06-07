import { Routes, Route, useLocation } from 'react-router-dom';

import { 
    HomePage,
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
    ResetPasswordPage,
    NotFound404,
    IngredientPage,
    ProfilePage,
    OrdersPage,
    ProfileForm,
    LogoutPage,
    OrdersListPage,
  } from '../../pages';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

import { OnlyAuth, OnlyUnAuth } from '../ProtectedRoute/ProtectedRoute';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { checkUserAuth } from '../../services/reducers/user';

export function App() {
    const location = useLocation();
    const state = location.state;

    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(checkUserAuth());
    }, []);

    return (
        <>
            <Routes location={state?.backgroundLocation || location}>
                <Route index element={<HomePage />}/>
                <Route path="/login" element={<OnlyUnAuth component={<LoginPage/>} />} />
                <Route path="/register" element={<OnlyUnAuth component={<RegisterPage/>} />} />
                <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPasswordPage/>} />} />
                <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPasswordPage/>} />} />
                <Route path="/profile" element={<OnlyAuth component={<ProfilePage/>} />} >
                    <Route index element={<OnlyAuth component={<ProfileForm />} />}/>
                    <Route path='orders' element={<OnlyAuth component={<OrdersPage/>} />}/>
                    
                </Route>
                <Route path="/logout" element={<LogoutPage/>}/>
                <Route path="/ingredients/:id" element={<IngredientPage />} />
                <Route path="/orders" element={<OrdersListPage/>}/>
                <Route path="*" element={<NotFound404 />} />
            
            </Routes>

            {state?.backgroundLocation && (
                <Routes>
                    <Route path="/ingredients/:id" element={
                        <Modal header="Детали ингредиента"> 
                            <IngredientDetails />
                        </Modal>
                    } />
                </Routes>
            )}
        </>
            
            
            
    )
}