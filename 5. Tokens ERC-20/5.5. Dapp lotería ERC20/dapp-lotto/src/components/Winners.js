import { Button, Card, Col, Container, Form, Row, Spinner } from 'react-bootstrap';

import Notification from './Notification';
import { useState } from 'react';

const Lotto = ({contract, account}) => {
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState('');
    const [ success, setSuccess ] = useState('');

    const generateWinner = async () => {
        setLoading(true);
        setError('');

        try{            
            await contract.methods.generateWinner().call();
            setSuccess(`Ganador del sorteo generado.`);
        }catch(err){
            setError(err.message)
        }finally{
            setLoading(false);
        }
    }

    const getWinner = async () => {
        setLoading(true);
        setError('');

        try{            
            const winnerAddress = await contract.methods.winner_address().call();
            setSuccess(`El ganador del sorteo es ${winnerAddress}`);
        }catch(err){
            setError(err.message)
        }finally{
            setLoading(false);
        }
    }

    return (
        <Container as="section" className="d-flex flex-column gap-4 content my-4">
            <h1 className="text-center my-4">Premios de la lotería</h1>
            <Notification message={error} type="danger" clear={() => setError('')} />
            <Notification message={success} type="success" clear={() => setSuccess('')} />
            <Row className="gx-4 gy-4">
                <Col sm={12} md={6}>
                    <Card className="bg-light">
                        <Card.Body>
                            <Card.Title className="mb-4">
                               Generar ganador
                            </Card.Title>
                            <Form className="d-flex flex-column gap-4" onSubmit={(e) => {
                                e.preventDefault();
                                generateWinner()
                            } }>
                                <Button disabled={loading} variant="warning" type="submit">
                                    { loading ? 
                                        <Spinner className="mr- 4" role="status" aria-busy="true" animation="border" size="sm" /> :
                                        null 
                                    }
                                    Generar
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>               
                </Col>
                <Col sm={12} md={6}>
                    <Card className="bg-light">
                        <Card.Body>
                            <Card.Title className="mb-4">
                               Consultar ganador
                            </Card.Title>
                            <Form className="d-flex flex-column gap-4" onSubmit={(e) => {
                                e.preventDefault();
                                getWinner()
                            } }>
                                <Button disabled={loading} variant="success" type="submit">
                                    { loading ? 
                                        <Spinner className="mr- 4" role="status" aria-busy="true" animation="border" size="sm" /> :
                                        null 
                                    }
                                    Ver
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>               
                </Col>
            </Row>
        </Container>
    )
}

export default Lotto;