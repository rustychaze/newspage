import React, { Component } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import PageItem from 'react-bootstrap/PageItem';
import ArticleList from './ArticleList';
import Article from './Article';
import './index.css';

class Paginator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current_page: this.props.current_page,
            pages: [],
            commonUrl: this.props.commonUrl
        };
        for (let i = 1; i <= this.props.pages; i++) {
            this.state.pages.push(i);
        }
    }

    render() {
        const { current_page, pages, commonUrl } = this.state
        return (
            <div>
                <Pagination > 
                    {pages.map(page => (
                        <div>
                            <Pagination.Item key={page} active={page === current_page} href={commonUrl + page} >{page}</Pagination.Item>
                        </div>
                    ))}
                </Pagination>
            </div >
        );
    }
}
export default Paginator;