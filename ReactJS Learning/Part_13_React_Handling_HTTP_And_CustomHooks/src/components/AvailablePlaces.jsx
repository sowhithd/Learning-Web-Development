import { useState, useEffect } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import {fetchAvailablePlaces} from '../http.js';
import { useFetch } from '../customHooks/useFetch.js';


async function fetchStroedPlaces() {
  const places = await fetchAvailablePlaces();
  return new Promise((resolve, reject)=> {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        places,
        position.coords.latitude,
        position.coords.longitude
      );
     /*
       This will now make sure that when we wait for fetchSortedPlaces which can be used to pass a fucntion reference to the 
       custom hook(useFectch) sortedPlaces value that will in the end be returned by the overall promise returned by this 
       function. This is not React-specific.

       Instead, this is a standard JavaScript feature and a standard JavaScript pattern and approach for converting 
       a non-promise feature and API into a promise-based feature.
     */
      resolve(sortedPlaces);
    });
  });
  
}  
export default function AvailablePlaces({ onSelectPlace }) {


  const {
    isDataFetching,
    error,
    fetchedData: availablePlaces,
  }= useFetch(fetchStroedPlaces,[]);
  
  
 /*
   const [availablePlaces, setAvailablePlaces] = useState([]);
   const [isDataFetching, setDataFetching] = useState(false);
   const [error, setError] = useState();

  
 
  useEffect(() => {
    async function fetchPlaces() {
      setDataFetching(true);
      try {
        const places = await fetchAvailablePlaces();
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);

          setDataFetching(false);
        });
      } catch (error) {
        setError({
          message:
            error.message || "Could not fetch places, please try again later.",
        });
        setDataFetching(false);
      }
    }

    fetchPlaces();

    //Calling endpoint with and without async and await

    
    //  fetch('http://localhost:3000/places')
    //   .then((response) => {
        
    //     //json method can be used to extract data that's attached in the JSON format. And JSON is simply a text-based data format
    //     //that looks like this  available in path ReactJS Learning\Part_13_React_Handling_HTTP\backend\data\places.json 
    //     //basically like a JavaScript array and object you could say. JSON is the standard data format for exchanging 
    //     //data with backends.
       
    //     return response.json();
        
    //   })
    //   .then((resData) => {
       
    //     setAvailablePlaces(resData.places);
    //   });
      
  }, []);
*/
  if (error) {
    return <Error title="An Error Occured!" message={error.message} />;
  }
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isDataFetching}
      loadingText="Fetching Places Data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
