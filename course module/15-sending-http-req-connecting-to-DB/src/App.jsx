import {useRef, useState, useCallback, useEffect} from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import {fetchUserPlaces, updateUserPlaces} from "./http.jsx";
import ErrorPage from "./components/Error.jsx";

function App() {
  const selectedPlace = useRef();

  const [userPlaces, setUserPlaces] = useState([]);
  const [isFeatching, setIsFeatching] = useState(false);
  const [errors, setErrors] = useState();

  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
     async function fetchPlaces() {
       setIsFeatching(true);
       try {
         const places = await fetchUserPlaces();
         setUserPlaces(places);
       }catch (error) {
          setErrors({message: errors.message || "Failed to fetch user places."})
       }
       setIsFeatching(false);
     }
    fetchPlaces()
  },[])

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    //await updateUserPlaces([selectedPlace,...userPlaces]);
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
      await updateUserPlaces([selectedPlace,...userPlaces]);
    } catch (error){
      setUserPlaces(userPlaces)
      setErrorUpdatingPlaces({message : error.message || "Failed to update places"})
    }
  }

  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    setUserPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
    );
    try {
      await updateUserPlaces(
          userPlaces.filter((place) => place.id !== selectedPlace.current.id)
      );
    }catch(error){
      setUserPlaces(userPlaces);
      setErrorUpdatingPlaces({message: error.message || "Failed to delete place"})
    }
    setModalIsOpen(false);
  }, [userPlaces]);

  function handleError(){
    setErrorUpdatingPlaces(null)
  }

  return (
    <>
      <Modal open={errorUpdatingPlaces} onClose={handleError}>
        {errorUpdatingPlaces && (
            <ErrorPage
                onConfirm={handleError}
                title = "An error occurred!"
                message={errorUpdatingPlaces.message}
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
        {errors && <ErrorPage title="An error occurred!" message={error.message} />}
        {!errors && (
            <Places
                title="I'd like to visit ..."
                fallbackText="Select the places you would like to visit below."
                isLoading={isFeatching}
                loadingText="Fetching your places..."
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
