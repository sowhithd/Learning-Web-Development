import { useState } from "react";
import { EXAMPLES } from "../../data.js";
import TabButton from "../TabButton/TabButton.jsx";
import Section from "../Section/Section.jsx";
import Tabs from "../Tabs/Tabs.jsx";

export default function Examples() {
  const [selectedTopic, setSelectedTopic] = useState();

  /*
    You can define functions inside of component function and those inner functions will then only be callable from inside this function
    */
  function handleSelect(selectedButton) {
    setSelectedTopic(selectedButton);
  }

  let tabContent = <p>Please select a topic.</p>;
  if (selectedTopic) {
    tabContent = (
      <div id="tab-content">
        {/* 
       Bracket notation in JavaScript is a way to access properties of objects, offering more flexibility than dot notation.
       Below all properties are accessed using bracket notation format
      
      */}
        <h3>{EXAMPLES[selectedTopic].title}</h3>
        <p>{EXAMPLES[selectedTopic].description}</p>
        <pre>
          <code>{EXAMPLES[selectedTopic].code}</code>
        </pre>
      </div>
    );
  }

  return (
    <Section title={"Examples"} id="examples">
    {/* 
        JSX code, JSX elements are in the end just regular values that can be used like values in your code.
        We can pass the TabButton components as a input to Tabs component, which Tabs component acts as wrapper component.
        In this way we can use Tabs component anywhere in application and this is an example of component reusability.

        Whenever you are using JSX code as a value in some place, no matter if that place is the value being returned in a component
        or a value being stored in a variable like "tabContent", you have to make sure that there's only one root element
        in that place. And for that, we could add a div as a wrapper around these tap buttons or we can use React Fragments

        In below basically we're able to set two different slots on this tabs component, the main content slot(tabContent),
        which is set with help of children. And then this buttons slot, which is set with help of our custom prop called "buttons".

        And With this "Tabs Component" pattern might maybe look a bit redundant for this basic app here, it is a crucial pattern.
        And being able to set multiple slots in Components is a crucial concept in React about which every React developer must know.
    */}
      <Tabs
        buttons={
          <>
            {/*

            And by default, when just passing handleSelect as a value to onSelect. And therefore, in the end to this button here
            on this onClick prop(in child component), we won't get that identifier because that's some logic that's specific
            to our application here, and of course, React doesn't know that we want such an identifier when that button is clicked.

            So instead of using that as a value for onSelect we can pass an arrow function to onSelect. So, now instead of just 
            passing handleSelect here. I'm passing this arrow function as a value to onSelect.


           Inside of this arrow function body. So, on the right side of this arrow that will be executed when this anonymous 
           function will be executed when the button was clicked.
            */}
            <TabButton
              isSelected={selectedTopic === "components"}
              onSelect={() => handleSelect("components")}
            >
              Component
            </TabButton>
            <TabButton
              isSelected={selectedTopic === "jsx"}
              onSelect={() => handleSelect("jsx")}
            >
              JSX
            </TabButton>
            <TabButton
              isSelected={selectedTopic === "props"}
              onSelect={() => handleSelect("props")}
            >
              Props
            </TabButton>
            <TabButton
              isSelected={selectedTopic === "state"}
              onSelect={() => handleSelect("state")}
            >
              State
            </TabButton>
          </>
        }
      >
        {!selectedTopic && <p>Please select a topic.</p>}
        {selectedTopic && (
          <div id="tab-content">
            {/* 
           Bracket notation in JavaScript is a way to access properties of objects, offering more flexibility than dot notation.
           Below all properties are accessed using bracket notation format
          
          */}
            <h3>{EXAMPLES[selectedTopic].title}</h3>
            <p>{EXAMPLES[selectedTopic].description}</p>
            <pre>
              <code>{EXAMPLES[selectedTopic].code}</code>
            </pre>
          </div>
        )}
        {/*OR*/}

        {/*tabContent*/}
      </Tabs>
    </Section>
  );
}
