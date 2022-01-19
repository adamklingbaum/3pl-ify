import { Navbar, Container } from 'react-bootstrap';

function TopNav() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">3pl-ify</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default TopNav;
