import React from 'react';
import {Card} from 'antd';
import {Router, Route, hashHistory, Link} from 'react-router';
import {HashRouter} from 'react-router-dom';

export default class PCNewsBlock extends React.Component {
    constructor() {
        super();
        this.state = {
            news: ''
        };
    };

    /**
	 * 组件render前请求数据
	 */
    componentWillMount() {
        var myFetchOptions = {
            method: 'GET'
        };

        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.props.count, myFetchOptions).then(response => response.json()).then(json => this.setState({news: json}));
    }
    
    render() {
		const {news} = this.state;
        const newsList = news.length
            ? news.map((newsItem, index) => (
                <li key={index}>
                    <Link to={`details/${newsItem.uniquekey}`} target='_blank'>
                        {newsItem.title}
                    </Link>
                </li>
            ))
            : '没有最新新闻';

        return (
            <div class="topNewsList">
                <Card>
                    <ul>{newsList}</ul>
                </Card>
            </div>
        )
    }
}
