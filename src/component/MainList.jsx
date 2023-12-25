/**
 * custom Hook 만들어 보기
 */
import { FaSearch } from "react-icons/fa"
import { useEffect, useState, useRef  } from 'react'
import axios from 'axios'
import '../assets/Paging.css'
import Pagination from "react-js-pagination"

/**
 * 첫 렌더링 때 함수 실행 막는 custom hook
 * @param {func} func // 함수
 * @param {object} deps // useEffect 실행 여부 object
 */
const useDidMountEffect = (func, deps) => {
    const didMount = useRef(false)
  
    useEffect(() => {
      if (didMount.current) func()
      else didMount.current = true
    }, deps)
  }

// selectBox 옵션
const selectOptions = [
    { value: "", label: "전체" },
    { value: "inu", label: "학교" },
    { value: "lib", label: "도서관" },
    { value: "dorm", label: "기숙사" },
    { value: "int", label: "국제교류원" },
    { value: "cse", label: "컴퓨터공학부" }
]
/**
 * selectBox value값 표기를 label값으로 변경하는 함수
 * @param {string} value 
 * @returns {string} label
 */
const formatTitle = (value) => {
    return selectOptions.find((element) => element.value === value).label

}
// SelectBox 컴포넌트
const SelectBox = (props) => {
    return (
        <select
            className="form-select"
            aria-label="Default select example"
            style={props.style}
            name="category1"
            onChange={props.change}
            value={props.category1Info}
            hidden={props.hiddenYn}
        >
            {props.options.map((option) => (
                <option
                    key={option.value}
                    value={option.value}
                >
                    {option.label}
                </option>
            ))}
        </select>
    )
}
const MainList = (props) => {
    // 공지 데이터 초기값 세팅
    const [dataList, setDataList] = useState([])

    // 검색 데이터 초기값 세팅
    const [search, setSearch] = useState({
        num: 0,
        category1: '',
        keyword: ''
    })
    // 검색용 셀렉트 박스 초기값 세팅
    const [category1Info, setCategory1Info] = useState('')
    // 검색어 초기값 세팅
    const [keywordInfo, setKeywordInfo] = useState('')

    //현재 페이지 초기값 세팅
    const [page, setPage] = useState(1)
    //총 게시물 개수 초기값 세팅
    const [totalElements, setTotalElements] = useState(1)

    const [title, setTitle] = useState('')

    /**
     * boardList Data 호출 함수
     */
    const getBoardList = async () => {

        const queryString = Object.entries(search).map((e) => e.join('=')).join('&')
        console.log('queryString: ', queryString)
        try {
            let resp = await (await axios.get("http://localhost:8080/articlesBbs?" + queryString)).data
            console.log(resp)
            // 게시판 데이터 세팅
            setDataList(resp.list)
            // 페이징에 필요한 게시물 개수 세팅
            setTotalElements(resp.totalElements)
        } catch (error) {
            alert('조회 에러');
            return
        }
    }
    /**
     * 페이지 버튼 클릭 함수
     * @param {Number} page
     */
    const pageButtonClick = (page) => {
        // 현재 페이지 변경
        setPage(page)
        // 해당 페이지 데이터 호출
        setSearch({
            ...search,
            num: page - 1,
        })
    }
    /**
     * 데이터 변경 함수(input & selectBox)
     * @param {SyntheticBaseEvent} e 
     */
    const onChange = (e) => {
        const { value, name } = e.target
        if (name === 'category1') {
            setCategory1Info(value)
        }

        if (name === 'keyword') {
            setKeywordInfo(value)
        }
    }
    /**
     * 검색 함수(임시로 저장해둔 데이터들을 search에 세팅)
     */
    const onSearch = () => {
        if (keywordInfo.trim() === '') { alert('검색어를 입력하세요') }
        else {
            setSearch({
                ...search,
                num: 0,
                category1: category1Info,
                keyword: keywordInfo
            })
        }
    }
    /**
     * 엔터키 함수
     * @param {SyntheticBaseEvent} e 
     */
    const enterKey = (e) => {
        if (e.keyCode === 13) {
            // 엔터키가 눌렸을 때
            onSearch()
        }
    }
    /**
     * category1에 대한 정보 세팅하는 함수
     */
    const category1SetInfo = () => {
        setTitle(props.nevCategory1)
        setCategory1Info(props.nevCategory1)
        setPage(0)
        setSearch({
         num: 0,
         category1: props.nevCategory1
     })
    }

    /**
     * navbar 클릭시 카테고리 변경
     */
    useDidMountEffect(() => {
        category1SetInfo()
    }, [props.nevCategory1])

    /**
     * search 데이터 변경시 getBoardList 호출
     */
        useEffect(() => {
            getBoardList()
            console.log('검색데이터:', search)
        }, [search])

    return (
        <main>
            <div className="container-fluid px-4">
                <h1 className="mt-4 mb-4"><b>{!title? "전체 공지" : formatTitle(title)}</b></h1>
                <div className="card mb-4">
                    <div className="card-body" >
                        <div className="row justify-content-end">
                            <SelectBox
                                options={selectOptions}
                                change={onChange}
                                style={{ display: 'inline-block', width: '10%' }}
                                category1Info={category1Info}
                                hiddenYn={!title? false : true}
                            />
                            <div style={{ display: 'inline-block', width: '25%' }}>
                                <div className="input-group">
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Search for..."
                                        aria-label="Search for..."
                                        aria-describedby="btnNavbarSearch"
                                        name="keyword"
                                        onChange={onChange}
                                        onKeyUp={enterKey}
                                    />
                                    <button
                                        className="btn btn-primary"
                                        id="btnNavbarSearch"
                                        type="button"
                                        onClick={onSearch}
                                    >
                                        <FaSearch />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card mb-4">
                    <div className="card-body">
                        <table
                            id="datatablesSimple"
                            className="table table-hover"
                            style={{ textAlign: "center", tableLayout: "fixed" }}
                        >
                            <thead>
                                <tr className="table-secondary" style={{ alignItems: "center" }}>
                                    <th style={{ width: '10%' }}>대분류</th>
                                    <th style={{ width: '15%' }}>소분류</th>
                                    <th style={{ width: '45%' }}>제목</th>
                                    <th style={{ width: '15%' }}>작성자</th>
                                    <th style={{ width: '15%' }}>작성일</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!dataList ? (
                                    <tr>
                                        <td colSpan={5}>데이터 없음</td>
                                    </tr>
                                ) : (
                                    dataList.map((data, idx) => (
                                        <tr key={idx}>
                                            <td>{formatTitle(data.category1)}</td>
                                            <td style={{ whiteSpace: "noWrap", overflow: "hidden", textOverflow: "ellipsis" }}>{data.category2}</td>
                                            <td style={{ whiteSpace: "noWrap", overflow: "hidden", textOverflow: "ellipsis" }}><a href={data.url}>{data.title}</a></td>
                                            <td style={{ whiteSpace: "noWrap", overflow: "hidden", textOverflow: "ellipsis" }}>{data.writer}</td>
                                            <td>{data.date}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                        <Pagination
                            activePage={page} // 현재 페이지
                            itemsCountPerPage={10} // 한 페이지당 보여줄 아이템 갯수
                            totalItemsCount={totalElements} // 총 아이템 개수
                            pageRangeDisplayed={5} // paginator의 페이지 범위
                            prevPageText={"‹"} // "이전"을 나타낼 텍스트
                            nextPageText={"›"} // "다음"을 나타낼 텍스트
                            onChange={pageButtonClick} // 페이지 변경을 핸들링하는 함수
                        />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default MainList