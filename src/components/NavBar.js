import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
const { Header } = Layout;

const NavBar = () => {
    return (
        <Header>
            <Menu mode="horizontal">
                <Menu.Item key="home">
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="favorites">
                    <Link to="/favorites">Favorites</Link>
                </Menu.Item>
            </Menu>
        </Header>
    );
};

export default NavBar;
