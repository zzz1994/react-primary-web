import React from 'react';
import {Row, Col} from 'antd';
import {Router, Route, hashHistory, Link} from 'react-router';
import {HashRouter} from 'react-router-dom';

export default class MoblieList extends React.Component {
    constructor() {
        super();
        this.state = {
            news: ''
        };
    };

    /**
	 * 组件加载前请求数据
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
                <section key={index} className='m_article list-item special_section clearfix'>
                    <Link to={`details/${newsItem.uniquekey}`} target='_blank'>
                        <div className='m_article_img'>
                            <img src={newsItem.thumbnail_pic_s} alt={newsItem.title}/>
                        </div>
                        <div className='m_article_info'>
                            <div className='m_article_title'>
                                <span>{newsItem.title}</span>
                            </div>
                            <div className='m_article_desc clearfix'>
                                <div className='m_article_desc_l'>
                                    <span className='m_article_channel'>{newsItem.realtype}</span>
                                    <span className='m_article_time'>{newsItem.date}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </section>
            ))
            : '没有最新新闻';

        return (
            <div>
                <Row>
					<Col span={24}>
						{newsList}
					</Col>
				</Row>
            </div>
        )
    }
}
