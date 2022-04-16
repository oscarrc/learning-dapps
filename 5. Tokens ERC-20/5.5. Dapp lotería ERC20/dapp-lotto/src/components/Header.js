import { Container, Nav, Navbar } from 'react-bootstrap';

import { Link } from 'react-router-dom';

const Header = ({account}) => {
    return (
        <Navbar collapseOnSelect expand="lg" fixed="top"  bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">DApp Lotto</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">                    
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Tokens</Nav.Link>
                        <Nav.Link as={Link} to="/lotto">Lotto</Nav.Link>
                        <Nav.Link as={Link} to="/winers">Winners</Nav.Link>
                    </Nav>                    
                    <Nav>
                        <Nav.Item>
                            <span className="badge bg-secondary">{account}</span>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;