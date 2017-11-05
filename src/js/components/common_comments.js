import React from 'react';

// 栅栏布局
import {Row, Col, Card, notification} from 'antd';
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

class CommonComments extends React.Component {
    constructor() {
        super();
        this.state = {comments: ''};
    };

    componentDidMount() {
        var myFetchOptions = {
            method: 'GET'
        };

        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=" + this.props.uniquekey, myFetchOptions).then(response => response.json()).then(json => {
            this.setState({comments: json});
        })
    };

    /**
     * 用户提交评论处理逻辑
     */
    handleSubmit(e) {
        e.preventDefault();
        var myFetchOptions = {
            method: 'GET'
        };
        var formdata = this.props.form.getFieldsValue();
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=" + localStorage.userId + "&uniquekey=" + this.props.uniquekey + "&commnet=" + formdata.remark, myFetchOptions).then(response => response.json()).then(json => {
            this.componentDidMount();
        })
    };

    /**
     * 添加用户收藏
     */
    addUserCollection( e ){
        var myFetchOptions = {
            method: 'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid="+localStorage.userId+"&uniquekey="+this.props.uniquekey, myFetchOptions)
        .then( response => response.json())
        .then( json => {
            notification['success']({message: 'ReactNews提醒', description: '收藏成功'});
        });
    }

    render() {
        let {getFieldDecorator} = this.props.form;
        const {comments} = this.state;
        const commentList = comments.length
            ? comments.map((comment, index) => (
                <Card key={index} title={comment.UserName} extra={<a href = '#' > 发布于 {comment.datetime} </a>}>
                    <p>{comment.Comments}</p>
                </Card>
            ))
            : '没有评论';
        return (
            <div class='comment'>
                <Row>
                    <Col span={24}>
                        {commentList}
                        <Form onSubmit={this.handleSubmit.bind(this)}>
                            <FormItem label='您的评论'>
                                {getFieldDecorator('remark', {initialValue: ''})(
                                    <Input type='textarea' placeholder='您的评论'></Input>
                                )}
                            </FormItem>
                            <Button type='primary' htmlType='submit'>提交评论</Button>
                            &nbsp;&nbsp;
                            <Button type='primary' htmlType='button' onClick={this.addUserCollection.bind(this)}>收藏该文章</Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    };
}

export default CommonComments = Form.create({})(CommonComments);
