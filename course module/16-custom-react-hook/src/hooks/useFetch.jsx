import {useEffect, useState} from "react";
import {fetchUserPlaces} from "../http.js";

export function useFetch(fetchFn,initialValue) {
    const [isFetching, setIsFetching] = useState();
    const [error, setError] = useState();
    const [fetchData, setFetchData] = useState(initialValue);

    useEffect(() => {
        async function fetchPlaces() {
            setIsFetching(true);
            try {
                const places = await fetchUserPlaces();
                setFetchData(places);
            }catch(error) {
                setError({ message: error.message || 'Failed to fetch user places.' });
            }
            setIsFetching(false);
        }
        fetchPlaces();
    }, [fetchFn]);
    return {
        isFetching,
        fetchData,
        setIsFetching,
        error
    }
}