import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Header from '../../../shared/components/header/Header';
import noData from '../../../../assets/images/no-data.svg';
import axios from 'axios';
import NoData from '../../../shared/components/noData/NoData';
import { axiosInstance, imgBaseURL, RECIPES_URLS } from '../../../../services/urls/urls';
import DeleteConfirmation from '../../../shared/components/deleteConfirmation/DeleteConfirmation';
import { Link } from 'react-router-dom';

export default function () {
  const [recipesList, setRecipesList] = useState([]);
  const [selectedId, setSelectedId] = useState(0)

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setSelectedId(id)
    setShow(true)};

    let getRecipes = async() => {
      try {
       let response = await axiosInstance.get(RECIPES_URLS.GET_RECIPES,{params:{pageSize:10,pageNumber:1}}
         );
       console.log(response.data.data)
   
       setRecipesList(response.data.data);
      } catch (error) {
       console.log(error)
      }
     };

     let deleteRecipe = () => {
      try {
        let response = axiosInstance.delete(RECIPES_URLS.DELETE_RECIPE(selectedId)
      );
        toast.success('Item deleted successfuly');
        getRecipes()
      } catch (error) {
  
        console.log(error);
        toast.error(error.response.data.message);
      }
      
      handleClose()
    }

     useEffect(() => {
      getRecipes()
      
    }, []);
  return (
    <>
     
    <Header title={'Recipes Items'} 
    description={'You can now add your items that any user can order it from the Application and you can edit'}/>
    
      <DeleteConfirmation
      deleteItem={'Recipe'}
      deleteFun={deleteRecipe}
      show={show}
      handleClose={handleClose}
      />
    <div className=' d-flex justify-content-between p-4'>
      <h5>Recipes Table Details</h5>
      <Link to="/dashboard/recipes/new-recipe" className='btn btn-success'>Add New Recipe</Link>
    </div>
    <div className='p-4'>
      {recipesList.length > 0 ? (
      <table className="table table-striped">
      <thead >
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Image</th>
          <th scope="col">Price</th>
          <th scope="col">Description</th>
          <th scope="col">Tag</th>
          <th scope="col">category</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {recipesList.map(recipe => 
          <tr key={recipe.id}>
          <td>{recipe.name}</td>
          <td className='img-table'>
            {recipe.imagePath ? <img className='w-25 h-25' src={`${imgBaseURL}/${recipe.imagePath}`} alt=''/> : <img className='w-25' src={noData}/>}
          </td>
          <td>{recipe.price}</td>
          <td>{recipe.description}</td>
          <td>{recipe.tag.name}</td>
          <td>{recipe.category[0]?.name}</td>
          
          <td>
          <i className="fa-solid fa-trash mx-3 text-success" onClick={()=> handleShow(recipe.id)} ></i>
          <Link to={`/dashboard/recipes/${recipe?.id}`}><i className="fa-regular fa-pen-to-square text-success"></i></Link>
          </td>
        </tr>
        )}
        
      </tbody>
        </table> ): (<NoData/>)
      
    }
    
    </div>
    

    </>
    
  )
}
