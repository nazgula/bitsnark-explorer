import React from 'react';
import Page from '../../components/Page';
import { useParams } from 'react-router-dom';
import useFetchInteraction from './useFetchIneraction';
import { Card, Container, Grid, Typography } from '@mui/material';
import Step from './Step';

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
                    <Step key={i} line={line} totalsteps={data.totalSteps} />
                )
            })
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