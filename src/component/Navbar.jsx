import React from 'react'

import {Link} from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='nav-container'>
            <div className='header'>
                <span>POKEMON.</span>
            </div>

            <div className='link-container'>
                 <Link to={'/'}>List of Pokemon</Link>
                 <Link to={'/serach'}>Search Pokemon</Link>
                 <Link to={'/bookmark'}>Bookmark</Link>
            </div>


        </div>
    )
}

export default Navbar