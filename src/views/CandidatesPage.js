import React, { useEffect, useState } from 'react';
import { Row, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function CandidatesPage() {
    const [candidates, setCandidates] = useState([]);
    const currentUser = useSelector((state) => state)
    let history = useHistory();

    const getCandidates = async () => {
        const response = await fetch("http://localhost:3001/candidates");
        const data = await response.json();
        setCandidates(data);
    };

    const onDeleteCandidate = (e, id) => {
        e.preventDefault();
        const config = {
            method: "DELETE",
            headers: { "content-type": "application/json" }
        };
        fetch(`http://localhost:3001/candidates/${id}`, config);
        const newCandidates = candidates.filter(candidate => candidate.id !== id);
        setCandidates(newCandidates);
    };

    useEffect(() => {
        getCandidates();
    }, []);

    useEffect(() => {
        !currentUser.email && history.push('/')
    }, [currentUser])

    const renderCards = (candidates) => {
        console.log('I ran');
        return candidates.map(({id, first_name, last_name, email, gender, company, job_title, city, country, photo_url}) => {
            return (
                <Card className='m-3' key={`card#${id}`} style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={photo_url} />
                    <span className='idLabel'>#{id}</span>
                    <Card.Body>
                        <Card.Title>{first_name} {last_name} • {gender === "Female" ? '♀' : '♂'}</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>Email: {email}</ListGroupItem>
                        <ListGroupItem>Company: {company}</ListGroupItem>
                        <ListGroupItem>Job Title: {job_title}</ListGroupItem>
                        <ListGroupItem>City: {city}</ListGroupItem>
                        <ListGroupItem>Country: {country}</ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        <Link className='card-link' to={`/candidates/${id}`}>Edit</Link>
                        <Link className='card-link' to='/candidates' onClick={(e) => onDeleteCandidate(e, id)}>Remove</Link>
                    </Card.Body>
                </Card>
            )
        })
    }

    return (
        <div>
            <h1>CANDIDATES</h1>
            <h5>All there for you...</h5>
            <hr/>
            <Row className='d-flex justify-content-center' fluid='true'>{renderCards(candidates)}</Row>
        </div>
    )
}
