
export default function Tabs({buttons,children,ButtonsContainer = 'menu'}) {
 {/*
   The only two important things to remember here
    * Is that prop used as customer wrapper here must be usable as a custom component naming format in the receiving component. 
    * So it must start with an uppercase character or it must be remapped to a constant or a variable that starts 
      with an uppercase character.
    
    * Is that when it comes to these identifiers in parent component where this custom component is referred, 
       * use string names for the built-in elements like menu, ul or div ex: ButtonsContainer="menu"
       * If using custom component functions, then add just the identifier ex: ButtonsContainer={Section}
    
   * If scenario we want to use a menu element as a wrapper around our buttons most of time. Then we can set the  menu element
     as a default prop.
*/}
    return (<>
        <ButtonsContainer>
        {buttons}
        </ButtonsContainer>
        {children}
        </>)
    
    
}