import { Alert, Collapse } from 'react-bootstrap'

const Notification = ({message, type, clear}) => {
    return (
        <Collapse in={message}>
            <div>
                <Alert variant={type} onClose={clear} dismissible>
                    <Alert.Heading>{ message }</Alert.Heading>
                </Alert>
            </div>
        </Collapse>  
    )
}

export default Notification;