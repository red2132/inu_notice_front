import { FaSearch } from "react-icons/fa"
import { useEffect, useState } from 'react';
import axios from 'axios';

const MoveUrl = (url) => {
    console.log(url)
    window.open(url, "_blank");
}

function MainList() {
    // 공지 데이터 초기값 세팅
    const [dataList, setDataList] = useState(null)
    console.log(dataList)
    useEffect(() => {
        //axios로 데이터 받아옴
        try {
            axios.get("http://localhost:3000/data")
                .then((response) => {
                    setDataList(response.data)
                })
        } catch (error) {
            alert('조회 에러');
        }
    }, [])

    return (
        <main>
            <div className="container-fluid px-4">
                <h1 className="mt-4 mb-4"><b>공지사항</b></h1>
                <div className="card mb-4">
                    <div className="card-body" >
                        <form className="row justify-content-end">
                            <div className="dropdown" style={{ display: 'inline-block', width: '10%' }}>
                                <a className="btn dropdown-toggle" role="button" data-bs-toggle="dropdown" style={{ borderColor: '#DCDCDC' }}>
                                    대분류
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item">학교</a></li>
                                    <li><a className="dropdown-item">도서관</a></li>
                                    <li><a className="dropdown-item">생활원</a></li>
                                </ul>
                            </div>
                            <div style={{ display: 'inline-block', width: '25%' }}>
                                <div className="input-group">
                                    <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                                    <button className="btn btn-primary" id="btnNavbarSearch" type="button">
                                        <FaSearch />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="card mb-4">
                    <div className="card-body">
                        <table id="datatablesSimple" className="table table-hover" style={{ textAlign: "center", tableLayout: "fixed" }}>
                            <thead>
                                <tr className="table-secondary" style={{ alignItems: "center" }}>
                                    <th style={{ width: '5%' }}>No</th>
                                    <th style={{ width: '10%' }}>
                                        <div className="dropdown">
                                            <a className="btn btn-secondary dropdown-toggle" role="button" data-bs-toggle="dropdown">
                                                대분류
                                            </a>
                                            <ul className="dropdown-menu">
                                                <li><a className="dropdown-item">학교</a></li>
                                                <li><a className="dropdown-item">도서관</a></li>
                                                <li><a className="dropdown-item">생활원</a></li>
                                            </ul>
                                        </div>
                                    </th>
                                    <th style={{ width: '15%' }}>소분류</th>
                                    <th style={{ width: '40%' }}>제목</th>
                                    <th style={{ width: '15%' }}>작성자</th>
                                    <th style={{ width: '15%' }}>작성일</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!dataList ? (
                                    <tr>
                                        <td colSpan={6}>데이터 없음</td>
                                    </tr>
                                ) : (
                                    dataList.map((data, idx) => (
                                        <tr key={idx} onClick={() => MoveUrl(data.url) }>
                                            <td>{data.num}</td>
                                            <td>{data.category1}</td>
                                            <td style={{ whiteSpace:"noWrap", overflow: "hidden", textOverflow: "ellipsis" }}>{data.category2}</td>
                                            <td style={{ whiteSpace:"noWrap", overflow: "hidden", textOverflow: "ellipsis" }}>{data.title}</td>
                                            <td style={{ whiteSpace:"noWrap", overflow: "hidden", textOverflow: "ellipsis" }}>{data.writer}</td>
                                            <td>{data.date}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                        <nav aria-label="Page navigation example">
                            <ul className="pagination" style={{ justifyContent: "center" }}>
                                <li className="page-item">
                                    <a className="page-link" href="#" aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                    </a>
                                </li>
                                <li className="page-item"><a className="page-link" href="#">1</a></li>
                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                <li className="page-item">
                                    <a className="page-link" href="#" aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default MainList