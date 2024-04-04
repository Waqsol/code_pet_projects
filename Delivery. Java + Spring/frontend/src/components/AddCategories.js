import React, { useState,useEffect } from 'react';
import { useHistory,useParams } from 'react-router-dom';
import CategoriesService from '../services/CategoriesService';

const AddCategories=()=>{
    const [title,setTitle]=useState('')
    const {id}=useParams();
    const [user, setUser] = useState('');
    const history=useHistory();
const saveorUpdateCategories=(e)=>{
e.preventDefault();
const categories ={title}
if(id){
	CategoriesService.updateCategories(id,categories).then((responce)=>{
		history.push("/Categories")
		
	}).catch(error=>{console.log(error);})
	
}else{
	CategoriesService.addCategories(categories).then((responce)=>{
    history.push('/Categories')
}).catch(error=>{
    console.log(error)
})
}



}

useEffect(()=>{
if(id){
    CategoriesService.getCategories(id).then((response)=>{
        setTitle(response.data.title)
 }).catch(error=>{console.log(error)})
}


},[])

const title_categories=()=>{
if(id){return <h2 className='text-center'>Изменить категорию</h2>}
else{ return <h2 className='text-center'>Добавить категорию</h2>}


}




    return(
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        {title_categories()}
                        <div className='card-body'>
                            <form>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Название</label>
                                    <input type="text" placeholder='Введите названиее' name="title"  className='form-control' value={title} onChange={(e)=>setTitle(e.target.value)}></input>
                                        
                                </div>
                                <button className='btn btn-success' onClick={(e)=> saveorUpdateCategories(e)}> Отправить</button>
                            </form>
                        </div>
                    </div>

                </div>

            </div>

        </div>

    )

}
export default AddCategories;