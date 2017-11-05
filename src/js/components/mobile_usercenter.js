import React from 'react';

// 栅栏布局
import {Row, Col, Upload, Card} from 'antd';
// 菜单栏
import {Menu, Icon} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

import {Tabs} from 'antd';
import {Modal} from 'antd';
import {Form, Input, Button, CheckBox} from 'antd';
import {message} from 'antd';

import {Router, Route, hashHistory, Link} from 'react-router';
import {HashRouter} from 'react-router-dom';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

import MobileHeader from './mobile_header.js';
import MobileFooter from './mobile_footer.js';

export default class MobileUserCenter extends React.Component {
    constructor() {
        super();
        this.state = {
            previewImage: '',
            previewVisible: false,
            usercollection: '',
            usercomments: ''
        };
    };
    componentDidMount() {
        var myFetchOptions = {
            method: 'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + localStorage.userId, myFetchOptions).then(response => response.json()).then(json => {
            this.setState({usercollection: json});
        });

        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + localStorage.userId, myFetchOptions).then(response => response.json()).then(json => {
            this.setState({usercomments: json});
        });
    };

    render() {
        const props = {
            action: 'http://newsapi.gugujiankong.com/handler.ashx',
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            listType: 'picture-card',
            defaultFileList: [
                {
                    uid: -1,
                    name: 'xxx.png',
                    state: 'done',
                    url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                    thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png'
                }
            ],
            onPreview: (file) => {
                this.setState({previewImage: file.url, previewVisible: true});
            }
        };

        const {usercollection} = this.state;
        const usercollectionList = usercollection.length
            ? usercollection.map((uc, index) => (
                <Card key={index} title={uc.uniquekey} extra={ <a target = "_blank" href = {`/#/details/${uc.uniquekey}`}> 查看 </a>}>
                    <p>{uc.Title}</p>
                </Card>
            ))
            : '您还没有收藏任何的新闻，快去收藏一些新闻吧';

        const {usercomments} = this.state;
        const usercommentsList = usercomments.length
            ? usercomments.map((comment, index) => (
                <Card key={index} title={`于 ${comment.datetime} 评论了文章 ${comment.uniquekey}`} extra = { <a target = "_blank" href = {`/#/details/${comment.uniquekey}`}> 查看 </a>} >
                    <p>{comment.Comments}</p>
                </Card>
            ))
            : '快去评论文章吧';

        return (
            <div>
                <MobileHeader></MobileHeader>
                <Row>
                    <Col span={24}>
                        <Tabs>
                            <TabPane tab='我的收藏列表' key='1'>
                                <div class='comment'>
                                    <Row>
                                        <Col span={24}>
                                            {usercollectionList}
                                        </Col>
                                    </Row>
                                </div>
                            </TabPane>
                            <TabPane tab='我的评论列表' key='2'>
                                <div class='comment'>
                                    <Row>
                                        <Col span={24}>
                                            {usercommentsList}
                                        </Col>
                                    </Row>
                                </div>
                            </TabPane>
                            <TabPane tab='头像设置' key='3'>
                                <div class='clearfix'>
                                    <Upload {...props}>
                                        <Icon type='plus'></Icon>
                                        <div class='ant-upload-text'>上传照片</div>
                                        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                                            <img alt='预览' src={this.state.previewImage}/>
                                        </Modal>
                                    </Upload>
                                </div>
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
                <MobileFooter></MobileFooter>
            </div>
        );
    };
}
