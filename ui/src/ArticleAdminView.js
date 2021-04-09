import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import ArticleAdminViewRow from './ArticleAdminViewRow';

class ArticleAdminView extends React.Component {
    constructor(props) {
        super(props);
        this.reloadHandler = this.reloadHandler.bind(this);
        this.loadArticles = this.loadArticles.bind(this);
        this.state = {
            error: null,
            isLoaded: false,
            articles: []
        };
    }

    componentDidMount() {
        this.loadArticles()
    }

    reloadHandler() {
        this.loadArticles()
        console.log('reloadHandler')
    }

    loadArticles() {
        console.log('loadArticles')
        fetch("/api/article/")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({articles:[]})
                    this.setState({
                        isLoaded: true,
                        articles: result.articles
                    });
                    console.log(this.state)
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
        console.log('render')
        if (this.state.error) {
            return <div>Error: {this.state.error.message}</div>;
        } else if (!this.state.isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Article Head</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.articles.map(article => (
                            <ArticleAdminViewRow id={article} handler={this.loadArticles}></ArticleAdminViewRow>
                        ))}
                    </tbody>
                </Table>
            );
        }
    }
}

export default ArticleAdminView