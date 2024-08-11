import React from 'react';
import Page from '../../components/Page';
import { useParams } from 'react-router-dom';
import useFetchInteraction from './useFetchIneraction';
import { Card, Container, Grid, Typography } from '@mui/material';

function Interaction() {
    const { id } = useParams<{ id: string }>();
    const { data, loading, error } = useFetchInteraction(id || '');


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data</div>;

    const headerProps = {
        title: 'Interaction',
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

            protocol.map((line, i) => {
                return (
                    <Grid container direction="row" key={i} spacing={3} columns={5}>
                        <Grid item xs={1}>
                            <Typography variant="h5" component="span" gutterBottom>
                                Step {line.step} / {data.totalsteps}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Card>{line.pTxId}</Card>
                        </Grid>
                        <Grid item xs={2}>
                            <Card>{line.vTxId}</Card>
                        </Grid>
                    </Grid>
                )
            })
        )

        // {<>
        //     !loading && protocol.map((line, i) => {
        //         return (
        //             console.log(line);
        //             {/* <Grid container direction="row" > */}
        //             <p>{i}*</p>
        //             {/* <Typography variant="h5" component="span" gutterBottom> */}
        //             {line.step}
        //             {/* </Typography> */}
        //             {/* <Card>{line.pTxId}</Card>
        //             <Card>{line.vTxId}</Card> */}
        //             {/* </Grid> */}

        //        )
        //     })
        //  </>}



    }
    function renderEquivocationZone() {

    }
    function renderFinalStep() { }

    return (
        <Page headerProps={headerProps}>
            {/* <Grid container spacing={3} direction='column'> */}
            {/* {renderStep0()} */}
            {renderMidSteps()}
            {/* {renderEquivocationZone()}
                {renderFinalStep()} */}
            {/* </Grid> */}
        </Page>
    );
}

export default Interaction;