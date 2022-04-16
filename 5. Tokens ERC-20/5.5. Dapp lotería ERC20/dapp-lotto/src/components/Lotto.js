import { Button, Card, Col, Container, Form, Row, Spinner } from 'react-bootstrap';

import Notification from './Notification';
import { useState } from 'react';

const Lotto = () => {
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState('');
    const [ success, setSuccess ] = useState('');

    return (
        <Container as="section" className="d-flex flex-column gap-4 content my-4">
            <h1 className="text-center my-4">Gestión de boletos</h1>
            <Notification message={error} type="danger" clear={() => setError('')} />
            <Notification message={success} type="success" clear={() => setSuccess('')} />
            <Row className="gx-4 gy-4">
            </Row>
        </Container>
    )
}

export default Lotto;