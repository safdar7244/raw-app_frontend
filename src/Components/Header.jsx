import React from 'react'
import { Affix, Layout, Menu, Button } from 'antd'
import { Link } from "react-router-dom";

function Header({ setAdminToken }) {
    const logout = async () => {
        setAdminToken(null)
        localStorage.removeItem('adminToken')
    }
    const { Header } = Layout;

    var path = window.location.pathname.includes('users') ? '2' :
        window.location.pathname.includes('orders') ? '3' :
            window.location.pathname.includes('meals') ? '4' :
                window.location.pathname.includes('categories') ? '5' :
                    window.location.pathname.includes('reports') ? '6' : '1'

    return (
        <div>
            <Layout className="layout"  >
                <Affix>
                    <Header title="Eat-App Admin" style={{ background: '#070808' }} >
                        <Menu theme="dark" style={{ background: '#070808' }} mode="horizontal" defaultSelectedKeys={path} >
                            <Menu.Item key="1" >
                                <Link to="/">Users</Link>
                            </Menu.Item>
                            <Menu.Item key="2" >
                                <Link to="/allcontent">All Content</Link>
                            </Menu.Item>
                            <Menu.Item key="3" >
                                <Link to="/newusers">New Users</Link>
                            </Menu.Item>
                            <Menu.Item key="4" >
                                <Link to="/newvideos">New Videos</Link>
                            </Menu.Item>
                            <Menu.Item key="5" >
                                <Link to="/flagged">Flagged Content</Link>
                            </Menu.Item>
                            <Button
                                style={{ float: 'right', marginTop: '15px' }}
                                type="primary"
                                onClick={e => {
                                    e.preventDefault()
                                    logout()
                                }} danger>
                                Logout
                            </Button>
                        </Menu>
                    </Header>
                </Affix>
            </Layout>

        </div>
    )
}

export default Header




