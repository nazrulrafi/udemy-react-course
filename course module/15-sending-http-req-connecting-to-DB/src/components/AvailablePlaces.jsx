import Places from './Places.jsx';
import {useEffect, useState} from "react";
import ErrorPage from "./Error.jsx";
import Error from "./Error.jsx";
import {sortPlacesByDistance} from "../loc.js";
import {fetchAvailablePlaces} from "../http.jsx"

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFeatching, setIsFeatching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [errors, setErrors] = useState();

  useEffect(() => {
    async function fetchPlaces() {
        setIsFeatching(true);
        try {
          const places = await fetchAvailablePlaces();
          navigator.geolocation.getCurrentPosition((position)=>{
            const sortedPlaces = sortPlacesByDistance(
                places,
                position.coords.latitude,
                position.coords.longitude
            );
            setAvailablePlaces(sortedPlaces);
            setIsFeatching(false);
          })

        }catch (error) {
          setErrors({message: error.message || "Could not fetch places."});
        }
        setIsFeatching(false);
    }
    fetchPlaces();
  }, []);

  if (errors){
    return <ErrorPage title="An error occurred!" message={errors.message} />
  }
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFeatching}
      loadingText="Featching Place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
















