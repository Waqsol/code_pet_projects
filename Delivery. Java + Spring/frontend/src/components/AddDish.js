import React, { useState,useEffect } from 'react';
import { useHistory,useParams } from 'react-router-dom';
import DishesService from '../services/DishesService';
import CategoriesService from '../services/CategoriesService';
const AddDish=()=>{
    const [title,setTitle]=useState('')
    const [description,setDescription]=useState('')
    const [price,setPrice]=useState('')
    const [id_category, setId_category] = useState(undefined);
    const [id_restaurants, setId_restaurants] = useState(undefined);
    const [image, setImage] = useState(null);
    const history=useHistory();
    const [categories, setCategories] = useState([]); // state variable for categories
const [selectedCategory, setSelectedCategory] = useState(null); // state variable for selected category ID
    const {id}=useParams();
	const id1=localStorage.getItem("restaurantId")





    const saveorUpdateDish = (e) => {
        e.preventDefault();
        const fileInput = document.querySelector('input[type="file"]');
        const file = fileInput.files[0];
        const reader = new FileReader();

        if (!file) {
          alert("Пожалуйста, выберите изображение для блюда.");
          return;
        }

        reader.onload = (event) => {
          const base64Image = event.target.result;
    
          if (id) {
            const Dish = { title, description, price, selectedCategory, id1, image: base64Image };
            DishesService.updateDishes(id, Dish)
              .then((response) => {
                history.push('/dishes/' + id1);
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            const Dish = { title, description, price, selectedCategory, id1, image: base64Image };
            DishesService.AddDish(Dish)
              .then((response) => {
                const id1 = localStorage.getItem("restaurantId");
                history.push('/dishes/' + id1);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        };
    
        reader.readAsDataURL(file);
      };
      
      

      
    useEffect(()=>{
        if(id){
        DishesService.getDishesFromId(id).then((responce)=>{
            setTitle(responce.data.title)
            setDescription(responce.data.description)
            setPrice(responce.data.price)


        }).catch(error=>{console.log(error);})
    }
    CategoriesService.AllCategories()
    .then((response) => {
      setCategories(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
    },[])

    const title_Dishes=()=>{
        if (id){return <h2 className='text-center'> Изменить блюдо</h2>}
        else{return <h2 className='text-center'>Добавить блюдо</h2>}


    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
      };

    return(
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                         {title_Dishes()}
                        <div className='card-body'>
                            <form>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Название</label>
                                    <input type="text" placeholder='Введите название' name="title"  className='form-control' value={title} onChange={(e)=>setTitle(e.target.value)}></input>
                                        
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Описание</label>
                                    <input type="text" placeholder='Введите описание' name="description"  className='form-control' value={description} onChange={(e)=>setDescription(e.target.value)}></input>
                                        
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Цена</label>
                                    <input type="text" placeholder='Введите цену' name="price"  className='form-control' value={price} onChange={(e)=>setPrice(e.target.value)}></input>
                                        
                                </div>

                                    <div className='form-group mb-2'>
                                  <label className='form-label'>Категория</label>
                                  <select
                                    id='check_cat'
                                    disabled={id}
                                    className="form-control"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                  >
                                    <option value="">Выберите категорию</option>
                                    {categories.map((category) => (
                                      <option key={category.id} value={category.id}>
                                        {category.title}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                <div className="form-group mb-3">
                                <label className='form-label'>Изображение</label>
                                <input type="file" name="title" accept="image/*"  onChange={handleImageChange} className="form-control" />
                                </div>


                                 <button className='btn btn-success' onClick={(e)=> saveorUpdateDish(e)}>Отправить</button> 
                            </form>
                        </div>
                    </div>

                </div>

            </div>

        </div>

    )

}
export default AddDish;
