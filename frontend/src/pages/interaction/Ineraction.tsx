import React from 'react';
import Page from '../../components/Page';
import { Link, useParams } from 'react-router-dom';
import useFetchInteraction from './useFetchIneraction';
import { Card, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';


function Interaction() {
    const { id } = useParams<{ id: string }>();
    const { data, loading, error } = useFetchInteraction(id || '');


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data</div>;

    const headerProps = {
        title: 'Interaction Protocol Steps',
        subTitle: 'Just the place for a Snark!'
    };

    //console.log('data', data);

    function renderStep0() {
        return (
            <Grid item direction="row" xs={12}>
                <Card></Card>
                <Card></Card>
            </Grid>
        )
    }

    function renderStakes(pStake: string, vStake: string) {
        return (
            <Table stickyHeader={true}>
                <TableHead>
                    <TableRow>
                        <TableCell ></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow key={-2} className="font-bold">
                        <TableCell>Stakes</TableCell>
                        <TableCell >
                            {pStake}
                        </TableCell>
                        <TableCell >
                            {vStake}
                        </TableCell>
                    </TableRow>
                    <TableRow key={-1} className="font-bold">
                        <TableCell></TableCell>
                        <TableCell >
                            0.005 bitcoin
                        </TableCell>
                        <TableCell >
                            0.005 bitcoin
                        </TableCell>
                    </TableRow>
                </TableBody>

            </Table >
        )
    }
    function renderMidSteps() {
        const protocol = data.protocol || [];
        return (
            <>
                {renderStakes(data.protocol[0]?.p_txid || '', data.protocol[0].v_txid || '')}


                <Table stickyHeader={true} className="py-4">
                    <TableHead>
                        <TableRow>
                            <TableCell >Step</TableCell>
                            <TableCell>Prover</TableCell>
                            <TableCell>Verifier</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {protocol.map((line: any, i: number) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell>{line.step} / {data.total_steps}</TableCell>
                                    <TableCell className={i === data.total_steps ? 'bg-gray-50' : ''}>
                                        {line.p_txid &&
                                            <Link to={`/tx/${line.p_txid}`}>
                                                {line.p_txid}
                                            </Link>
                                        }
                                        {!line.p_txid && !line.v_txid &&
                                            <span className="text-red-500">
                                                Time out: {line.timeout}
                                            </span>
                                        }

                                        {!line.p_txid && line.v_txid &&
                                            <>
                                                {/* <span className="">
                                                    * For the snark was a boojum, you see.
                                                </span> */}

                                                <span className="float-right text-red-500">
                                                    Equivocation &gt;&gt;
                                                </span>
                                            </>
                                        }

                                    </TableCell>
                                    <TableCell className={i === data.total_steps ? 'bg-gray-50' : ''}>
                                        {line.v_txid &&
                                            <Link to={`/tx/${line.p_txid}`}>
                                                {line.v_txid}

                                            </Link>
                                        }
                                        {!line.v_txid && i !== data.total_steps &&
                                            <span className="font-bold">
                                                Timeout at: {line.timeout}
                                            </span>
                                        }
                                        {line.p_txid && !line.v_txid && i === data.total_steps &&
                                            <>


                                                <span className="text-green-700 ">
                                                    &lt;&lt; Proved
                                                </span>
                                                {/* <span className="float-right ">
                                                    * What I tell you three times is true.
                                                </span> */}
                                            </>
                                        }


                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table >

                <div className="p-4">

                    {data.total_steps === protocol.length - 1 &&
                        protocol[protocol.length - 1].p_txid &&
                        <span className="">
                            What I tell you three times is true.
                        </span>
                    }

                    {data.total_steps === protocol.length - 1 &&
                        protocol[protocol.length - 1].v_txid &&
                        <span className="">
                            For the snark was a boojum, you see.
                        </span>
                    }
                </div>
            </>

        )





    }
    function renderEquivocationZone() {

    }
    function renderFinalStep() { }

    return (
        <Page headerProps={headerProps}>

            {renderMidSteps()}

        </Page>
    );
}

export default Interaction;