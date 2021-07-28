import React, { Component } from 'react';
import Article from './Article';
import Paginator from './Pagination';
import './index.css';
import { useParams } from 'react-router-dom';

class ArticleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            articles: [],
            pages: this.props.pages,
            current_page: this.props.current_page
        };
    }

    componentDidMount() {
        fetch("/api/article/")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        articles: result.articles,
                        pages: result.pages,
                        current_page: result.current_page
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, articles, pages, current_page } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    {articles.map(article => (
                        <div>
                            <Article key={articles.id} article={article}></Article>
                            <br />
                        </div>
                    ))}
                    <Paginator pages={pages} current_page={current_page} commonUrl="/article/page/" />

                </div>
            );
        }
    }
}

export default ArticleList