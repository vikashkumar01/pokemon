import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Search = () => {

  const [searchKey, setSearchKey] = useState('')
  const [searchData, setSearchData] = useState()
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('')



  useEffect(()=>{
    setTimeout(()=>{
      setError('')
    },3000)
  },[error])

  const searchHandler = async (searchKey) => {

    if(searchData){
      setSearchData()
    }
    setLoading(true)
     try{
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon/" + searchKey.toLowerCase())
        setSearchData(res.data)
        setLoading(false)
     }catch(err){
        setError(err.response.data)
        setLoading(false)
     }
   

  }
  return (
    <div className='search-container'>
      <div className='search-pokemon'>
        <input type="text"
          placeholder='Search Pokemon By Name'
          onChange={(e) => { setSearchKey(e.target.value) }} />
        <button onClick={() => searchHandler(searchKey)}>Search</button>
      </div>
      <div className='search-item-container'>
        <span>Searched Item</span>
        {
          isLoading && <span>Loading...</span>
        }
        {
          error !== '' && <span className='errors'>{error}</span>
        }
        {
          searchData &&
          <Link to={`/pokemondetail/${searchData?.name}`}>
            <div className='search-item'>
              <h1>{searchData?.name}</h1>
              <img src={searchData?.sprites?.other?.dream_world?.front_default} alt="" />
            </div>
          </Link>
        }
      </div>
    </div>
  )
}

export default Search