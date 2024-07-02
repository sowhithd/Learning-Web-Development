export default function Section({ title, children,...props }) {
 /*
   When destructuring our props like above, we can also add some special built-in JavaScript syntax, where we add three dots written 
   like above and then, thereafter, any identifier of our choice.
    
   For example, the word props, but this is up to us. But this three dots thing here is built into JavaScript and basically tells 
   JavaScript to collect all other props that might be received on this section component and merge them into a props object.

   The identifier "props" allows us to then forward the left over props here to the section inbuilt HTML element, by using the 
   spread operator, which looks the same, but we're using it in a different place here. In above we are grouping props and below 
   we are using to spread those props onto some other element.

 */
  return (
    <section {...props}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
