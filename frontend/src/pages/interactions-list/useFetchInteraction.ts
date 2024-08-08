import { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';

export interface InteractionListItem {
    initTx: string,
    step: number,
    total: number,
    tern: string,
    timeout: string,
}

const useFetchInteraction = <T>() => {
    const [data, setData] = useState<InteractionListItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(`/getIneractions`);
                if (response && response.data) {
                    console.log('response', response);

                    setData(response.data);
                }
            } catch (err) {
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
};

export default useFetchInteraction;