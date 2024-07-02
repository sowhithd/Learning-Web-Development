import Header from "./components/Header/Header.jsx";
import CoreConcepts from "./components/CoreConcepts/CoreConcepts.jsx";
import Examples from "./components/Examples/Examples.jsx";
function App() {
  
  return (
    <div>
      {/*
      you can think of the above empty div like an object or array that wraps these values.  But of course this limitation or 
      restriction also means that you do end up with an extra div(as above) in your DOM structure.
      
      If we inspect code with the dev tools we can see that extra div isn't a huge problem having extra elements like this in your 
      DOM simply is unnecessary

      React gives you an alternative. It gives you a special "fragment component", which you can use as a wrapper if you do need a 
      root component to wrap some sibling components but you don't wanna render an actual element to the screen.

      By using fragment component(<></>) conept, we also no longer have this unnecessary div.

      */}
      <Header />
      <main>
        <CoreConcepts />
        <Examples/>        
      </main>
    </div>
  );
}

export default App;
