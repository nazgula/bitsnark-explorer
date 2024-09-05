import { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';
import { QueryFunctionContext } from '@tanstack/react-query';
import { ProtocolStep } from '../interaction/useFetchIneraction';

export interface InteractionListItem {
    interaction_id: string,
    total_steps: number,
    init_datetime: number,
    v_stake_amount: number,
    v_stake_tx: string,
    p_stake_amount: number,
    p_stake_tx: string,
    next_timeout: number,
    status: string
}

// const useFetchInteractions = <T>() => {
//     const [data, setData] = useState<InteractionListItem[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axiosInstance.get(`/getInteractions`);
//                 if (response && response.data) {
//                     console.log('response', response);
//                     setData(response.data);
//                 }
//             } catch (err) {
//                 setError('Error fetching data');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     return { data, loading, error };
// };


export const fetchInteractions = async (): Promise<I> => {
    //get key if exists
    // const key = queryKey[0];
    const apiRes = await axiosInstance.get(`/getInteractions`);

    if (!apiRes || !apiRes.data) {
        throw new Error(`getInteractions fetch not ok`);
    }

    return apiRes.data; //{ data: apiRes.data, status: apiRes.status, statusText: apiRes.statusText };;
};


const useFetchInteractions = <T>() => {
    const [data, setData] = useState<InteractionListItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(`/getInteractions`);
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

export default useFetchInteractions;