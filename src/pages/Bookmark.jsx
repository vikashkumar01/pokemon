import React, { useEffect, useState } from 'react'
import Bookmarkimg from '../component/Bookmarkimg';
import {Link} from 'react-router-dom'

const Bookmark = () => {

  let [items, setItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items'));
    if (storedItems) {
      setItems(storedItems);
    }
  }, []);

  const removeFromFav= (pname) => {
    const updatedItems = items.filter(iname => iname !== pname);
    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));
  }


  return (
    <div className='bookmark-container'>
      <span>Favourite Pokemon</span>
      <div className='list-bookmark-pokemon-container'>
        {
          items?.map((favP, i) => (
            <div className='fav-pokemon'>
              <Bookmarkimg name={favP}/>
             <span>{favP}</span>
              <div className='btn-container'>
                <Link to={`/pokemondetail/${favP}`}>view</Link>
                <button onClick={()=>removeFromFav(favP)}>Remove</button>
              </div>
            </div>

          ))
        }

      </div>
    </div>
  )
}

export default Bookmark