import { Chip, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react'
import useFetchInteractions from './useFetchInteraction';
import Page from '../../components/Page';
import { Link } from 'react-router-dom';

function InteractionList() {
    const { data, loading, error } = useFetchInteractions();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data</div>;

    const pageProps = {
        title: 'Bitsnark Explorer',
        subTitle: 'Just the place for a Snark!'
    };

    return (
        <Page headerProps={pageProps}>
            <div className="flex gap-4 p-8">
                <Chip label="All" />
                <Chip label="New" variant="outlined" />
                <Chip label="Proved" variant="outlined" />
                <Chip label="Disproved" variant="outlined" />
                <Chip label="Timedout" variant="outlined" />
            </div>
            <Table stickyHeader={true} className="flex px-24 py-8">
                <TableHead>
                    <TableRow>
                        <TableCell>Initial Tx</TableCell>
                        <TableCell>Step</TableCell>
                        <TableCell>Tern</TableCell>
                        <TableCell>Timeout</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row: any) => {
                        return (
                            <TableRow key={row.initTx}>
                                <TableCell>
                                    <Link to={`/interaction/${row.initTx}`}>
                                        {row.initTx}
                                    </Link>
                                </TableCell>
                                <TableCell>{row.step} / {row.total}</TableCell>
                                <TableCell>{row.tern}</TableCell>
                                <TableCell>{row.timeout}</TableCell>
                                <TableCell>{row.status}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </Page>
    )
}

export default InteractionList

