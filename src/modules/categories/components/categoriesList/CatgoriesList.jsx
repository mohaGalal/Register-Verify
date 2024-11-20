import React, { useEffect, useState } from 'react'
import Header from '../../../shared/components/header/Header'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import noData from '../../../../assets/images/no-data.svg';
import { toast } from 'react-toastify'
import { axiosInstance, CATEGORY_URLS } from '../../../../services/urls/urls';
import DeleteConfirmation from '../../../shared/components/deleteConfirmation/DeleteConfirmation';
import NoData from '../../../shared/components/noData/NoData';
import { useForm } from 'react-hook-form';
import Dropdown from 'react-bootstrap/Dropdown';

export default function CatgoriesList() {
  let {register,
    formState:{errors},
    handleSubmit
  } = useForm();


  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedId, setSelectedId] = useState(0);
  const [updateSelectedId, setUpdateSelectedId] = useState(0)
  const [updateSelectedName, setUpdateSelectedName] = useState('');

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setSelectedId(id);
    setShow(true)};

    const [showAdd, setShowAdd] = useState(false);

    const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = (id) => setShowAdd(true);

  const [showUpdate, setShowUpdate] = useState(false);

  const handleCloseUpdate = () => setShowUpdate(false);

const handleShowUpdate = (id, name) => {
  setUpdateSelectedId(id);
  setUpdateSelectedName(name);
  setShowUpdate(true);
};

  let getCategories = async() => {
   try {
    let response = await axiosInstance.get(CATEGORY_URLS.GET_CATEGORIES,{params:{pageSize:10,pageNumber:1}});
    console.log(response.data.data)

    setCategoriesList(response.data.data);
   } catch (error) {
    console.log(error)
   }
  };

  let onSubmit = async(data) => {
    try {
     let response = await axiosInstance.post(CATEGORY_URLS.POST_CATEGORY,
      data
     );
     console.log(response.data.data)
 
     toast.success('category added successfuly');
     getCategories();
     handleCloseAdd(); 
    } catch (error) {
    
     toast.error(error.response.data.message)
    }
   };
   

   let updateCategory = (newData) => {
    
      try {
        let response = axiosInstance.put(CATEGORY_URLS.UPDATE_CATEGORy(updateSelectedId),
        newData
        );
        toast.success('Item Updated successfuly');
        getCategories();
        console.log(newData);
      } catch (error) {
  
        console.log(error);
        toast.error(error.response.data.message);
      }
      
      handleCloseUpdate()
    
  }

  let deletCategory = () => {
    try {
      let response = axiosInstance.delete(CATEGORY_URLS.DELETE_CATEGORy(selectedId)
      );
      toast.success('Item deleted successfuly');
      getCategories();
    } catch (error) {

      console.log(error);
      toast.error(error.response.data.message);
    }
    
    handleClose()
  }

  useEffect(() => {
    getCategories()
    
  }, [])
  
  return (
    <>
    <Header title={'Categories items'} 
    description={'You can now add your items that any user can order it from the Application and you can edit'}/>
    

      <DeleteConfirmation 
      deleteItem={'category'}
      deleteFun={deletCategory}
      show={show}
      handleClose={handleClose}
      />
      <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div >
          <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group mb-2">
              
             <input
              type="text"
              className="form-control"
              placeholder="Category Name"
              aria-label="name"
               aria-describedby="basic-addon1"
               {...register('name',{
                required: 'Name is required'
                
               })}
               />
              
             </div>
             {errors.name &&<span className='text-danger'>{errors.name.message}</span>}
               <button className='btn btn-success w-100 my-2'>Save</button>
            </form>
          </div>
          
        </Modal.Body>
        
      </Modal>

      <Modal show={showUpdate} onHide={handleCloseUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Update Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div >
          <form onSubmit={handleSubmit(updateCategory)}>
              <div className="input-group mb-2">
              
             <input
              type="text"
              className="form-control"
              placeholder="Category Name"
              aria-label="name"
              defaultValue={updateSelectedName}
              onChange={(e) =>{setUpdateSelectedName({...updateSelectedName,name :e.target.value})}}
               aria-describedby="basic-addon1"
               {...register('name',{
                required: 'Name is required'
                
               })}
               />
              
             </div>
             {errors.name &&<span className='text-danger'>{errors.name.message}</span>}
               <button className='btn btn-success w-100 my-2'>Save</button>
            </form>
          </div>
          
        </Modal.Body>
        
      </Modal>
    <div className=' d-flex justify-content-between p-4'>
      <h5>Categories Table Details</h5>
      <button className='btn btn-success' onClick={handleShowAdd}>Add New Category</button>
    </div>
    <div className='p-4'>
    {categoriesList.length > 0 ? (
    <table className=" table table-striped">
    <thead >
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Description</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
      {categoriesList.map(category => 
        <tr key={category.id}>
        <td>{category.name}</td>
        <td>{category.creationDate}</td>
        <td className='cred-icons'>
        <Dropdown>
      <Dropdown.Toggle  id="dropdown-basic">
        ...
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">
         <i className="fa-solid fa-trash mx-3 text-success" onClick={()=> handleShow(category.id)}></i>
         <span>delete</span>
         </Dropdown.Item>
        <Dropdown.Item href="#/action-2">
        <i className="fa-regular fa-pen-to-square mx-3 text-success"  onClick={() => handleShowUpdate(category.id, category.name)}></i>
        <span>edit</span>
        </Dropdown.Item>
        {/* <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
      </Dropdown.Menu>
    </Dropdown>
    
        </td>
      </tr>
      )}
      
    </tbody>
      </table>) : (<NoData/>) }
    
    </div>
    

    </>
  )
}


