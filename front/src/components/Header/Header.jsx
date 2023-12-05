import { NavLink } from 'react-router-dom'
import './Header.css'

const Header = () => {
    return(
        <header className='containerHeader'>
            <div className='headerTitle'>
                <img className="logoImperio" src="https://i.pinimg.com/originals/c2/60/7f/c2607fc18d88b1a18c7a5288576662fc.png" alt="logo imperial" />
                <h1 className="title">Ship Store</h1>
            </div>
            <nav className='botones'>
                <NavLink to='/'>
                    <button className='boton'><img className='imageniconos' src="https://img.icons8.com/ios-filled/50/death-star.png" alt="deathstar" />HOME</button>
                </NavLink>
            </nav>
        </header>
    )
}

export default Header