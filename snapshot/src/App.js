
import {useEffect, useRef, useState} from 'react'
import './App.css';
import axios from 'axios'

function App() {
  const searchData = useRef(null);
  const [searchText,setSearchText]=useState("mountains")
  const [imageData,setImageData] = useState([]);
  useEffect(()=>{
    const params ={
      method : "flickr.photos.search",
      api_key : "12e1710b81d43b3b4cc938b9c5216d2a",
      text : searchText,
      sort : "",
      per_page : 40,
      license : "4",
      extras : 'owner_name , license',
      format : "json",
      nojsoncallback : 1
    }
    const parameters = new URLSearchParams(params);
    const url = `https://api.flickr.com/services/rest/?${parameters}`
    axios.get(url).then((response)=>{
       console.log(response);
      const arr = response.data.photos.photo.map((imgData)=>{
          return fetchFlickrImgUrl(imgData,'q');
       });
       setImageData(arr);
    }).catch(()=>{

    }).finally(()=>{

    })

  },[searchText]);

  const fetchFlickrImgUrl = (photo,size) =>{
    let url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`
    if(size){
      url += `_${size}`
    }
    url += '.jpg'
    return url
  }
  return (
   <div>
      <div className='title'>SnapShot</div>
      <div className='input-cont'>
        <input onChange={ (e) => {searchData.current = e.target.value} }   />
        </div>
    <div className='search'>
    <button className='search-btn' onClick={()=>{setSearchText(searchData.current)}}>Search</button>
    </div>
   
     <section className='btn-cont'>
       <button className='btn' onClick={()=>{setSearchText("mountains")}}>Mountains</button>
       <button className='btn' onClick={()=>{setSearchText("beaches")}}>Beaches</button>
       <button className='btn' onClick={()=>{setSearchText("birds")}}>Birds</button>
       <button className='btn' onClick={()=>{setSearchText("food")}}>Food</button>
     </section>
     <section className='img-container'>
      
         {imageData.map((imageurl,key)=>{
            return (
               <article className='image'>
                   <img src={imageurl} key={key} /> 
               </article>
            ) 
         })}
     
     </section>
   </div>
  );
}

export default App;
