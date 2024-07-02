export default function Button({children,className,Icon,mode = "filled",...props}) {
    // Todo: Build this component!
    
    // !!! Important: 
    // Wrap the icon with a <span className="button-icon"> to achieve the target look
    // Also wrap the children prop with a <span>
    let cssClasses = `button ${mode}-button`;
    
    /*
        The custom Button should also support icons. Therefore, an Icon prop is extracted from the incoming props. 
        It's called Icon (with an uppercase "I") and not icon (lowercase "i") because this prop should hold a 
        component identifier (i.e., a pointer at a component function) as a value.

        The goal therefore is to use this Icon prop value as a component inside the Button component. 
        In addition, if the Icon prop is set, the CSS classes are again extended to add the icon-button class


    */
    if (Icon) {
        cssClasses += ' icon-button'; //This is a class in index.css file
      }

    //Since those props could also(possible anyone can use this to pass cutomer className) include the className prop, 
    //that prop's value is merged into the cssClasses string

    if (className) {
        cssClasses += ' ' + className;
      }
    
    return(
        <>
        <button className={cssClasses} {...props}>
      {Icon && (
        <span className="button-icon">
          <Icon />
        </span>
      )}
      <span>{children}</span>
    </button>
        </>
    )
   }
   