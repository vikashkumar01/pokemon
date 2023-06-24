import React,{useEffect,useState} from 'react'
import axios from 'axios'

const Bookmarkimg = ({name}) => {
    const [imgurl, setImgurl] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState('')
  
    useEffect(() => {
  
      fetchImageData()
  
    }, [name])
  
    const fetchImageData = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        setImgurl(res.data.sprites.other.dream_world.front_default)
        setLoading(false)
      } catch (err) {
        setError(err.response.data)
        setLoading(false)
      }
    }

    if(isLoading){
      return <span>...</span>
    }

    if(error!==""){
      return <span>{error}</span>
    }
  return (
         <img src={imgurl} alt="" />     
  )
}

export default Bookmarkimg