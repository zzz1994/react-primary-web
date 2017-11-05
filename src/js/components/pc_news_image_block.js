import React from 'react';
import {Card} from 'antd';
import {Router, Route, hashHistory, Link} from 'react-router';
import {HashRouter} from 'react-router-dom';

export default class PCNewsImageBlock extends React.Component {

    constructor() {
        super();
        this.state = ({news: ''});
    };

    componentWillMount() {

        var myFetchOptions = {
            method: 'GET'
        };

        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.props.count, myFetchOptions).then(response => response.json()).then(json => this.setState({news: json}));
    };

    render() {
        const styleImage = {
            display: 'block',
            width: this.props.imagesWidth,
            height: '90px'
        };
        const styleh3 = {
            width: this.props.imagesWidth,
			whiteSpace: 'nowrap',
			overflow: 'hidden',
			textOverflow: 'ellipsis'
        };
        const {news} = this.state;
        const newsList = news.length
            ? news.map((newsItem, index) => (
                <div key={index} class='imageblock'>
                    <Link to={`details/${newsItem.uniquekey}`} target='_blank'>
                        <div class='custom-image'>
                            <img alt='' style={styleImage} src={newsItem.thumbnail_pic_s}/>
                        </div>
                        <div class='custom-card'>
                            <h3 style={styleh3}>{newsItem.title}</h3>
                            <p style={styleh3}>{newsItem.author_name}</p>
                        </div>
                    </Link>
                </div>
            ))
            : '没有最新新闻';
        return (
            <div class='topNewsList'>
                <Card title={this.props.cartTitle} bordered={true} style={{
                    width: this.props.width
                }}>
                    {newsList}
                </Card>
            </div>
        );
    };
}
