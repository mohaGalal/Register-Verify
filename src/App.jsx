import { useEffect, useState } from 'react';
import {  createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthLayout from './modules/shared/components/AuthLayout/AuthLayout';
import Login from './modules/authentication/components/login/Login';
import Registeration from './modules/authentication/components/registeration/Registeration';
import ForgetPass from './modules/authentication/components/forgetPass/ForgetPass';
import ResetPass from './modules/authentication/components/resetPass/ResetPass'
import './App.css';
import NotFound from './modules/shared/components/notFound/NotFound';
import MasterLayout from './modules/shared/components/MasterLayout/MasterLayout';
import Dashboard from './modules/dashboard/components/Dashboard/Dashboard';
import RecipesList from './modules/recipes/components/recipesList/RecipesList';
import RecipeData from './modules/recipes/components/recipeData/RecipeData';
import CatgoriesList from './modules/categories/components/categoriesList/CatgoriesList';
import CategoryData from './modules/categories/components/categoryData/CategoryData';
import UsersList from './modules/users/components/usersList/UsersList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';
import ProtectedRoute from './modules/shared/components/ProtectedRoute/ProtectedRoute';
import RecipeForm from './modules/recipes/components/RecipeForm/RecipeForm';
import Verify from './modules/authentication/components/Verify/Verify';

function App() {

const [loginData, setLoginData] = useState(null);
let saveLoginData = () =>{
  let decodedToken = localStorage.getItem("token");
  let encodedToken = jwtDecode(decodedToken);
  setLoginData(encodedToken)
}
useEffect(() => {
  if(localStorage.getItem('token'))
    saveLoginData()

}, [])


  const routes = createBrowserRouter([
    {
      path: '',
      element:<AuthLayout/>,
      errorElement:<NotFound/>,
      children: [
        {index:true, element:<Login saveLoginData={saveLoginData}/>},
        {path:'login',element:<Login saveLoginData={saveLoginData}/>},
        {path:'register',element:<Registeration/>},
        {path:'forget-password',element:<ForgetPass/>},
        {path:'reset-password',element:<ResetPass/>},
        {path:'verify',element:<Verify/>},
        
      ]
    },{
      path: 'dashboard',
      element:
      <ProtectedRoute loginData={loginData}>
        <MasterLayout loginData={loginData}/>
      </ProtectedRoute>,
      errorElement:<NotFound/>,
      children: [
        {index:true, element:<Dashboard loginData={loginData}/>},
        {path:'recipes',element:<RecipesList loginData={loginData}/>},
        {path:'recipes/new-recipe',element:<RecipeForm/>},
        {path:'recipes/:recipeId',element: <RecipeForm/>},

        {path:'recipe-data',element:<RecipeData/>},
        {path:'categories',element:<CatgoriesList/>},
        {path:'category-data',element:<CategoryData/>},
        {path:'users',element:<UsersList />},
      ]

    }
  ])
  

  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App
