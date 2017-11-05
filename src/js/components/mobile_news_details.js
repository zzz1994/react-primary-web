import React from 'react';
import {Row, Col, BackTop} from 'antd';
import MobileHeader from './mobile_header.js';
import MobileFooter from './mobile_footer.js';
import CommonComments from './common_comments.js';
export default class MobileNewsDetails extends React.Component {

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
            <div id="mobileDetailsContainer">
                <MobileHeader></MobileHeader>
                <div class="ucmobileList">
                    <Row>
                        <Col span={24} className='container'>
                            <div class='articleContainer' dangerouslySetInnerHTML={this.creatMarkup()}></div>
                            <hr />
                            <CommonComments uniquekey={this.props.params.uniquekey} />
                        </Col>
                    </Row>
                    <MobileFooter></MobileFooter>
                    <BackTop></BackTop>
                </div>
            </div>
        );
    };
}
