import React,{useEffect,useState} from 'react'
import axios from 'axios'

const Image = ({url}) => {

    const [imgurl, setImgurl] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState('')
  
    useEffect(() => {
  
      fetchImageData()
  
    }, [url])
  
    const fetchImageData = async () => {
      setLoading(true)
      try {
        const res = await axios.get(url)
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
    <div className='img-container'>
         <img src={imgurl} alt="" />     
    </div>
  )
}

export default Image