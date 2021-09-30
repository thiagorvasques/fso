import React from 'react';
import { Entry } from '../types';
import { Container, Card, Icon} from 'semantic-ui-react';

const OccupationalHealthcare: React.FC<{entry: Entry}> = ({entry}) => {
    console.log(entry);

    return (
        <Container>
            <Card fluid>
                <Card.Content>
                    <Card.Header>
                        {entry.date}
                        <Icon name="stethoscope" size="large"></Icon>
                     </Card.Header>
                     <Card.Meta>{entry.description}</Card.Meta>
                </Card.Content>
            </Card>
        </Container>
    );
};

export default OccupationalHealthcare;
