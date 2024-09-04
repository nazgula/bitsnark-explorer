import React from 'react';
import Page from '../../components/Page';
import { Link, useParams } from 'react-router-dom';
import useFetchInteraction from './useFetchIneraction';
import { Card, CardContent, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import LabelAndValue from '../../components/LabelAndValue';
import { formatHash } from '../../utils/utils';


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

    function renderStakes() {
        console.log('p_txid', data.protocol[0].p_txid);
        return (
            <div className="flex flex-col w-full gap-4 px-16 pb-4">
                <Card variant="outlined" className="flex flex-col w-full items-left">
                    <CardContent className="flex justify-between">
                        <LabelAndValue label="Interaction Id" value={123} className="whitespace-nowrap" classNameValue='text-xs' />
                        <LabelAndValue label="Initial Block" value='56a4f654a546fde54abcd7afaad012ad948cb01aa7be' className="whitespace-nowrap" classNameValue='text-xs' />
                        <LabelAndValue label="Initial Block height" value={data.protocol[0].v_txid} className="whitespace-nowrap" classNameValue='text-xs' />
                        <LabelAndValue label="Status" value='XXX' className="whitespace-nowrap" classNameValue='text-xs' />
                    </CardContent>
                </Card>
                <div className="flex flex-row items-center w-full gap-4">
                    <Card variant="outlined" className="w-full ">
                        <CardContent className="flex flex-row w-full items-left">
                            <LabelAndValue label="Prover Stake Tx" value={formatHash(data.protocol[0].p_txid)} className="w-1/2 whitespace-nowrap" />
                            <LabelAndValue label="Prover Stake Amount" value={data.total_steps} className="w-1/2 whitespace-nowrap" />
                        </CardContent>
                    </Card>
                    <Card variant="outlined" className="w-full ">

                        <CardContent className="flex flex-row w-full items-left">
                            <LabelAndValue label="Prover Stake Tx" value={formatHash(data.protocol[0].p_txid)} className="w-1/2 whitespace-nowrap" />
                            <LabelAndValue label="Prover Stake Amount" value={data.total_steps} className="w-1/2 whitespace-nowrap" />

                        </CardContent>
                    </Card>
                </div>

            </div>
        );
    }

    function renderMidSteps() {
        const protocol = data.protocol || [];
        return (
            <>
                {/* {renderStakes(data.protocol[0]?.p_txid || '', data.protocol[0].v_txid || '')} */}


                <Table stickyHeader={true} className="w-full pb-4">
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
        <Page headerProps={headerProps} className=''>
            {renderStakes()}
            <div className="overscroll-y-contain overflow-scroll max-h-[36vh]">
                {renderMidSteps()}
            </div>
        </Page>
    );
}

export default Interaction;