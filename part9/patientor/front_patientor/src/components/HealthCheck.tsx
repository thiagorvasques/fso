import React from 'react';
import { Card, Container, Icon } from 'semantic-ui-react';
import { Entry } from '../types';

const HealthCheck: React.FC<{entry: Entry}> = ({entry}) => {
    console.log(entry);
    const [color, setColor] = React.useState<string>("grey");
    React.useEffect(() => {
        if(entry.type === "HealthCheck") {
            switch(entry.healthCheckRating){
                case 0:
                   return setColor("green");
                case 1:
                    return setColor("yellow");
                case 2:
                    return setColor ('red');
                case 3:
                    return setColor("dark red");
                default:
                    return setColor("grey");

            }
        }
        console.log(color);

    },[]);

    return (
        <Container>
            <Card fluid>
                <Card.Content>
                    <Card.Header>
                        {entry.date}
                        <Icon name="user md" size="large"></Icon>
                     </Card.Header>
                     <Card.Meta>{entry.description}</Card.Meta>
                     <Card.Description><i className="heart"></i></Card.Description>
                </Card.Content>
            </Card>
        </Container>
    );
};

export default HealthCheck;
