import React, {useState, useEffect} from 'react';
import { Navbar, Nav, Form, FormControl, Button, Popover, OverlayTrigger } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';


export default function Navigation() {
    const currentUser = useSelector((state) => state)
    let history = useHistory();

    const dispatch = useDispatch();

    const onSignOut = (e) => {
        e.preventDefault();
        dispatch({ type: 'SIGN_OUT' })
        history.push('/')
    }

    useEffect(() => {
        !currentUser.email && history.push('/')
    }, [currentUser])

    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className="mb-4">
            <Navbar.Brand><Link className='navbar-brand' to='/'>Da Page</Link></Navbar.Brand>
            {currentUser.email &&
            <span className='nav-link userNavbar'>
                <strong>{currentUser.email}</strong> logined 
                <Button variant="light" bg="light" className="btn-outline-secondary ml-4" onClick={(e) => onSignOut(e)}>Sign out</Button>
            </span>}
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Link className='nav-link' to='/' >Home</Link>
                    <Link className='nav-link' to='/candidates'>Candidates</Link>
                    <Link className='nav-link' to='/company'>Company</Link>
                </Nav>
                <Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-primary">Search</Button>
                    </Form>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
