import React from 'react';
import Page from '../../components/Page';
import { Link, useParams } from 'react-router-dom';
import useFetchTx from './useFetchTx';
import { Card, Container, Grid, Tab, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';


function Tx() {
    const { id } = useParams<{ id: string }>();
    const { data, loading, error } = useFetchTx(id || '');


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data</div>;

    const headerProps = {
        title: 'Tx Info',
        subTitle: id
    };

    return (
        <Page headerProps={headerProps}>
            <div className="flex flex-col justify-center overflow-y-scroll">
                <div className="flex flex-row justify-between">
                    {data.status.confirmed}
                </div>

                {/* <div className="flex flex-row justify-between">
                    {JSON.stringify(data)}
                </div> */}

            </div>

        </Page>
    );
}

export default Tx;