import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react'
import useFetchInteraction from './useFetchInteraction';
import Page from '../../components/Page';

function InteractionList() {
    const { data, loading, error } = useFetchInteraction();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data</div>;

    const pageProps = {
        title: 'Interaction List',
        subTitle: 'Just the place for a Snark!'
    };

    return (
        <Page headerProps={pageProps}>
            <Table stickyHeader={true}>
                <TableHead>
                    <TableRow>
                        <TableCell>Initial Tx</TableCell>
                        <TableCell>Step</TableCell>
                        <TableCell>Tern</TableCell>
                        <TableCell>Timeout</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row: any) => {
                        return (
                            <TableRow key={row.initTx}>
                                <TableCell>{row.initTx}</TableCell>
                                <TableCell>{row.step} / {row.total}</TableCell>
                                <TableCell>{row.tern}</TableCell>
                                <TableCell>{row.timeout}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </Page>
    )
}

export default InteractionList

