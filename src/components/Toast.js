import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import {
    Row,
    Col,
    Toast,
    Button
} from 'react-bootstrap';

export default function Toaster(props) {
    const [showA, setShowA] = useState(false);
    const [showB, setShowB] = useState(false);
    const email = useSelector((state) => state).email;

    const toggleShowA = () => setShowA(!showA);
    const toggleShowB = () => setShowB(!showB);


    useEffect(() => {
        if (props.currentUser.email) toggleShowA()
    }, [props.currentUser.email])

    useEffect(() => {
        setTimeout(() => {
            setShowA(false)
        }, 5000)
    }, [showA])


    return (<>
        <Toast show={showA} onClose={toggleShowA} animation={true}>
            <Toast.Header>
                <img
                    src="holder.js/20x20?text=%20"
                    className="rounded mr-2"
                    alt=""
                />
                <strong className="mr-auto text-success">Successful Log In</strong>
            </Toast.Header>
            <Toast.Body>Woohoo, welcome back {props.currentUser.email} !</Toast.Body>
        </Toast>
        <Toast onClose={toggleShowB} show={showB} animation={false}>
            <Toast.Header>
                <img
                    src="holder.js/20x20?text=%20"
                    className="rounded mr-2"
                    alt=""
                />
                <strong className="mr-auto">Successful Log Out</strong>
            </Toast.Header>
            <Toast.Body>Bye bye, See you again!</Toast.Body>
        </Toast>
    </>
    )
}
