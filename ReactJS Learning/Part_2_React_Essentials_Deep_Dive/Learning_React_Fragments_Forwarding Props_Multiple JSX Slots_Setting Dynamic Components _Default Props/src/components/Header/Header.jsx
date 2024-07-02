import reactImg from '../../assets/react-core-concepts.png';

import "./Header.css";

const reactDescriptions = ['Fundamental', 'Crucial', 'Core'];

const arrLength = reactDescriptions.length;

const randomWord =  reactDescriptions[genRandomInt(arrLength-1)];

function genRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

function Header() {
 return(
    <header>
        <img src={reactImg} alt="Stylized atom" />
        <h1>React Essentials</h1>
        <p>
          {randomWord} React concepts you will need for almost any app you are
          going to build!
        </p>
      </header>
 );
}

export default Header;