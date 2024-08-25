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

    //console.log('data', data);

    const formatDate = (timestamp: string) => {
        const date = new Date(Number(timestamp) * 1000);
        return date.toLocaleString();
    };

    function formatHash(hash: string, numChars: number = 6): string {
        const firstPart = hash.substring(0, numChars);
        const lastPart = hash.substring(hash.length - numChars);
        return `${firstPart}...${lastPart}`;
    }



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
                        <TableCell>Created at</TableCell>
                        <TableCell>Block</TableCell>
                        <TableCell>Prover Stake</TableCell>
                        <TableCell>Verifier Stake</TableCell>
                        <TableCell>Step</TableCell>
                        <TableCell>Tern</TableCell>
                        <TableCell>Next timeout</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row: any) => {
                        return (
                            <TableRow key={row.interaction_id}>
                                <TableCell>
                                    <Link to={`/interaction/${row.interaction_id}`}>
                                        {formatHash(row.interaction_id)}
                                    </Link>
                                </TableCell>
                                <TableCell>{formatDate(row.init_datetime)}</TableCell>
                                <TableCell> block</TableCell>
                                <TableCell>{row.p_stake_amount}</TableCell>
                                <TableCell>{row.v_stake_amount}</TableCell>
                                <TableCell> / {row.total_steps}</TableCell>
                                <TableCell> - </TableCell>
                                <TableCell>{formatDate(row.next_timeout)}</TableCell>
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

