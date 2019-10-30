import React, { useState, useEffect } from 'react'
import { Col, Row, Card, ListGroup, ListGroupItem, Form, Button, InputGroup } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function CandidatePage() {
    const [validated, setValidated] = useState(false);
    const [candidate, setCandidate] = useState({});
    let { id } = useParams();
    const currentUser = useSelector((state) => state)
    let history = useHistory();

    const getCandidate = async (id) => {
        const response = await fetch("http://localhost:3001/candidates/" + id);
        const data = await response.json();
        setCandidate(data);
    };

    useEffect(() => {
        getCandidate(id);
    }, [id])

    useEffect(() => {
        !currentUser.email && history.push('/')
    }, [currentUser])


    const handleSubmit = async event => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            setValidated(true);

            const config = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(candidate)
            }

            const response = await fetch('http://localhost:3001/candidates/' + id, config)
        }     
    };

    const onDeleteCandidate = (e, id) => {
        e.preventDefault();
        const config = {
            method: "DELETE",
            headers: { "content-type": "application/json" }
        };
        fetch(`http://localhost:3001/candidates/${id}`, config);
        history.push('/candidates')
    };

    return (
        <Row fluid='true' className="d-flex flex-column align-items-center">
            <h1>Take a closer look to your candidate</h1>
            <Form noValidate validated={validated}
            // onSubmit={handleSubmit}
            >
                <Card className='m-2' key={`card#${id}`} style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={candidate.photo_url} />
                    <span className='idLabel'>#{id}</span>
                    <Card.Body>
                        <Card.Title>
                            <Form.Group as={Col} md="12" className="text-left" controlId="validationCustom01">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    value={candidate.first_name}
                                    placeholder="First name"
                                    onChange={(e) => setCandidate({ ...candidate, first_name: e.target.value })}
                                />
                                <Form.Control.Feedback>Looks good, Beautiful Name!</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md="12" className="text-left" controlId="validationCustom02">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    value={candidate.last_name}
                                    placeholder="Last name"
                                    onChange={(e) => setCandidate({ ...candidate, last_name: e.target.value })}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group fluid='true' as={Row} className="px-3 m-0" controlId="validationCustomGender">
                                <Form.Label>Gender</Form.Label>
                                <Form.Control
                                    id="genderForm"
                                    className="d-inline rounded-right-0"
                                    required
                                    type="text"
                                    value={candidate.gender}
                                    placeholder="Gender"
                                    aria-describedby="inputGroupAppend"
                                    onChange={(e) => setCandidate({ ...candidate, gender: e.target.value })}
                                />
                                <InputGroup.Append as={Col} md="2" className="genderForm justify-content-center p-0">
                                    <InputGroup.Text id="inputGroupAppend">{candidate.gender === "Female" || candidate.gender === "female" ? '♀' : (candidate.gender === "Male" || candidate.gender === "male" ? '♂' : '?')}</InputGroup.Text>
                                </InputGroup.Append>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>

                        </Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush text-left">
                        <ListGroupItem>
                            <Form.Group as={Col} md="12" controlId="validationCustom03">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    required
                                    type="email"
                                    value={candidate.email}
                                    placeholder="Email"
                                    onChange={(e) => setCandidate({ ...candidate, email: e.target.value })}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Form.Group as={Col} md="12" controlId="validationCustom04">
                                <Form.Label>Company:</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    value={candidate.company}
                                    placeholder="Company"
                                    onChange={(e) => setCandidate({ ...candidate, company: e.target.value })}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Form.Group as={Col} md="12" controlId="validationCustom05">
                                <Form.Label>Job Title:</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    value={candidate.job_title}
                                    placeholder="Job Title"
                                    onChange={(e) => setCandidate({ ...candidate, job_title: e.target.value })}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Form.Group as={Col} md="12" controlId="validationCustom06">
                                <Form.Label>City:</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    value={candidate.city}
                                    placeholder="City"
                                    onChange={(e) => setCandidate({ ...candidate, city: e.target.value })}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Form.Group as={Col} md="12" controlId="validationCustom07">
                                <Form.Label>Country:</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    value={candidate.country}
                                    placeholder="Country"
                                    onChange={(e) => setCandidate({ ...candidate, country: e.target.value })}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                        </ListGroupItem>
                        <ListGroupItem>
                        <Form.Group>
                            <Form.Check
                            required
                            label="Agree to terms and conditions"
                            feedback="You must agree before submitting."
                            />
                            </Form.Group>
                        </ListGroupItem>
                    </ListGroup>
                    <Card.Body className='px-5'>
                        <Button type="submit" variant="outline-secondary" className='float-left' to={`/candidates/${id}`} onClick={(e) => handleSubmit(e)}>Edit</Button>
                        <Button variant="outline-secondary" className='float-right' to='/candidates' onClick={(e) => onDeleteCandidate(e, id)}>Remove</Button>
                    </Card.Body>
                </Card>
            </Form>
        </Row>
    )
}
