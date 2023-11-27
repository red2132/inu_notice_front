import './index.css'

import Header from './component/Header'
import NavBar from './component/NavBar'
import Footer from './component/Footer'
import MainList from './component/MainList'

import { useState } from 'react';

function App(props) {
    // nav바 숨김 여부
    const [navHiddenYn, setNavHiddenYn] = useState(true)
    return (
        <div className={navHiddenYn ? "sb-nav-fixed" : 'sb-sidenav-toggled'}>
            <Header setNavHiddenYn={setNavHiddenYn} navHiddenYn={navHiddenYn} />
            <div id="layoutSidenav">
                <NavBar />
                <div id="layoutSidenav_content">
                    <MainList />
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default App