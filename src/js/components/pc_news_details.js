import React from 'react';
import {Row, Col, BackTop, Icon} from 'antd';
import PCHeader from './pc_header.js';
import PCFooter from './pc_footer.js';
import PCNewsImageBlock from './pc_news_image_block.js';
import CommonComments from './common_comments.js';

import {Anchor} from 'antd';
const {Link} = Anchor;

export default class PCNewsDetails extends React.Component {

    constructor() {
        super();
        this.state = {
            newsItem: ''
        };
    };

    /**
     * 组件加载前请求数据
     */
    componentDidMount() {
        var myFetchOptions = {
            method: 'GET'
        };

        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.params.uniquekey, myFetchOptions).then(response => response.json()).then(json => {
            this.setState({newsItem: json});
            document.title = this.state.newsItem.title + ' - React News | React 驱动的新闻平台';
        })
    };

    creatMarkup() {
        return {__html: this.state.newsItem.pagecontent};
    };

    render() {
        return (
            <div>
                <PCHeader></PCHeader>
                <Row>
                    <Col span={2}></Col>
                    <Col span={14} className='container'>
                        <div class='articleContainer' dangerouslySetInnerHTML={this.creatMarkup()}></div>
                        <hr/>
                        <CommonComments uniquekey={this.props.params.uniquekey}/>
                    </Col>
                    <Col span={6}>
                        <PCNewsImageBlock count={40} type='top' width='100%' cardTitle='相关新闻' imagesWidth='125px'/>
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <PCFooter></PCFooter>
            </div>
        );
    };
}
