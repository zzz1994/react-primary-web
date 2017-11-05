import React from 'react';
import {Row, Col} from 'antd';
import {Tabs, Carousel} from 'antd';
const TabPane = Tabs.TabPane;

import PCNewsBlock from './pc_news_block.js';
import PCNewsImageBlock from './pc_news_image_block.js'
export default class PCNewsContainer extends React.Component {
    render() {
        // 详情可以参考AntDesign官网的Carousel组件说明
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToshow: 1,
            autoplay: true
        };

        return (
            <div>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20} class="container">
                        <Row>
                            <Col span={10}>
                                {/* 首页的轮播 */}
                                <Carousel {...settings}>
                                    <div><img src="./src/images/carousel_1.jpg"/></div>
                                    <div><img src="./src/images/carousel_2.jpg"/></div>
                                    <div><img src="./src/images/carousel_3.jpg"/></div>
                                    <div><img src="./src/images/carousel_4.jpg"/></div>
                                </Carousel>
                                {/* 左侧的图片新闻 */}
                                <PCNewsImageBlock count={6} type='guonei' width='100%' cartTitle='国内头条' imagesWidth='120px'/>
                            </Col>
                            <Col span={14}>
                                <Tabs class="tabs_news">
                                    <TabPane tab="新闻" key="1">
                                        <PCNewsBlock count={23} type="top" border="false"></PCNewsBlock>
                                    </TabPane>
                                    <TabPane tab="国际" key="2">
                                        <PCNewsBlock count={23} type="guoji" border="false"></PCNewsBlock>
                                    </TabPane>
                                    <TabPane tab="国内" key="3">
                                        <PCNewsBlock count={23} type="guonei" border="false"></PCNewsBlock>
                                    </TabPane>
                                </Tabs>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <div>
                            <PCNewsImageBlock count={7} type='guoji' width='100%' cartTitle='国际头条' imagesWidth='132px'/>
                            <PCNewsImageBlock count={14} type='yule' width='100%' cartTitle='娱乐新闻' imagesWidth='132px'/>
                        </div>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        )
    }
}
