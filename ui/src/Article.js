import Card from 'react-bootstrap/Card'; import CardDeck from 'react-bootstrap/CardDeck';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Column from 'react-bootstrap/Container';
import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';


class Article extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
            article: this.props.article
        };
    }

    render() {
        const article = this.state.article;
            return (
                <Container>
                    <Row>
                        <Column md={{ span: 8, offset: 2 }} >
                            <Card border="info">
                                <Card.Body>
                                    <Card.Title>{article.head}</Card.Title>
                                    <Card.Text>{article.body}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Column>
                    </Row>
                </Container>
            );

    }
}

export default Article