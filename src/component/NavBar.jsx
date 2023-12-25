function NavBar(props) {
    /**
     * 
     * @param {SyntheticBaseEvent} e
     * value값 전달하는 함수 
     */
    const changeList = (e) => {
        props.setNevCategory1(e.target.value)
    }
    return (
        <div id="layoutSidenav_nav">
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div className="sb-sidenav-menu">
                    <div className="nav">
                        <div className="sb-sidenav-menu-heading">Lists</div>
                            <button className="nav-link" value="inu" onClick={changeList}>
                                학교
                            </button>
                            <button className="nav-link" value="lib"  onClick={changeList}>
                                도서관
                            </button>
                            <button className="nav-link" value="dorm"  onClick={changeList}>
                                기숙사
                            </button>
                            <button className="nav-link" value="int"  onClick={changeList}>
                                국제교류원
                            </button>
                            <button className="nav-link" value="cse"  onClick={changeList}>
                                컴퓨터공학부
                            </button>
                    </div>
                </div>
                <div className="sb-sidenav-footer">
                    <div className="small">Logged in as:</div>
                    Start Bootstrap
                </div>
            </nav>
        </div>
    )
}

export default NavBar