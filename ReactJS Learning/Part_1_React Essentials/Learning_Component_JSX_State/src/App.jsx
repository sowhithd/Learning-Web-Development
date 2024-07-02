import { useState } from "react";
import Header from "./components/Header/Header.jsx";
import CoreConcept from "./components/CoreConcept/CoreConcept.jsx";
import { CORE_CONCEPTS, EXAMPLES } from "./data.js";
import TabButton from "./components/TabButton/TabButton.jsx";

function App() {
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
    <div>
      <Header />
      <main>
        <section id="core-concepts">
          <h2>Core Concepts</h2>
          <ul>
            {CORE_CONCEPTS.map((item) => (
              <CoreConcept key={item.title} data={item} />
            ))}
          </ul>
        </section>
        <section id="examples">
          <h2>Example</h2>
          <menu>
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
          </menu>
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
        </section>
      </main>
    </div>
  );
}

export default App;
