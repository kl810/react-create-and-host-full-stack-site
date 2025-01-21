import { Link } from 'react-router-dom'

export default function NavBar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to='/'>Home</Link> {/* Use <Link> instead of <a> anchor tag 
                    because React is SPA <a> sends request to server and 
                    will reload the entire page */}
                </li>
                <li>
                    <Link to='/about'>About</Link>
                </li>
                <li>
                    <Link to='/articles'>Articles</Link>
                </li>
            </ul>
        </nav>
    )
}