import { useRef, useState, useCallback } from "react";

import Places from "./components/Places.jsx";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import AvailablePlaces from "./components/AvailablePlaces.jsx";
import { updateUserPlaces, fetchUserSelectedPlaces } from "./http.js";
import Error from "./components/Error.jsx";
import { useFetch } from "./customHooks/useFetch.js";

function App() {
  const selectedPlace = useRef();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState();

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  const {
    isDataFetching,
    error,
    fetchedData: userPlaces,
    setFetchedData: setUserPlaces,
  } = useFetch(fetchUserSelectedPlaces, []);

  async function handleSelectPlace(selectedPlace) {
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });
    try {
      await updateUserPlaces([selectedPlace, ...userPlaces]);
    } catch (error) {
      /*
      Instead of managing some loading state and showing some loading text or loading spinner to the user we are doing something 
      which is called "optimistic updating".
      
      */
      setUserPlaces(userPlaces);
      setErrorUpdatingPlaces({
        message: error.message || "Failed to Update Places.",
      });
    }
  }

  const handleRemovePlace = useCallback(
    async function handleRemovePlace() {
      setUserPlaces((prevPickedPlaces) =>
        prevPickedPlaces.filter(
          (place) => place.id !== selectedPlace.current.id
        )
      );
      try {
        await updateUserPlaces(
          userPlaces.filter((place) => place.id !== selectedPlace.current.id)
        );
      } catch (error) {
        setUserPlaces(userPlaces);
        setErrorUpdatingPlaces({
          message: error.message || "Failed to Remove Places.",
        });
      }

      setModalIsOpen(false);
    },
    [userPlaces, setUserPlaces] /*
                                   state updating functions normally don't need to be added to dependency arrays of 
                                   useCallback or useEffect because React guarantees for all those state updating functions 
                                   that they will never change.

                                   But here in this case now the project simply doesn't understand that setUserPlaces in the 
                                   end refers to a state updating function because all it sees here is that it's some property 
                                   we're pulling out of some object. Therefore, for completeness sake, and to get rid
                                   of that warning, we can simply add setUserPlaces here.

                                   It technically won't make a difference though because it does refer to a state updating 
                                   function and those are guaranteed by React to never change.
                                */
  );

  function handleErrorModal() {
    setErrorUpdatingPlaces(null);
  }

  return (
    <>
      <Modal open={errorUpdatingPlaces} onClose={handleErrorModal}>
        {errorUpdatingPlaces && (
          <Error
            title="An Error Occured!"
            message={errorUpdatingPlaces.message}
            onConfirm={handleErrorModal}
          />
        )}
      </Modal>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
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
        {error && <Error title="An Error Occured!" message={error.message} />}
        {!error && (
          <Places
            title="I'd like to visit ..."
            fallbackText="Select the places you would like to visit below."
            isLoading={isDataFetching}
            loadingText="Fetching selected places..."
            places={userPlaces}
            onSelectPlace={handleStartRemovePlace}
          />
        )}

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
