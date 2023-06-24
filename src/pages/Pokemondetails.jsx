import React, { useEffect, useState } from 'react'
import { BsBookmarkStar, BsBookmarkStarFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const category = ['About', 'Bass Stats', 'Evolution', 'Moves']

const Pokemondetails = () => {

  const params = useParams()

  const [pokemon, setPokemon] = useState()
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isbookmark, setBookmark] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(0)
  let [items, setItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items'));
    if (storedItems) {
      setItems(storedItems);
      if (storedItems.includes(params.id)) {
        setBookmark(true);
      }
    }
  }, [params.id]);

  

  useEffect(() => {
    setTimeout(() => { setError('') }, 3000)
  }, [error])

  const fetchPokemon = async () => {

    setLoading(true)
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
      setPokemon(res.data)
      setLoading(false)
    } catch (err) {
      setError(err.response.data)
      setLoading(false)
    }

  }
  useEffect(() => {
    fetchPokemon()
  }, [params.id])

  const bookmarkHandler = (pname) => {

    if (isbookmark) {
      const updatedItems = items.filter(iname => iname !== pname);
      setItems(updatedItems);
      setBookmark(false);
      localStorage.setItem('items', JSON.stringify(updatedItems));
    } else {
      const updatedItems = [...items, pname];
      setItems(updatedItems);
      setBookmark(true);
      localStorage.setItem('items', JSON.stringify(updatedItems));
    }

  }

  console.log(pokemon)

  return (
    <div className='pokemondetails-container'>

      {
        isLoading && <span>Loading...</span>
      }

      {
        error !== '' && <span>Something Went Wrong</span>
      }

      <div className='pokemon-card'>
        <div className='pokemon-sub1'>
          <span>{pokemon?.id}.{pokemon?.name}</span>
          <img src={pokemon?.sprites?.other?.dream_world?.front_default} />

          {
            isbookmark ? <BsBookmarkStarFill onClick={() => { bookmarkHandler(pokemon?.name) }} className='bookmark' size={30} color='red' /> :
              <BsBookmarkStar onClick={() => { bookmarkHandler(pokemon?.name) }} className='bookmark' size={30} color='grey' />
          }
        </div>

        <div className='cate-detail-conatiner'>
          <div className='cate-container'>
            {
              category.map((cate, i) => (
                <span
                  onClick={(e) => setSelectedCategory(i)}
                  key={i}
                  className={selectedCategory === i ? 'selectedcolor' : 'unselectedcolor'}
                >{cate}</span>
              ))
            }
          </div>

          {
            selectedCategory === 0 &&
            <div className='cate-details'>
              <div className='cate-detail-part'>
                <div>
                  <span>Species:</span>
                  <span>{pokemon?.species?.name}</span>
                </div>

                <div>
                  <span>Height:</span>
                  <span>{pokemon?.height}</span>
                </div>

                <div>
                  <span>weight:</span>
                  <span>{pokemon?.weight}</span>
                </div>

                <div>
                  <span>Abilities:</span>
                  {
                    pokemon?.abilities.map((item, i) => (
                      <span>{pokemon?.abilities[i]?.ability?.name},</span>
                    ))
                  }
                </div>
              </div>

              <div className='cate-detail-part'>
                <h3>Breeding</h3>
                <div>
                  <span>Gender:</span>
                  <span>Male</span>
                </div>

                <div>
                  <span>Egg Groups:</span>
                  <span>Monster</span>
                </div>

                <div>
                  <span>Egg Cycle:</span>
                  <span>Grass</span>
                </div>
              </div>
            </div>

          }

          {
            selectedCategory === 1 &&
            <div className='cate-details'>
              <div className='base-stats'>
                <div>
                  <span>Hp:</span>
                  <span>{pokemon?.stats[0]?.['base_stat']}</span>
                </div>

                <div>
                  <span>Attack:</span>
                  <span>{pokemon?.stats[1]?.['base_stat']}</span>
                </div>

                <div>
                  <span>Deffence:</span>
                  <span>{pokemon?.stats[2]?.['base_stat']}</span>
                </div>

                <div>
                  <span>Sp.Atack:</span>
                  <span>{pokemon?.stats[3]?.['base_stat']}</span>
                </div>

                <div>
                  <span>Sp.deff:</span>
                  <span>{pokemon?.stats[4]?.['base_stat']}</span>
                </div>

                <div>
                  <span>Speed:</span>
                  <span>{pokemon?.stats[5]?.['base_stat']}</span>
                </div>

                <div>
                  <span>total:</span>
                  <span>{parseInt(pokemon?.stats[0]?.['base_stat']) + parseInt(pokemon?.stats[1]?.['base_stat']) + parseInt(pokemon?.stats[2]?.['base_stat']) +
                    parseInt(pokemon?.stats[3]?.['base_stat']) + parseInt(pokemon?.stats[4]?.['base_stat']) + parseInt(pokemon?.stats[5]?.['base_stat'])}</span>
                </div>
              </div>


            </div>

          }

          {
            selectedCategory === 2 &&
            <div className='cate-detail-evolution'>
              <div className='evolution'>
                <div>
                  <span>Generation-i:</span>
                  <div className='red-blue'>
                    <img src={pokemon?.sprites?.versions?.['generation-i']?.['red-blue']?.back_transparent} alt="" />
                    <img src={pokemon?.sprites?.versions?.['generation-i']?.['red-blue']?.back_default} alt="" />
                    <img src={pokemon?.sprites?.versions?.['generation-i']?.['red-blue']?.back_gray} alt="" />
                    <img src={pokemon?.sprites?.versions?.['generation-i']?.['red-blue']?.front_transparent} alt="" />
                    <img src={pokemon?.sprites?.versions?.['generation-i']?.['red-blue']?.front_gray} alt="" />
                    <img src={pokemon?.sprites?.versions?.['generation-i']?.['red-blue']?.front_default} alt="" />
                  </div>
                </div>

                <div>
                  <span>Generation-ii:</span>
                  <div className='red-blue'>
                    <img src={pokemon?.sprites?.versions?.['generation-ii']?.['crystal']?.back_shiny_transparent} alt="" />
                    <img src={pokemon?.sprites?.versions?.['generation-ii']?.['crystal']?.back_transparent} alt="" />
                    <img src={pokemon?.sprites?.versions?.['generation-ii']?.['crystal']?.front_transparent} alt="" />
                    <img src={pokemon?.sprites?.versions?.['generation-ii']?.['crystal']?.front_shiny_transparent} alt="" />
                    <img src={pokemon?.sprites?.versions?.['generation-ii']?.['crystal']?.back_default} alt="" />
                    <img src={pokemon?.sprites?.versions?.['generation-ii']?.['crystal']?.back_shiny} alt="" />
                    <img src={pokemon?.sprites?.versions?.['generation-ii']?.['crystal']?.front_shiny} alt="" />
                    <img src={pokemon?.sprites?.versions?.['generation-ii']?.['crystal']?.front_default} alt="" />
                    <img src={pokemon?.sprites?.versions?.['generation-ii']?.['crystal']?.front_default} alt="" />
                  </div>
                </div>

                <div>
                  <span>Generation-iii:</span>
                  <div className='red-blue'>
                    <img src={pokemon?.sprites?.versions?.['generation-iii']?.['emerald']?.front_default} alt="" />
                    <img src={pokemon?.sprites?.versions?.['generation-iii']?.['emerald']?.front_shiny} alt="" />
                  </div>
                </div>

                <div>
                  <span>generation-iv:</span>
                  <div className='red-blue'>
                    <img src={pokemon?.sprites?.versions?.['generation-iv']?.['diamond-pearl']?.back_default} alt="" />
                    <img src={pokemon?.sprites?.versions?.['generation-iv']?.['diamond-pearl']?.back_shiny} alt="" />
                    <img src={pokemon?.sprites?.versions?.['generation-iv']?.['diamond-pearl']?.front_default} alt="" />
                    <img src={pokemon?.sprites?.versions?.['generation-iv']?.['diamond-pearl']?.front_shiny} alt="" />
                  </div>
                </div>

                <div>
                  <span>generation-v:</span>
                  <div className='red-blue'>
                    <img src={pokemon?.sprites?.versions?.['generation-v']?.['black-white']?.back_default} alt="" />
                    <img src={pokemon?.sprites?.versions?.['generation-v']?.['black-white']?.back_shiny} alt="" />
                    <img src={pokemon?.sprites?.versions?.['generation-v']?.['black-white']?.front_default} alt="" />
                    <img src={pokemon?.sprites?.versions?.['generation-v']?.['black-white']?.front_shiny} alt="" />
                  </div>
                </div>

                <div>
                  <span>generation-vi:</span>
                  <div className='red-blue'>
                    <img src={pokemon?.sprites?.versions?.['generation-vi']?.['omegaruby-alphasapphire']?.front_default} alt="" />
                    <img src={pokemon?.sprites?.versions?.['generation-vi']?.['omegaruby-alphasapphire']?.front_shiny} alt="" />
                  </div>
                </div>

                <div>
                  <span>generation-vii:</span>
                  <div className='red-blue'>
                    <img src={pokemon?.sprites?.versions?.['generation-vii']?.['ultra-sun-ultra-moon']?.front_default} alt="" />
                    <img src={pokemon?.sprites?.versions?.['generation-vii']?.['ultra-sun-ultra-moon']?.front_shiny} alt="" />
                  </div>
                </div>

                <div>
                  <span>generation-viii:</span>
                  <div className='red-blue'>
                    <img src={pokemon?.sprites?.versions?.['generation-viii']?.['icons']?.front_default} alt="" />
                  </div>
                </div>

              </div>
            </div>

          }

          {
            selectedCategory === 3 &&
            <div className='cate-details'>
              <div className='base-stats'>
                <div>
                  <span>Move-1:</span>
                  <span>{pokemon?.moves[0].move?.name}</span>
                </div>

                <div>
                  <span>Move-2:</span>
                  <span>{pokemon?.moves[1].move?.name}</span>
                </div>

                <div>
                  <span>Move-3:</span>
                  <span>{pokemon?.moves[2].move?.name}</span>
                </div>

                <div>
                  <span>Move-4:</span>
                  <span>{pokemon?.moves[3].move?.name}</span>
                </div>

                <div>
                  <span>Move-5:</span>
                  <span>{pokemon?.moves[4].move?.name}</span>
                </div>

                <div>
                  <span>Move-6:</span>
                  <span>{pokemon?.moves[5].move?.name}</span>
                </div>

                <div>
                  <span>Move-7</span>
                  <span>{pokemon?.moves[6].move?.name}</span>
                </div>
              </div>

            </div>

          }

        </div>
      </div>
    </div >
  )
}

export default Pokemondetails