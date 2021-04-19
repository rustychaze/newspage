import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import React, { Component } from 'react';


class Article extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
            error: null,
            isLoaded: false,
            article_id: this.props.id,
            article_body: null
        };
    }

    componentDidMount() {
        fetch("/api/article/"+this.state.article_id)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        article_body: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, article_body } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <Card style={{ width: '90%' }}>
                    <Card.Body>
                        <Card.Title>{article_body.head}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                        <Card.Text>
                            {article_body.body}
                        </Card.Text>
                    </Card.Body>
                </Card>
            );
        
        }
    }
}

export default Article