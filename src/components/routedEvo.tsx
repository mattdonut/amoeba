import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import EvoContainer from './evo'

type PathProps = {
    id: string
};

type PropTypes = RouteComponentProps<PathProps> & {};

const RoutedEvo = (props: PropTypes) => {
    const { match } = props;
    return (
        <EvoContainer evoId={Number(match.params.id)}></EvoContainer>
    );
};


export default RoutedEvo;
