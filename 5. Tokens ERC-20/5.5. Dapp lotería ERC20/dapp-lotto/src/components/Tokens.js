import { Button, Card, Col, Container, Form, Row, Spinner } from 'react-bootstrap';

import Notification from './Notification';
import { useState } from 'react';

const Tokens = ({contract, account}) => {
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState('');
    const [ success, setSuccess ] = useState('');
    const [ to, setTo ] = useState('');
    const [ amount, setAmount ] = useState(0);
    const [ increment, setIncrement ] = useState(0);

    const getTokens = async (to, amount) => {
        const ethers = amount * .5;

        setLoading(true);
        setError('');

        try{
            await contract.methods.buyTokens(to, amount).send({
                from: account,
                value: window.web3.utils.toWei(ethers.toString(), 'ether')
            });
            
            setSuccess(`Acabas de comprar ${amount} token${amount > 1 ? 's' : ''}`);
        }catch(err){
            setError(err.message)
        }finally{
            setLoading(false);
        }
    }

    const getBalance = async () => {
        setLoading(true);
        setError('');

        try{
            const total = await contract.methods.balanceOf(account).call();
            setSuccess(`Esta cuenta tiene un balance de ${total} token${total > 1 ? 's' : ''}`);
        }catch(err){
            setError(err.message)
        }finally{
            setLoading(false);
        }
    }

    const getContractBalance = async () => {
        setLoading(true);
        setError('');

        try{
            const total = await contract.methods.availableTokens().call();
            setSuccess(`Este contrato tiene un balance de ${total} token${total > 1 ? 's' : ''}`);
        }catch(err){
            setError(err.message)
        }finally{
            setLoading(false);
        }
    }

    const increaseTotalSupply = async (amount) => {
        setLoading(true);
        setError('');

        try{
            await contract.methods.createTokens(amount).send({ from: account });
            setSuccess(`Balance de tokens del contrato incrementado en ${amount} token${amount > 1 ? 's' : ''}`);
        }catch(err){
            setError(err.message)
        }finally{
            setLoading(false);
        }
    }

    return (
        <Container as="section" className="d-flex flex-column gap-4 content my-4">
            <h1 className="text-center my-4">Gestión de tokens</h1>
            <Notification message={error} type="danger" clear={() => setError('')} />
            <Notification message={success} type="success" clear={() => setSuccess('')} />
            <Row className="gx-4 gy-4">
                <Col xs={12}>
                    <Card className="bg-light">
                        <Card.Body>
                            <Card.Title className="mb-4">
                                Compra de Tokens
                            </Card.Title>
                            <Form className="d-flex flex-column gap-4" onSubmit={(e) => {
                                e.preventDefault();
                                getTokens(to, amount)
                            } }>
                                <Form.Control value={to} onChange={ (e) => setTo(e.target.value) } type="text" placeholder="Comprar para..." />
                                <Form.Control value={amount} onChange={ (e) => setAmount(e.target.value) } type="number" placeholder="Cantidad" />
                                <Button disabled={loading} variant="success" type="submit">
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
                <Col md={6}>
                    <Card className="bg-light">
                        <Card.Body>
                            <Card.Title className="mb-4">
                                Balance de tokens
                            </Card.Title>
                            <Form className="d-flex flex-column gap-4" onSubmit={(e) => {
                                e.preventDefault();
                                getBalance(to)
                            } }>
                                <Form.Control value={to} onChange={ (e) => {
                                    setTo(e.target.value)
                                } } type="text" placeholder="Comprar para..." />
                                <Button disabled={loading} variant="warning" type="submit">
                                    { loading ? 
                                        <Spinner className="mr- 4" role="status" aria-busy="true" animation="border" size="sm" /> :
                                        null 
                                    }
                                    Ver balance cuenta
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>                          
                <Col md={6}>
                    <Card className="bg-light">
                        <Card.Body>
                            <Card.Title className="mb-4">
                                Incrementar tokens disponibles
                            </Card.Title>
                            <Form className="d-flex flex-column gap-4" onSubmit={(e) => {
                                e.preventDefault();
                                increaseTotalSupply(increment)
                            } }>
                                <Form.Control value={increment} onChange={ (e) => setIncrement(e.target.value) } type="number" placeholder="Cantidad a incrementar" />
                                <Button disabled={loading} variant="danger" type="submit">
                                    { loading ? 
                                        <Spinner className="mr- 4" role="status" aria-busy="true" animation="border" size="sm" /> :
                                        null 
                                    }
                                    Incrementar
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>               
                </Col>                 
                <Col xs={12}>
                    <Card className="bg-light">
                        <Card.Body>
                            <Card.Title className="mb-4">
                                Balance del contrato
                            </Card.Title>
                            <Form className="d-flex flex-column gap-4" onSubmit={(e) => {
                                e.preventDefault();
                                getContractBalance()
                            } }>
                                <Button disabled={loading} variant="primary" type="submit">
                                    { loading ? 
                                        <Spinner className="mr- 4" role="status" aria-busy="true" animation="border" size="sm" /> :
                                        null 
                                    }
                                    Ver balance contrato
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>               
                </Col>
            </Row>
        </Container>
    )
}

export default Tokens;