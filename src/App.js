
import './App.css';
import React, {useEffect, useState} from "react";
import Recipe from './Recipe'
const App = () =>{

  const APP_ID ="d90f7488";
  const APP_KEY = "2985cfc13f5245f719d684df28fcdb23";


const [recipes , setRecipes] = useState([]);
const [search, setSearch]= useState('');
const [query , setQuery] = useState("chiken");


useEffect(() => {
 getRecipes(); 
}, [query]);

const getRecipes  = async () => {
  const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
  const data = await response.json();
  setRecipes(data.hits)
  console.log(data.hits)

}

const UpdateSearch = e =>{
  setSearch(e.target.value)
  
}
const getSearch = e => {
e.preventDefault();
setQuery(search)
setSearch('');

}
  return (
      <div className="App"> 
      <form onSubmit={getSearch} className="search_form">
        <input className="Search_bar" type="text" value={search} onChange={UpdateSearch}/>
        <button className="search_button" type="submit">
          Search</button></form> 
          <div className="recipes">
          {recipes.map(recipe =>(
            <Recipe 
            key={recipe.recipe.label} 
            title={recipe.recipe.label} 
            calories ={recipe.recipe.calories} 
            image={recipe.recipe.image} 
            ingredients= {recipe.recipe.ingredients} />
          ) )}</div>
          </div>
  );
};

export default App;
