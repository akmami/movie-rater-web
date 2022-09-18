import {useState, useEffect} from 'react';
import { API } from '../api-service';
import { useCookies } from 'react-cookie';

function useFetch() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState([]);
    const [error, setError] = useState([]);
    const [token] = useCookies(['mr-token']);

    useEffect( () => {
        async function fetchData() {
            setLoading(true);
            setError();

            const data = await API.getMovies((token['mr-token'])['token'])
                                .catch( error => setError(error));
            setData(data);
            setLoading(false);
        }

        fetchData();
    }, []);

    return [data, loading, error];
}

export {useFetch}