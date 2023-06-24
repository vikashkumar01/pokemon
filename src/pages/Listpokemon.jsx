import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Image from '../component/Image'
import { Link } from 'react-router-dom'


const Listpokemon = () => {

  const [pokemons, setPokemons] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    fetchPokemonData()
  }, [offset])

  useEffect(() => {

    setTimeout(() => { setError('') }, 3000)

  }, [error])

  const fetchPokemonData = async () => {

    setLoading(true)
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`)
      setPokemons([...pokemons, ...res.data.results])
      setLoading(false)
    } catch (err) {
      setError(err.response.data)
      setLoading(false)
    }

  }

  const onScroll = () => {
    const scrollTop = document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight
    const clientHeight = document.documentElement.clientHeight
    if (scrollTop + clientHeight >= scrollHeight) {
      setOffset(offset + 10)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [offset])


  const colors = [
    "#a38882",
    "##d3e147",
    "##04b2cd",
    "##91d369",
    "##8a4ac1",
    "##8cb8ab",
    "##6faab3",
    "##3bb99c",
    "#44b986",
    "##d9bfb0"
  ]

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    const selectedColor = colors[randomIndex];
    return selectedColor;
  };


  return (
    <div className='list-container'>
      <span>List Of Pokemon</span>
      <div className='list-item-container'>
        {
          isLoading && <span>Loading...</span>
        }
        {
          error !== '' && <span className='errors'>{error}</span>
        }
        {
          pokemons.length > 0 && pokemons.map((item, i) => (
            <Link to={`/pokemondetail/${item.name}`} key={i}>
              <div className='card-pokemon' style={{ backgroundColor: getRandomColor() }}>
                <Image url={item?.url} />
                <span>{item?.name}</span>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Listpokemon