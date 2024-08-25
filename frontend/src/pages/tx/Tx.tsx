import React from 'react';
import Page from '../../components/Page';
import { Link, useParams } from 'react-router-dom';
import useFetchTx from './useFetchTx';
import { Card, CardContent, Container, Grid, Tab, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { formatDate } from '../../utils/utils';


function Tx() {
    const { id } = useParams<{ id: string }>();
    const { data, loading, error } = useFetchTx(id || '');


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data</div>;


    const headerProps = {
        title: 'Tx Info',
        subTitle: "Just the place for a Snark!"
    };


    function calculateTotalValueIn(vin: any[]) {
        const totalValue = vin.reduce((acc, curr) => {
            acc += curr.prevout.value;
            return acc;
        }
            , 0);

        return (totalValue / 100000000).toFixed(8);
    }

    function renderLabelAndValue(label: string, value: string) {
        return (
            <>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" >
                    {label}
                </Typography>
                <Typography sx={{ fontSize: 16, marginBottom: 2 }} component="div" gutterBottom>
                    {value}
                </Typography>
            </>);
    }

    function renderLabelAndMap(label: string, values: string[]) {
        return (
            <>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" >
                    {label}
                </Typography>
                {
                    values.map((value) => (
                        <Typography sx={{ fontSize: 16 }} component="div" gutterBottom>
                            {value}
                        </Typography>
                    ))
                }

            </>);
    }

    function renderVin(vins: any[]) {
        return (
            vins.map((vin: any) => (
                <Card className="flex flex-col w-1/2 p-2 text-left">
                    <CardContent >
                        {renderLabelAndValue('', vin.txid)}
                        {renderLabelAndValue('Decoded', '***')}
                        {renderLabelAndValue('Previous Output Script', vin.prevout.scriptpubkey_asm)}
                        {renderLabelAndValue('Previous Output Script Type', vin.prevout.scriptpubkey_type)}
                        {renderLabelAndValue('Previous Output Script Address', vin.prevout.scriptpubkey_address)}
                        {renderLabelAndMap('Witness', vin.witness)}
                    </CardContent>
                </Card>
            ))
        )
    }

    function renderVout(vouts: any[]) {
        return (
            vouts.map((vout: any) => (
                <Card className="flex flex-col w-1/2 p-2 text-left">
                    <CardContent >
                        {renderLabelAndValue('Script Pub Key Address', vout.scriptpubkey_address)}
                        {renderLabelAndValue('Script Pub Key', vout.scriptpubkey_asm)}
                        {renderLabelAndValue('Script Pub Key Type', vout.scriptpubkey_type)}
                        {renderLabelAndValue('Value', (vout.value / 100000000).toFixed(8))}
                    </CardContent>
                </Card>
            ))
        )
    }

    return (
        <Page headerProps={headerProps} className="gap-8">
            <div className="p-8 text-md">
                {id}
            </div>
            <div className="flex flex-row gap-16" >
                <Card className="flex flex-col text-left w-72">
                    <CardContent >
                        {renderLabelAndValue('Block Height', data.raw_data.status.block_height)}
                        {renderLabelAndValue('Block Time', formatDate(data.raw_data.status.block_time))}
                        {renderLabelAndValue('Confirmed', data.raw_data.status.confirmed.toString())}
                    </CardContent>


                </Card>
                <Card className="flex flex-col text-left w-72">
                    <CardContent>
                        {renderLabelAndValue('Total value In', calculateTotalValueIn(data.raw_data.vin || []))}
                        {renderLabelAndValue('Fee', data.raw_data.fee.toLocaleString())}
                        {renderLabelAndValue('Size', data.raw_data.size)}
                        {renderLabelAndValue('Version', data.raw_data.version)}
                    </CardContent>
                </Card>
            </div>

            <div className="flex flex-row justify-center w-full gap-16" >
                {data.raw_data.vin && renderVin(data.raw_data.vin)}
                {data.raw_data.vout && renderVout(data.raw_data.vout)}
            </div>


        </Page>
    );
}

export default Tx;