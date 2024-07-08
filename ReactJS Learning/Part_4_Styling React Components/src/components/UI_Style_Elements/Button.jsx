// import styled from "styled-components";

/*
  To apply some styles when we hoverover this button, we can use &:hover, should not separated with a white space like & :hover
  because with a white space in between, you would be targeting child elements inside of the button that are being hovered.
  Without a white space,it's the button itself that should be hovered.
*/

/*
const Button = styled.button`
  padding: 1rem 2rem;
  font-weight: 600;
  text-transform: uppercase;
  border-radius: 0.25rem;
  color: ${({isButtonType})=>isButtonType ?'#f0b322':'#1f2937'};
  background-color: ${({isButtonType})=>isButtonType ?'':'#f0b322'};
  border-radius: 6px;
  border: none;

  
&:hover {
  background-color:#f0920e;
}`;


export default Button;
*/

/////////////////////////////////////Learning how to use Tailwind CSS/////////////////////////////////////////////////////

export default function Button({ children, ...props }) {
  return (
    <button
      className="px-4 py-2 font-semibold uppercase rounded text-stone-900 bg-amber-400 hover:bg-amber-500"
      {...props}
    >
      {children}
    </button>
  );
}
