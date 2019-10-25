import React, { Component } from 'react';
import './App.css';
import { Layout, Header, Navigation, Drawer, Content } from 'react-mdl';
import Main from './pages/main';
import { Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="demo-big-content">
    <Layout>
        <Header className="header-color" title={<Link style={{textDecoration: 'none', color: 'white'}} to="/">GuruFarm</Link>} scroll>
            <Navigation>
              <Link to="/Guru">กลุ่มคนเกษตร</Link>
              <Link to="/Shop">ร้านสินค้าเกษตร</Link>
              <Link to="/News">ช่าวสาร</Link>
              <Link to="/Event">งานจัดแสดงสินค้า</Link>
            </Navigation>
        </Header>
        <Drawer title={<Link style={{textDecoration: 'none', color: 'black'}} to="/">GuruFarm</Link>}>
            <Navigation>
              <Link to="/Guru">กลุ่มคนเกษตร</Link>
              <Link to="/Shop">ร้านสินค้าเกษตร</Link>
              <Link to="/News">ช่าวสาร</Link>
              <Link to="/Event">งานจัดแสดงสินค้า</Link>
            </Navigation>
        </Drawer>
        <Content>
            <div className="page-content" />
            <Main/>
        </Content>
    </Layout>
</div>

    );
  }
}

export default App;