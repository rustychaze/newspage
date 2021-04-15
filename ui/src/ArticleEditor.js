import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';


class ArticleEditor extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        this.deleteArticle = this.deleteArticle.bind(this);
        this.postArticle = this.postArticle.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.state = {
            error: null,
            isLoaded: false,
            article_id: this.props.id,
            article_body: null
        };
    }

    componentDidMount() {
        fetch("/api/article/" + this.state.article_id)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        article_body: result.body,
                        article_head: result.head
                    });
                    console.log(result);
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

    deleteArticle() {
        fetch("/api/article/" + this.state.article_id, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    this.props.handler()
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
    }

    postArticle() {
        var payload = {
            id: this.state.article_id,
            head: this.state.article_head,
            body: this.state.article_body
        };

        var data = new FormData();
        data.append("json", encodeURIComponent(JSON.stringify(payload)));
        console.log (this.state)

        fetch("/api/article/",
            {
                headers: {
                    'Content-Type': 'application/json'
                  },
                method: "POST",
                body: JSON.stringify(payload)
            })
            .then(function (res) { return res.json(); })
        this.handleClose(); 
        this.props.handler();   
    }


    handleClose() {
        this.setState({show: false});        
    }

    handleOpen () {
        this.setState({show: true});        
    }

    render() {
        const { error, isLoaded, article_body, article_head } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <>
                <Button variant="outline-primary" onClick={this.handleOpen}>Edit</Button>
                <Modal show={this.state.show} onHide={this.handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Article Header</Form.Label>
                        <Form.Control value={article_head}
            onChange={e => this.setState({ article_head: e.target.value })} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Article Body</Form.Label>
                        <Form.Control as="textarea" rows={3} value={article_body}
            onChange={e => this.setState({ article_body: e.target.value })} />
                    </Form.Group>
                </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.postArticle}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        </>
            );
            
        }
    }
}

export default ArticleEditor