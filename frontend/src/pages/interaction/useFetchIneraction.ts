import { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';

export interface ProtocolStep {
    id: string,
    p_txid: string,
    v_txid: string,
    step: string,
    p_response_timeout: string,
    v_response_timeout: string
}

export interface Interaction {
    id: string,
    tern: string,
    total_steps: number,
    protocol: ProtocolStep[]
}

const useFetchInteraction = <T>(id: string) => {
    const [data, setData] = useState<Interaction>({ id: '', total_steps: 0, tern: '', protocol: [] });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(`/getInteraction/${id}`);
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