import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";


function NavbarComp({activeBtn}) {
  return (
    <>
      <Navbar bg="light" data-bs-theme="light" fixed="top" className="shadow p-3">
        <Container>
        <Navbar.Brand href="/">
            Days Off Schedule
          </Navbar.Brand>
          <Nav className="me-auto">

            <Link to="/">
              <Button variant="btn btn-outline-info mx-3" className={activeBtn===1 ? 'active' : ''}>Register</Button>
              </Link>
            <Link to="/employees">
              <Button variant="btn btn-outline-info" className={activeBtn===2 ? 'active' : ''}>Employees</Button>
              </Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComp;
