import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import styles from "./RecipeForm.module.css";
import { useForm } from 'react-hook-form';
import { axiosInstance, CATEGORY_URLS, RECIPES_URLS, TAGS_URLS } from '../../../../services/urls/urls';
import { toast } from 'react-toastify';

export default function RecipeForm() {
    const params = useParams();
    const [categories , setCategories] = useState();
    const [tags , setTags] = useState();
    const navigate = useNavigate()

    const{
      formState:{isSubmitting,errors},
      handleSubmit,
      register,
      setValue
    } = useForm({mode:"onChange"});

   const recipeId = params.recipeId;
   const isNewRecipe = recipeId == "new-recipe"
  useEffect(() => {
   const getTags = async() => {
      try {
        let response = await axiosInstance.get(TAGS_URLS.GET_TAGS);
        // console.log(response);
        setTags(response?.data)
        // console.log(tags);
        
      } catch (error) {
        console.log(error)
      }
    };

    let getCategories = async() => {
      try {
       let response = await axiosInstance.get(CATEGORY_URLS.GET_CATEGORIES,{params:{pageSize:10,pageNumber:1}});
      //  console.log(response.data.data);
   
       setCategories(response.data.data);
      //  console.log(categories);
      } catch (error) {
       console.log(error)
      }
     };
     (async() => {
    await  getTags();
    await getCategories();

  if( !isNewRecipe){

    let getRecipe = async() => {
    
      try {
        let response = await axiosInstance.get(RECIPES_URLS.GET_RECIPE(recipeId) );
         
        console.log(response);
        const recipe = response?.data
        setValue("name",recipe?.name);
        setValue("description",recipe?.description);
        setValue("price",recipe?.price);
        setValue("categoriesIds",recipe?.category[0].id);
        setValue("tagId",recipe?.tag.id);
        setValue("name",recipe?.name);
        // setValue("name",recipe?.name);


      } catch (error) {
  
        console.log(error);
        
      }
      
    
  }
   getRecipe()
  }
     })();
  
  }, [recipeId,setValue])

  
    
    const onSubmit = async (data) => {
      const formData = new FormData();
      formData.append("name", data?.name);
      formData.append("description", data?.description);
      formData.append("price", data?.price);
      formData.append("recipeImage", data?.recipeImage[0]);
      formData.append("tagId", data?.tagId);
      formData.append("categoriesIds", data?.categoriesIds);

      try {
        const response = await axiosInstance[isNewRecipe?"post" : "put"](isNewRecipe? RECIPES_URLS.POST_RECIPE : RECIPES_URLS.UPDATE_RECIPE(recipeId), formData);
        // console.log(data)
        toast.success('Recipe added successfuly');
        navigate("/dashboard/recipes");
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    useEffect(() => {
      const beforeUnloadHandler = (e) => {
        e.preventDefault();
      }
      window.addEventListener("beforeunload",beforeUnloadHandler);
      return () => window.removeEventListener("beforeunload",beforeUnloadHandler)

    }, [])
    
  return (
    <main>
        <header className={styles["header-wrapper"]}>
            <div className={styles["content-wrapper"]}>
                <h3>Fill the <span>Recipes</span>  !</h3>
                <p>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
            </div>
            <Link to="/dashboard/recipes" className={styles["btn-primary"]}>All Recipes
            <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M17.9927 7.70752C17.9927 8.01676 17.8783 8.28271 17.6494 8.50537L11.5542 14.5913C11.4367 14.7088 11.313 14.7954 11.1831 14.8511C11.0532 14.9067 10.9202 14.9346 10.7842 14.9346C10.4749 14.9346 10.2214 14.8356 10.0234 14.6377C9.82552 14.446 9.72656 14.2048 9.72656 13.9141C9.72656 13.7656 9.75749 13.6265 9.81934 13.4966C9.875 13.3667 9.95231 13.2523 10.0513 13.1533L12.1294 11.0566L15.5156 7.94873L15.8867 8.58887L12.6118 8.78369H1.46045C1.13883 8.78369 0.879069 8.68473 0.681152 8.48682C0.477051 8.2889 0.375 8.02913 0.375 7.70752C0.375 7.39209 0.477051 7.13542 0.681152 6.9375C0.879069 6.73958 1.13883 6.64063 1.46045 6.64063L12.6118 6.64062L15.8867 6.83545L15.5156 7.46631L12.1294 4.36768L10.0513 2.271C9.95231 2.17204 9.875 2.05762 9.81934 1.92773C9.75749 1.79785 9.72656 1.65869 9.72656 1.51025C9.72656 1.21956 9.82552 0.978353 10.0234 0.786621C10.2214 0.588704 10.4749 0.489746 10.7842 0.489746C11.0625 0.489746 11.3161 0.601074 11.5449 0.82373L17.6494 6.91895C17.8783 7.13542 17.9927 7.39827 17.9927 7.70752Z" fill="white"/>
            </svg>
            </Link>
        </header>
        <Form onSubmit={handleSubmit(onSubmit)} className={styles["form-wrapper"]}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">  
        <Form.Control type="text" placeholder="Recipe Name" 
        {...register("name",{required:"this field is required"})}
        />
      </Form.Group>
      {errors.name&&<span className='text-danger'>{errors?.name?.message}</span>}
      <Form.Select aria-label="Default select example" {...register("tagId",{required:"this field is required"})}>
      <option value="">tag</option>
      
      {tags?.map(tag => <option key={tag.id} value={tag.id}>{tag.name}</option>)}
      
    </Form.Select>
    {errors.tagId&&<span className='text-danger'>{errors?.tagId?.message}</span>}
    <Form.Group className="mb-3" itemType='number' controlId="exampleForm.ControlInput1">  
        <Form.Control type="number" placeholder="Price" {...register("price",{required:"this field is required",min:0})} />
      </Form.Group>
      {errors.price&&<span className='text-danger'>{errors?.price?.message}</span>}
      <Form.Select aria-label="Default select example" {...register("categoriesIds")}>
      <option value="">Category</option>
      {categories?.map(category => <option value={category.id} key={category.id}>{category.name}</option>)}
      
    </Form.Select>
    {/* {errors.email&&<span className='text-danger'>{errors.email.message}</span>} */}
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        
        <Form.Control as="textarea" rows={3} placeholder="Description" {...register("description",{required:"this field is required"})}/>
      </Form.Group>
      {errors.description &&<span className='text-danger'>{errors?.description?.message}</span>}
      <div>
        <input type='file' {...register("recipeImage")}/>
        {/* {errors.email&&<span className='text-danger'>{errors.email.message}</span>} */}
      </div>
      <div className={styles["actions-wrapper"]} >
        <Link to="/dashboard/recipes" type='button' className={styles["btn-primary1"]}>Cancel</Link>
        <button disabled={isSubmitting} className={styles["btn-primary"]}>
          {isSubmitting? "Saving ..." : "Save"}
        </button>
      </div>
      
    </Form>
    </main>
  )
}
