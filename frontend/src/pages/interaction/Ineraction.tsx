import React from 'react';
import Page from '../../components/Page';
import { Link, useParams } from 'react-router-dom';
import useFetchInteraction from './useFetchIneraction';
import { Card, Container, Grid, Tab, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import Step from './Step';

function Interaction() {
    const { id } = useParams<{ id: string }>();
    const { data, loading, error } = useFetchInteraction(id || '');


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data</div>;

    const headerProps = {
        title: 'Interaction Protocol Steps',
        subTitle: 'Just the place for a Snark!'
    };


    function renderStep0() {
        return (
            <Grid item direction="row" xs={12}>
                <Card></Card>
                <Card></Card>
            </Grid>
        )
    }
    function renderMidSteps() {
        const protocol = data.protocol || [];
        return (

            // protocol.map((line, i) => {
            //     return (
            //         <Step key={i} line={line} totalsteps={data.totalSteps} />
            //     )
            // })

            <Table stickyHeader={true}>
                <TableHead>
                    <TableRow>
                        <TableCell>Step</TableCell>
                        <TableCell>Prover</TableCell>
                        <TableCell>Verifier</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {protocol.map((line: any, i: number) => {
                        return (
                            <TableRow key={i}>
                                <TableCell>{line.step} / {data.totalSteps}</TableCell>
                                <TableCell>
                                    {line.pTxId &&
                                        <Link to={`/tx/${line.pTxId}`}>
                                            {line.pTxId}
                                        </Link>
                                    }
                                    {!line.pTxId &&
                                        <span className="text-red-500">
                                            Time out: ${line.timeout}
                                        </span>
                                    }

                                </TableCell>
                                <TableCell >
                                    {line.vTxId &&
                                        <Link to={`/tx/${line.pTxId}`}>
                                            {line.vTxId}
                                        </Link>
                                    }
                                    {!line.vTxId &&
                                        <span className="font-bold">
                                            Timeout at: {line.timeout}
                                        </span>
                                    }

                                    {/* <span className={!line.vTxId ? 'text-red-500' : ''}>
                                        {line.vTxId ? line.vTxId : `Time out: ${line.timeout}`}
                                    </span> */}
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table >
            // protocol.map((line, i) => {
            //         return (

            //         )
            //     })
        )





    }
    function renderEquivocationZone() {

    }
    function renderFinalStep() { }

    return (
        <Page headerProps={headerProps}>
            <div className="flex flex-col justify-center overflow-y-scroll">
                {/* <Grid container spacing={3} direction='column'> */}
                {/* {renderStep0()} */}
                {renderMidSteps()}
                {/* {renderEquivocationZone()}
                {renderFinalStep()} */}
                {/* </Grid> */}
            </div>
        </Page>
    );
}

export default Interaction;