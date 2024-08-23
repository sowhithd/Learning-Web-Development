//You can use the async/await syntax to make it look like synchronous code.
//Every function you decorate with async will yield a promise.
//We should call await where we are calling this method Ex: check in AvailablePlaces.jsx page inside useEffect hook

export async function fetchAvailablePlaces() {
  const response = await fetch("http://localhost:3000/places");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch places");
  }

  return resData.places;
}

export async function fetchUserSelectedPlaces() {
  const response = await fetch("http://localhost:3000/user-places");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to user selected fetch places");
  }

  return resData.places;
}

export async function updateUserPlaces(places) {
  const response = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    body: JSON.stringify({places}),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resData = await response.json();
  if(!response.ok){
    throw new Error('Failed to update user data');
  }
  return resData.message;
}
