import React, {useState, useEffect} from 'react';
import {
    Col,
    Form,
    Button,
}  from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function LoginPage() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    let history = useHistory();

    const dispatch = useDispatch();
    const currentUser = useSelector((state)=> state)
    // console.log('LIP',currentUser)

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: 'SIGN_IN', payload : { email: email, password: password } })
    }

    return (
        <div className="">
            <Col md={12}>
                <h1 className="my-5">SIGN IN</h1>
                <Form className="border-gray w-30">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            required
                            autofocus
                            type="email"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={(e) => onSubmit(e)}>
                        Sign In
                    </Button>
                </Form>
            </Col>
        </div>
    )
}
