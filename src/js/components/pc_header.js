import React from 'react';
import ReactDom from 'react-dom';
import {Row, Col} from 'antd';
import {
    Menu,
    Icon,
    Tabs,
    message,
    Form,
    Input,
    Button,
    CheckBox,
    Modal
} from 'antd';
import {Link} from 'react-router';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class PCHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            current: 'top', // 当前选择的导航
            modalVisible: false, //登录注册框是否可见
            action: 'login', // 'login'表示登录， 'register'表示注册
            hasLogined: false, //是否登录的标记
            userNickName: '',   //用户昵称
            userId: 0 //用户id
        }
    };

    /**
	 * 组件渲染之前执行
	 * 在登录状态下，刷新保持登录态
	 */
    componentWillMount() {
        if (localStorage.userId != "") {
            this.setState({hasLogined: true, userId: localStorage.userId, userNickName: localStorage.userNickName});
        }
    };

	/**
	 * 设置登录注册框的显示和隐藏
	 */
    setModalVisible(value) {
        this.setState({modalVisible: value});
    };

    /**
     * 导航条的切换事件
     */
    handleClick(e) {
        // e.preventDefault();
        if (e.key == "register") {
            this.setState({current: 'register'});
            this.setModalVisible(true);
        } else {
            this.setState({current: e.key})
        }
    };

    /**
     * 提交注册
     */
    handleSubmit(e) {
        e.preventDefault();
        var myFetchOptions = {
            method: 'GET'
        };
        var formData = this.props.form.getFieldsValue();
        // 使用fetch发起登录注册请求
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action + "&username=" + formData.userName + "&password=" + formData.password + "&r_userName=" + formData.r_userName + "&r_password=" + formData.r_password + "&r_confirmPassword=" + formData.r_confirmPassword, myFetchOptions).then(response => response.json()).then(json => {
            this.setState({userNickName: json.NickUserName, userId: json.UserId});
            localStorage.userId = json.UserId;
            localStorage.userNickName = json.NickUserName;
        });
        if (this.state.action == "login") {
            this.setState({hasLogined: true})
        }
        message.success("请求成功!");
        this.setModalVisible(false);
    };

    /**
     * 登录注册框tab切换时，同时切换action的值
     */
    callback(key) {
        if (key == 1) {
            this.setState({action: "login"});
        } else if (key = 2) {
            this.setState({action: "register"});
        }
    };

    /*
	 * 退出逻辑处理
	 * 将保持在本地的用户信息清空
	 */
    logout() {
        this.setState({hasLogined: false})
        localStorage.userId = "";
        localStorage.userNickName = "";
    };

    render() {
        let {getFieldDecorator} = this.props.form;
        // 使用三目运算符切换登录和未登录状态
        const userShow = this.state.hasLogined
            //已经登录
            ? <Menu.Item key="logout" class='register'>
                    <Button type='primary' htmlType='button'>{this.state.userNickName}
                    </Button>
                    &nbsp;&nbsp;
                    <Link target="_blank" to='usercenter'>
                        <Button type="dashed" htmlType='button'>
                            个人中心
                        </Button>
                    </Link>
                    &nbsp;&nbsp;
                    <Button type="ghost" htmlType='button' size="small" onClick={this.logout.bind(this)}>退出</Button>
                </Menu.Item>
            //未登录
            : <Menu.Item key="register" class='register'>
                <Icon type='appstore'></Icon>注册/登录
            </Menu.Item>;

        return (
            <header>
                <Row>
                    <Col span={2}></Col>
                    {/* logo */}
                    <Col span={4}>
                        <a href='/' class="logo">
                            <img src='./src/images/logo.png' alt='logo'/>
                            <span>ReactNews</span>
                        </a>
                    </Col>
                    {/* 导航 */}
                    <Col span={16}>
                        {/* 使用menu组件 */}
                        <Menu mode="horizontal" onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current]}>
                            <Menu.Item key='top'>
                                <Icon type="appstore"></Icon>头条
                            </Menu.Item>
                            <Menu.Item key='shehui'>
                                <Icon type="appstore"></Icon>社会
                            </Menu.Item>
                            <Menu.Item key='guonei'>
                                <Icon type="appstore"></Icon>国内
                            </Menu.Item>
                            <Menu.Item key='guoji'>
                                <Icon type="appstore"></Icon>国际
                            </Menu.Item>
                            <Menu.Item key='yuele'>
                                <Icon type="appstore"></Icon>娱乐
                            </Menu.Item>
                            <Menu.Item key='tiyu'>
                                <Icon type="appstore"></Icon>体育
                            </Menu.Item>
                            <Menu.Item key='keji'>
                                <Icon type="appstore"></Icon>科技
                            </Menu.Item>
                            {userShow}
                        </Menu>
                        {/* Modal里面的是登录注册弹窗 */}
                        <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel= { ()=> this.setModalVisible(false)} onOk= { () => this.setModalVisible(false)} okText="关闭">
                            <Tabs type="card" onChange={this.callback.bind(this)}>

                                {/* 登录 */}
                                <TabPane tab="登录" key="1">
                                    <Form layout='horizontal' onSubmit={this.handleSubmit.bind(this)}>
                                        <FormItem label="账户">
                                            {getFieldDecorator('userName')(<Input placeholder='请输入您的账号'/>)}
                                        </FormItem>
                                        <FormItem label="密码">
                                            {getFieldDecorator('password')(<Input type="password" placeholder='请输入您的密码'/>)}
                                        </FormItem>
                                        <Button type='primary' htmlType='submit'>登录</Button>
                                    </Form>
                                </TabPane>

                                {/* 注册 */}
                                <TabPane tab="注册" key="2">
                                    <Form layout='horizontal' onSubmit={this.handleSubmit.bind(this)}>
                                        <FormItem label="账户">
                                            {getFieldDecorator('r_userName')(<Input placeholder='请输入您的账号'/>)}
                                        </FormItem>
                                        <FormItem label="密码">
                                            {getFieldDecorator('r_password')(<Input type="password" placeholder='请输入您的密码'/>)}
                                        </FormItem>
                                        <FormItem label="确认密码">
                                            {getFieldDecorator('r_confirmPassword')(<Input type="password" placeholder='请再次输入您的密码'/>)}
                                        </FormItem>
                                        <Button type='primary' htmlType='submit'>注册</Button>
                                    </Form>
                                </TabPane>
                            </Tabs>
                        </Modal>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </header>
        );
    }
}

export default PCHeader = Form.create({})(PCHeader);
