import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Column from 'react-bootstrap/Container';

class ArticleCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            article_head: null,
            article_body: null
        };
        this.postArticle = this.postArticle.bind(this);
    }

    postArticle() {
        var payload = {
            head: this.state.article_head,
            body: this.state.article_body
        };

        var data = new FormData();
        data.append("json", encodeURIComponent(JSON.stringify(payload)));
        console.log(this.state)

        fetch("/api/article/",
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "PUT",
                body: JSON.stringify(payload)
            })
            .then(function (res) { return res.json(); })
            .then(function (data) { alert(JSON.stringify(data)) })
    }

    render() {
        return (
            <Form>
                <Column md={{ span: 10, offset: 2 }}>
                    <Form.Group controlId="exampleForm.ControlInput1" width='90%'>
                        <Form.Label>Article Header</Form.Label>
                        <Form.Control value={this.state.article_head}
                            onChange={e => this.setState({ article_head: e.target.value })} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Article Body</Form.Label>
                        <Form.Control as="textarea" rows={3} value={this.state.article_body}
                            onChange={e => this.setState({ article_body: e.target.value })} />
                    </Form.Group>
                    <Button onClick={this.postArticle} variant="primary" type="submit">
                        Submit
                        </Button>
                </Column>        
            </Form>
        );
    }
}

export default ArticleCreator