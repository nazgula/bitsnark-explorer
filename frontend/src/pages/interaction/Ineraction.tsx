import React from 'react';
import Page from '../../components/Page';
import { Link, useParams } from 'react-router-dom';
import useFetchInteraction from './useFetchIneraction';
import { Card, CardContent, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import LabelAndValue from '../../components/LabelAndValue';
import { formatDate, formatHash } from '../../utils/utils';
import { useQuery } from '@tanstack/react-query';
import { fetchInteractions } from '../interactions-list/useFetchInteraction';
import CopyButton from '../../components/CopyButton';


function Interaction() {
    const { id } = useParams<{ id: string }>();
    const { data: interaction, error: interactionError, isLoading } = useQuery({ queryKey: ['Interactions'], queryFn: fetchInteractions });
    const { data, loading, error } = useFetchInteraction(id || '');

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data</div>;
    console.log('data', data, interaction, loading, error);

    const headerProps = {
        title: 'Interaction Protocol Steps',
        subTitle: 'Just the place for a Snark!'
    };


    function renderStakes() {
        return (
            <div className="flex flex-col w-full gap-4 px-16 pb-4">
                <Card variant="outlined" className="flex flex-col w-full items-left">
                    <CardContent className="flex justify-between">
                        <LabelAndValue label="Interaction Id" value={formatHash(data.interaction_id) || ''} isCopyButton={true} copyValue={data.interaction_id} className="whitespace-nowrap" classNameValue='text-xs' />
                        <LabelAndValue label="Initial Block" value='' className="whitespace-nowrap" classNameValue='text-xs' />
                        <LabelAndValue label="Initial Block timestamp" value={formatDate(data?.init_datetime) || ''} className="whitespace-nowrap" classNameValue='text-xs' />
                        <LabelAndValue label="Total Steps" value={data?.total_steps || ''} className="whitespace-nowrap" classNameValue='text-xs' />
                    </CardContent>
                </Card>
                <div className="flex flex-row items-center w-full gap-4">
                    <Card variant="outlined" className="w-full ">
                        <CardContent className="flex flex-row w-full items-left">
                            <LabelAndValue label="Prover Stake Tx" value={formatHash(data.p_stake_tx)} isCopyButton={true} copyValue={data.p_stake_tx} className="w-1/2 whitespace-nowrap" />
                            <LabelAndValue label="Prover Stake Amount" value={data.p_stake_amount} className="w-1/2 whitespace-nowrap" />
                        </CardContent>
                    </Card>
                    <Card variant="outlined" className="w-full ">
                        <CardContent className="flex flex-row w-full items-left">
                            <LabelAndValue label="Prover Stake Tx" value={formatHash(data.v_stake_tx)} isCopyButton={true} copyValue={data.v_stake_tx} className="w-1/2 whitespace-nowrap" />
                            <LabelAndValue label="Prover Stake Amount" value={data.v_stake_amount} className="w-1/2 whitespace-nowrap" />
                        </CardContent>
                    </Card>
                </div>

            </div>
        );
    }

    function renderProverTx(line: any, i: number) {
        return (
            <TableCell className={i === data.total_steps ? 'bg-gray-50' : ''}>
                {line.p_txid &&
                    <Link to={`/tx/${line.p_txid}`}>
                        <div className="flex flex-row items-center gap-2">
                            {formatHash(line.p_txid)}
                            <CopyButton copyValue={line.p_txid} className='mb-0' />
                        </div>
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
        );
    }

    function renderVerifierTx(line: any, i: number) {
        return (
            <TableCell className={i === data.total_steps ? 'bg-gray-50' : ''}>
                {line.v_txid &&
                    <Link to={`/tx/${line.v_txid}`}>
                        <div className="flex flex-row items-center gap-2">
                            {formatHash(line.v_txid)}
                            <CopyButton copyValue={line.v_txid} />
                        </div>

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
        );
    }
    function renderSteps() {
        const protocol = data.protocol || [];
        return (
            <>
                <Table stickyHeader={true} className="w-full pb-4">
                    <TableHead className="sticky top-0 z-10">
                        <TableRow >
                            <TableCell rowSpan={2}>Step</TableCell>
                            <TableCell colSpan={3}>Prover</TableCell>
                            <TableCell colSpan={3}>Verifier</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell>Block</TableCell>
                            <TableCell>Timestamp</TableCell>
                            <TableCell>Tx</TableCell>
                            <TableCell>Block</TableCell>
                            <TableCell>Timestamp</TableCell>
                            <TableCell>Tx</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {protocol.map((line: any, i: number) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell>{line.step} / {data.total_steps}</TableCell>
                                    <TableCell>{line.p_block_height}</TableCell>
                                    <TableCell>{line.p_tx_datetime}</TableCell>
                                    {renderProverTx(line, i)}
                                    <TableCell>{line.v_block_height}</TableCell>
                                    <TableCell>{line.v_tx_datetime}</TableCell>
                                    {renderVerifierTx(line, i)}
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
        );
    }

    return (
        <Page headerProps={headerProps} className=''>
            {renderStakes()}
            <div className="overscroll-y-contain overflow-scroll max-h-[36vh]">
                {renderSteps()}
            </div>
        </Page>
    );
}

export default Interaction;