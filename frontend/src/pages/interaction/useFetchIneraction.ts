import { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';

export interface ProtocolStep {
    id: string,
    pTxId: string,
    vTxId: string,
    step: string,
    timeout: string
}

export interface Interaction {
    id: string,
    tern: string,
    protocol: ProtocolStep[]
}

const useFetchInteraction = <T>(id: string) => {
    const [data, setData] = useState<Interaction>({ id: '', tern: '', protocol: [] });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(`/getIneraction/${id}`);
                if (response && response.data) {

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