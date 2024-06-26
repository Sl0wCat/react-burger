import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, FC } from 'react';

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
import Protected from '../ProtectedRoute/ProtectedRoute';

import { checkUserAuth } from '../../services/reducers/user';
import { useAppDispatch } from '../../services/store';

interface LocationState {
    backgroundLocation?: string;
}

export const App: FC = () => {
  
  const location = useLocation();
  const state = location.state as LocationState;

  let dispatch = useAppDispatch();
  useEffect(() => {
      dispatch(checkUserAuth());
  }, []);

  return (
      <>
          <Routes location={state?.backgroundLocation || location}>
              <Route index element={<HomePage />}/>
              <Route path="/login" element={<Protected onlyUnAuth component={<LoginPage/>} />} />
              <Route path="/register" element={<Protected onlyUnAuth component={<RegisterPage/>} />} />
              <Route path="/forgot-password" element={<Protected onlyUnAuth component={<ForgotPasswordPage/>} />} />
              <Route path="/reset-password" element={<Protected onlyUnAuth component={<ResetPasswordPage/>} />} />
              <Route path="/profile" element={<Protected onlyUnAuth={false} component={<ProfilePage/>} />} >
                  <Route index element={<Protected onlyUnAuth={false} component={<ProfileForm/>} />}/>
                  <Route path='orders' element={<Protected onlyUnAuth={false} component={<OrdersPage/>} />}/>
                  
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