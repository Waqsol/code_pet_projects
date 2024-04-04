import React, { useState,useEffect } from 'react';
import { useHistory,useParams } from 'react-router-dom';
import RestaurantsService from '../services/RestaurantsService';
const AddRestaurants=()=>{
    const [name,setName]=useState('')
    const [cuisine,setCuisine]=useState('')
    const [opening_hours,setOpening_hours]=useState('')
    const [phone,setPhone]=useState('')
    const [address,setAddress]=useState('')
    const history=useHistory();
    const {id}=useParams();
const saveorUpdateRestaurants=(e)=>{
e.preventDefault();
const Restaurant ={name,cuisine,opening_hours,phone,address}
if(id){
	RestaurantsService.updateRestaurant(id,Restaurant).then((responce)=>{
		history.push("/")
		
		
	}).catch(error=>{console.log(error);})
	
}else{
	RestaurantsService.addRestaurant(Restaurant).then((responce)=>{
    history.push('/')
}).catch(error=>{
    console.log(error)
})
}



}



useEffect(()=>{
if(id){
 RestaurantsService.getRestaurant(id).then((response)=>{
        setAddress(response.data.address)
        setCuisine(response.data.cuisine)
        setName(response.data.name)
        setOpening_hours(response.data.opening_hours)
        setPhone(response.data.phone)
 }).catch(error=>{console.log(error)})
}


},[])

const title=()=>{
if(id){return <h2 className='text-center'>Изменить ресторан</h2>}
else{ return <h2 className='text-center'>Добавить ресторан</h2>}


}


    return(
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        {title()}
                        <div className='card-body'>
                            <form>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Имя</label>
                                    <input type="text" placeholder='Введите имя' name="name"  className='form-control' value={name} onChange={(e)=>setName(e.target.value)}></input>
                                        
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Кухня</label>
                                    <input type="text" placeholder='Введите тип кухни' name="cuisine"  className='form-control' value={cuisine} onChange={(e)=>setCuisine(e.target.value)}></input>
                                        
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Часы открытия</label>
                                    <input type="text" placeholder='Введите часы работы' name="opening_hours"  className='form-control' value={opening_hours} onChange={(e)=>setOpening_hours(e.target.value)}></input>
                                        
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Телефон </label>
                                    <input type="text" placeholder='Введите телефон' name="phone"  className='form-control' value={phone} onChange={(e)=>setPhone(e.target.value)}></input>
                                        
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Адресс</label>
                                    <input type="text" placeholder='Введите адрес' name="address"  className='form-control' value={address} onChange={(e)=>setAddress(e.target.value)}></input>
                                        
                                </div>


                                <button className='btn btn-success' onClick={(e)=> saveorUpdateRestaurants(e)}> Отправить</button>
                            </form>
                        </div>
                    </div>

                </div>

            </div>

        </div>

    )

}
export default AddRestaurants;