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
        subTitle: "Just the place for a Snark!"
    };

    return (
        <Page headerProps={headerProps}>
            <div className="p-8 text-md">
                {id}
            </div>
            <div className="flex w-1/2 gap-2 text-gray-700 items-left justify-left">
                <Table>
                    <TableRow className="">
                        <TableCell className="font-bold w-50" >Status:</TableCell>
                        <TableCell className="float-right" >
                            {data.status.confirmed ? 'Confirmed' : 'Unconfirmed'}
                        </TableCell>
                    </TableRow>
                    <TableRow className="">
                        <TableCell className="font-bold w-50" >In Block:</TableCell>
                        <TableCell className="float-right" >
                            {data.status.block_hash}
                        </TableCell>
                    </TableRow>
                    <TableRow className="">
                        <TableCell className="font-bold w-50" >Block Hight:</TableCell>
                        <TableCell className="float-right" >
                            {data.status.block_height}
                        </TableCell>
                    </TableRow>
                    <TableRow className="">
                        <TableCell className="font-bold w-50" >Block Timestamp:</TableCell>
                        <TableCell className="float-right" >
                            {new Date(data.status.block_time * 1000).toLocaleString()}
                        </TableCell>
                    </TableRow>


                    <TableRow className="">
                        <TableCell className="font-bold w-50" >Tx Fee:</TableCell>
                        <TableCell className="float-right" >
                            {data.fee}
                        </TableCell>
                    </TableRow>
                    <TableRow className="">
                        <TableCell className="font-bold w-50" >Tx Size:</TableCell>
                        <TableCell className="float-right" >
                            {data.size}
                        </TableCell>
                    </TableRow>
                    {/* <TableRow className="">
                        <TableCell className="font-bold w-50" >Tx Virtual Size:</TableCell>
                        <TableCell className="float-right" >
                            {data.vsize}
                        </TableCell>
                    </TableRow> */}

                    <TableRow className="">
                        <TableCell className="font-bold w-50" >Version:</TableCell>
                        <TableCell className="float-right" >
                            {data.version}
                        </TableCell>
                    </TableRow>

                    <TableRow className="">
                        <TableCell className="font-bold w-50" >Lock Time:</TableCell>
                        <TableCell className="float-right" >
                            {data.locktime}
                        </TableCell>
                    </TableRow>
                </Table>

            </div>


        </Page>
    );
}

export default Tx;