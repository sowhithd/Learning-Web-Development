import { useRef, useState, useEffect, useCallback } from "react";

import Places from "./components/Places.jsx";
import { AVAILABLE_PLACES } from "./data.js";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import { sortPlacesByDistance } from "./loc.js";

/*
    * This small block of code will pull the user saved places data. But we don't need to useEffect hook.
    
    * Reason is we are accessing saved data from local storage. We got no callback function or promise or anything like that here.
    
    * Instead retrieving the data like this is instant app component function does not finish its execution cycle before fetching that 
      data is done.
    
    * This works because this code runs synchronously and does not take some time to finish, during which the app component function 
      execution would finish.
    
    * Based on the code is written here it will be executed once in the entire application lifecycle.
  */
const storedIDs = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
let storedPlaces = storedIDs.map((id) => {
  return AVAILABLE_PLACES.find((place) => place.id === id);
});

/////////////////////////////////////////////////////////////

function App() {
  //const modal = useRef();

  /* We are switching from managing the modal in an imperative way to managing it in a declarative way.*/
  const [isModalOpen, setIsModaOpen] = useState(false);

  const selectedPlace = useRef();
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);

  /*
    This code here will not be executed right away. Instead, it's only after the app component function execution finished.
    So, after JSX code has been executed. Then this side effect function we passed to useEffect will be executed by React.
   */
  useEffect(() => {
    /*
      we could add that code to get the user's location, which in the browser, involves the usage of the navigator object, 
      an object exposed by the browser to our JavaScript code that runs in the browser. 
      
      This navigator method usage here is a "side effect". Because this code is needed by this application that we need the user's 
      location after all but it's not directly related to the task, to the main goal of this component function.
      
      Because the main goal of every component function is to return renderable JSX code. Now this code here is a side effect
      because it's not directly related with that task.
    */
    navigator.geolocation.getCurrentPosition((position) => {
      // console.log("User Position: ", position);
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      );
      setAvailablePlaces(sortedPlaces);
    });
  }, []); //second argument is an array of dependencies of that effect function.
  /*
   React will actually take a look at the dependencies specified there. And it will only execute this effect function again.
   If the dependency values changed. 
   
   If you would omit this dependencies array, this effect function would be executed after every app  component render cycle. 
   
   In above scenario we must utilize useEffect hook to avoid infinite loop code execution leads to application crash. Why is that 
   as we has included useState function to re render the location based on user location. React will reexxecute the function that will
   execute navigator menthod again to avoid this we can take adavantage of useEffect hook.
  */

  function handleStartRemovePlace(id) {
    // modal.current.open();
    setIsModaOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    //modal.current.close();
    setIsModaOpen(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    /*
      Now all this code here in the end, is just another example for a "side effect" this code down here where we store data
      in the browser's storage is not directly related to rendering this JSX code
    */
    const storedIDs = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
    if (storedIDs.indexOf(id) === -1)
      localStorage.setItem(
        "selectedPlaces",
        JSON.stringify([id, ...storedIDs])
      );
  }
  /*
  So with useCallback, React makes sure that this inner-function meaning function wrapped in useCallback hook is not recreated.
  Instead, it stores it internally in memory and reuses that stored function whenever the component function executes again.

  Here, in dependency array section you should add any prop or state values that are used inside of this wrapped function.
  And in this case, I got none. I'm using a state updating function, which does not have to be added, and I'm using some browser features
  like local storage.
  And also in dependency array section just as useEffect hook, any other values that in the end depend on state values
  (eg: context Values, other functions).
   
  React will now only recreate this function here with useCallback if your dependencies changed. But if you have an empty array of 
  dependencies, there is nothing that could change and therefore, this function isn't recreated.

*/

  const handleRemovePlace = useCallback(function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    //modal.current.close();
    setIsModaOpen(false);
    const storedIDs = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
    localStorage.setItem(
      "selectedPlaces",
      JSON.stringify(storedIDs.filter((id) => id !== selectedPlace.current))
    );
  }, []);

  return (
    <>
      {/* <Modal ref={modal}> */}
      <Modal open={isModalOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={"Select the places you would like to visit below."}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={
            availablePlaces.length !== 0 ? availablePlaces : AVAILABLE_PLACES
          }
          fallbackText="Sorting Places by distance..."
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
