import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
        <ul>
            <li><Link to='/category'>category</Link></li>
            <li><Link to='/recipes'>recipes</Link></li>
            <li><Link to='/users'>users</Link></li>
            <li><Link to='/login'>login</Link></li>
            <li><Link to='/register'>register</Link></li>
            <li><Link to='/changepass'>changepass</Link></li>
            <li><Link to='/forgetpass'>forgetpass</Link></li>
            <li><Link to='/resetPass'>resetPass</Link></li>
            
        </ul>
    </div>
  )
}
