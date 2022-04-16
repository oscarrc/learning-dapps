import { Button, Card, Col, Container, Form, Row, Spinner } from 'react-bootstrap';

import Notification from './Notification';
import { useState } from 'react';

const Lotto = ({contract, account}) => {
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState('');
    const [ success, setSuccess ] = useState('');
    const [ amount, setAmount ] = useState(0);

    const getJackpot = async () => {
        setLoading(true);
        setError('');

        try{
            const total = await contract.methods.jackpot().call();
            setSuccess(`El bote es de ${total} token${total > 1 ? 's' : ''}`);
        }catch(err){
            setError(err.message)
        }finally{
            setLoading(false);
        }
    }

    const getTicketPrice = async () => {
        setLoading(true);
        setError('');

        try{
            const total = await contract.methods.ticketPrice().call();
            setSuccess(`El precio del boleto es de ${total} token${total > 1 ? 's' : ''}`);
        }catch(err){
            setError(err.message)
        }finally{
            setLoading(false);
        }
    }

    const buyTickets = async (amount) => {
        setLoading(true);
        setError('');

        try{
            const price = await contract.methods.ticketPrice().call();
            const total = price*amount
            await contract.methods.buyTickets(amount).send({
                from: account
            });

            setSuccess(`Has comprado ${amount} boleto${amount > 1 ? 's' : ''} por un total de ${total} token${total > 1 ? 's' : ''}`);
        }catch(err){
            setError(err.message)
        }finally{
            setLoading(false);
        }
    }

    const getTickets = async (amount) => {
        setLoading(true);
        setError('');

        try{            
            const tickets = await contract.methods.viewTickets().call();
            setSuccess(`Tienes ${tickets.length } ticket${tickets.length > 1 ? 's' : ''}: ${tickets.join(', ')}`);
        }catch(err){
            setError(err.message)
        }finally{
            setLoading(false);
        }
    }

    return (
        <Container as="section" className="d-flex flex-column gap-4 content my-4">
            <h1 className="text-center my-4">Gestión de boletos</h1>
            <Notification message={error} type="danger" clear={() => setError('')} />
            <Notification message={success} type="success" clear={() => setSuccess('')} />
            <Row className="gx-4 gy-4">   
                <Col sm={12} md={6}>
                    <Card className="bg-light">
                        <Card.Body>
                            <Card.Title className="mb-4">
                                Consulta de bote
                            </Card.Title>
                            <Form className="d-flex flex-column gap-4" onSubmit={(e) => {
                                e.preventDefault();
                                getJackpot()
                            } }>
                                <Button disabled={loading} variant="success" type="submit">
                                    { loading ? 
                                        <Spinner className="mr- 4" role="status" aria-busy="true" animation="border" size="sm" /> :
                                        null 
                                    }
                                    Ver bote
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>               
                </Col>
                <Col sm={12} md={6}>
                    <Card className="bg-light">
                        <Card.Body>
                            <Card.Title className="mb-4">
                                Consulta de precio
                            </Card.Title>
                            <Form className="d-flex flex-column gap-4" onSubmit={(e) => {
                                e.preventDefault();
                                getTicketPrice()
                            } }>
                                <Button disabled={loading} variant="primary" type="submit">
                                    { loading ? 
                                        <Spinner className="mr- 4" role="status" aria-busy="true" animation="border" size="sm" /> :
                                        null 
                                    }
                                    Ver precio boleto
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>               
                </Col>
                <Col xs={12}>
                    <Card className="bg-light">
                        <Card.Body>
                            <Card.Title className="mb-4">
                                Compra de boletos
                            </Card.Title>
                            <Form className="d-flex flex-column gap-4" onSubmit={(e) => {
                                e.preventDefault();
                                buyTickets(amount)
                            } }>
                                <Form.Control value={amount} onChange={ (e) => setAmount(e.target.value) } type="number" placeholder="Cantidad a incrementar" />
                                <Button disabled={loading} variant="danger" type="submit">
                                    { loading ? 
                                        <Spinner className="mr- 4" role="status" aria-busy="true" animation="border" size="sm" /> :
                                        null 
                                    }
                                    Comprar
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>               
                </Col>  
                <Col xs={12}>
                    <Card className="bg-light">
                        <Card.Body>
                            <Card.Title className="mb-4">
                                Mis boletos
                            </Card.Title>
                            <Form className="d-flex flex-column gap-4" onSubmit={(e) => {
                                e.preventDefault();
                                getTickets()
                            } }>
                                <Button disabled={loading} variant="warning" type="submit">
                                    { loading ? 
                                        <Spinner className="mr- 4" role="status" aria-busy="true" animation="border" size="sm" /> :
                                        null 
                                    }
                                    Consultar mis voletos
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