import './index.css'

import Header from './component/Header'
import NavBar from './component/NavBar'
import Footer from './component/Footer'
import MainList from './component/MainList'

import { useState } from 'react';

function App(props) {
    // nav바 숨김 여부
    const [navHiddenYn, setNavHiddenYn] = useState(true)

    const [nevCategory1, setNevCategory1] = useState('')
    
    return (
        <div className={navHiddenYn ? "sb-nav-fixed" : 'sb-sidenav-toggled'}>
            <Header navHiddenYn={navHiddenYn} setNavHiddenYn={setNavHiddenYn} />
            <div id="layoutSidenav">
                <NavBar nevCategory1={nevCategory1} setNevCategory1={setNevCategory1} />
                <div id="layoutSidenav_content">
                    <MainList nevCategory1={nevCategory1}/>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default App