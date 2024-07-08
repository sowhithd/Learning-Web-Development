/*
import styled from "styled-components";

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${(props)=>props.$invalid ? '#f87171': '#6b7280'};
`;
*/

/*
  One thing to note about injecting props into styled components is that you of course should make sure that you don't accidentally clash
  with default built-in props that might exist on certain elements

  For example, in below we can see prop called "$invalid", the reason to be declared with dollar symbol before variable name is that
  we don't want to clash with default "invalid" prop that exists on HTML elements like "invalid" is a inbuilt propery for input HTML
  elements. In ordet to avoid that we can declare custom props with a dollar symbol before.
*/

/*
const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  line-height: 1.5;
  background-color: ${({$invalid})=>$invalid ? '#fed2d2' : '#d1d5db'};
  color:  ${({$invalid})=>$invalid ? '#ef4444' : '#374151'};
  border: 1px solid transparent;
  border-radius: 0.25rem;
  border-color: ${({$invalid})=>$invalid ? '#f73f3f' : ''}; 
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;




export default function CustomerInput({label,invalid,...props}){
    return( <p>
            <Label $invalid={invalid}>{label}</Label>
            <Input $invalid={invalid} {...props} />
        </p> )
};

*/

/////////////////////////////////////Learning how to use Tailwind CSS/////////////////////////////////////////////////////

export default function Input({ label, invalid, ...props }) {
  let lableClasses = "block mb-2 text-xs font-bold tracking-wide uppercase";
  let inputClasses = "w-full px-3 py-2 leading-tight border rounded shadow ";

  if (invalid) {
    lableClasses += " text-red-400";
    inputClasses += " text-red-500 bg-red-100 border-red-300";
  } else {
    lableClasses += " text-stone-300";
    inputClasses += " text-gray-700  bg-stone-300";
  }

  return (
    <p>
      <label className={lableClasses}>{label} </label>
      <input className={inputClasses} {...props} />
    </p>
  );
}
