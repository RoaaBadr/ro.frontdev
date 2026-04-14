import { FiGithub } from "react-icons/fi";
import { FiLinkedin } from "react-icons/fi";
import { FiDribbble } from "react-icons/fi";

function Nav() {
  return (
    <nav className="nav">
      <div className="logo">ROAA</div>
      <ul className="nav-links">
        <li><a href="https://github.com/johndoe" target="_blank" rel="noopener noreferrer"><FiGithub /></a></li>
        <li><a href="https://linkedin.com/in/johndoe" target="_blank" rel="noopener noreferrer"><FiLinkedin /></a></li>
        <li><a href="https://dribbble.com/johndoe" target="_blank" rel="noopener noreferrer"><FiDribbble /></a></li>
      </ul>
    </nav>
  )
}

export default Nav