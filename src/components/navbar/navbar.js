import { Navbar, NavbarBrand } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function BarraNavegacao() {
    return (
        <Navbar color="dark" dark expand="md">
            <NavbarBrand tag={Link} to="/">Github users</NavbarBrand>
        </Navbar>
    );
}