import './App.css';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import ListItem from './component/ListItem';
import axios from "axios";

function App() {
  const [textSearch, setTextSearch] = useState('');
  const [api, setApi] = useState('');
  const [isEnter, setIsEnter] = useState(false);
  const [data, setData] = useState([]);  
  const [number, setNumber] = useState(1);
  const [checkScroll, setCheckScroll] = useState(false);

  const handleOnChangeInput = (event) => {
    setTextSearch(event.target.value);
  }

  const handleKeyDown = (event) => {
    if(event.key === 'Enter') {
      setData([]);
      setNumber(1);
      isEnter === false ? setIsEnter(true) : setIsEnter(false);
    }
  }

  const loadMore = () => {
    if(window.innerHeight + document.documentElement.scrollTop >= document.scrollingElement.scrollHeight) {
      setData([]);
      console.log('>>> check number trong load: ', number)
      console.log('>>> check isEnter trong load: ', isEnter)
      console.log('.')
      checkScroll === false ? setCheckScroll(true) : setCheckScroll(false);
      setNumber(number + 10);
      isEnter === false ? setIsEnter(true) : setIsEnter(false);
      
    }
  }

  // thiết lập API
  useEffect(() => {
    if(textSearch.trim() !== "") {
      setApi(`https://www.googleapis.com/customsearch/v1/siterestrict?key=AIzaSyBkRruIsdAZTRJAbzn7SNH3x0n4NCdGoNc&cx=f2fbc064f3d414b32&q=${textSearch}&start=${number}`)
      console.log('>>>> check number lúc setAPI: ', number)
      console.log('>>>> check isEnter lúc setAPI: ', isEnter)
      console.log('.')
    }
  }, [isEnter])


  // lấy data dựa vào API vừa thiết lập
  useEffect(() => {
    // const controller = new AbortController();
    axios
        .get(api)
        .then(function(response) {
          let value;
          var promise = new Promise(
            function(resolve, reject) {
              value = response.data.items.map(eachValue => {
                return {
                  title: eachValue.title,
                  body: eachValue.snippet,
                  link: eachValue.link,
                  image: eachValue.pagemap.cse_image[0].src
                }
              })
              if(value.length > 0) resolve();
              else reject();
            }
          )
          promise
            .then(function() {
              if(data.length === 0) {
                console.log('Chiều dài dữ liệu là 0');
                console.log('>>>> check number khi chiều dài data là 0: ', number)
                console.log('>>>> check isEnter khi chiều dài data là 0: ', isEnter)
                console.log('.')
                setData(value);
                setNumber(number + 10);
                isEnter === false ? setIsEnter(true) : setIsEnter(false);

              } else if (data.length === 10) {
                console.log('Chiều dài dữ liệu là 10');
                console.log('>>>> check number khi chiều dài data là 10: ', number)
                console.log('>>>> check isEnter khi chiều dài data là 10: ', isEnter)
                console.log('.')
                let tmp = data.concat(value);
                setData(tmp);
              }
              console.log("Lấy xong dữ liệu")
              console.log('.')
            })
            .catch(function() {})
            .finally(function() {});
        })
        .catch(function (error) {
            if (axios.isCancel(error)) {  //  canceled
                console.log('>> Error request cancel: ',error.message);
            } else {  // ko cancel thì load thông báo  
                console.log('>> Not error request cancel: ', error);
            }
            setData([])
        })
        .finally(function () {
        });

    // cleanup useEffect
    // return () => {
      // cancel the request
      // controller.abort()
    // }
  }, [api])


  // khi cuộn xuống cuối trang -> lấy thêm dữ liệu để hiển thị
  useEffect(() => {
    window.addEventListener('scroll', loadMore);

    return () => {
      window.removeEventListener('scroll', loadMore);
    };
  }, [checkScroll])

  return (
    <div className="App">
      {/* Header */}
      <header className="App-header">
        <img className='header-image' height={40} width={160} src="https://bookingcare.vn/assets/icon/bookingcare-2020.svg" alt='BookingCare' />
        
        <div className='header-timkiem-form'>
          <div className='header-timkiem'>
            <div className='header-timkiem-icon'>
              <FontAwesomeIcon icon={faSearch} />
            </div>
            <input id='timkiem' type='text' placeholder='Tìm kiếm' 
              value={textSearch} onChange={(event) => handleOnChangeInput(event)}
              onKeyDown={(event) => handleKeyDown(event)}
            />
          </div>
        </div>

        <div className='header-hotro' >
          <span style={{color: '#969495'}}>Hỗ trợ</span>
          <span style={{fontSize: 12, color: '#45c3d2'}}>024-7301-2468</span>
        </div>
      </header> 

      <hr  width="95%" align="center" />
      <div>Hahahaaa</div>

      {/* Body */}
      <div style={{marginLeft: 35, marginTop: 30}}>
        {/* Nếu có dữ liệu */}
        {data && data.length > 10 && data.map((item) =>{
          return(
            <ListItem data={item} key={item.link}/>
          )
        })}
        
        {/* Nếu không có dữ liệu */}
        {data.length === 0 && 
            <div className='body-no-data'>
              <h2 style={{color: '#45c3d2', marginBottom: 10}}>TÌM KIẾM TRÊN BOOKINGCARE</h2>
              {/* <h1 style={{fontSize: 30, color: '#45c3d2'}} > NỀN TẢNG Y TẾ </h1>
              <h1 style={{fontSize: 30, marginBottom: 30, color: '#45c3d2'}} > CHĂM SÓC SỨC KHỎE TOÀN DIỆN </h1> */}
            </div>
        }

        <div style={{paddingBottom: 50}}></div>
      </div>
    </div>
  );
}

export default App;

//    setApi(`https://www.googleapis.com/customsearch/v1/siterestrict?key=AIzaSyCbWtzRUPI8D-GO7tngx2pdLyM6-Xs2dd0&cx=94adb44367a9b4c69&q=${textSearch}&start=${number}`)
// 1  setApi(`https://www.googleapis.com/customsearch/v1/siterestrict?key=AIzaSyAGJYEOTYkGwdrW3PEM2GhR6BXP9gD4Wbk&cx=c40a78ed75f554ac3&q=${textSearch}&start=${number}`)
// 2  setApi(`https://www.googleapis.com/customsearch/v1/siterestrict?key=AIzaSyDTu5UtxtHcj-MR_fQt1_tqkozqf0shMrs&cx=52657caf019ac4682&q=${textSearch}&start=${number}`)
// 3  setApi(`https://www.googleapis.com/customsearch/v1/siterestrict?key=AIzaSyDpYAiucujMHDhsizyPhIrOxOEQzmsl1VI&cx=673b4469b8d3447b8&q=${textSearch}&start=${number}`)
// 4  setApi(`https://www.googleapis.com/customsearch/v1/siterestrict?key=AIzaSyBBq0WmRKmb1J1KqShxqz8InbqCAyU8ags&cx=113c1b2f720c84566&q=${textSearch}&start=${number}`)
// 5  setApi(`https://www.googleapis.com/customsearch/v1/siterestrict?key=AIzaSyAvaxp2VHyizUOP2zTMQm4SZZSWRqwxQ54&cx=24718fd28a43546c6&q=${textSearch}&start=${number}`)
// 6  setApi(`https://www.googleapis.com/customsearch/v1/siterestrict?key=AIzaSyBy63PKsTyfx1y_HCS9r7kKAKb_t8BEijg&cx=52aab321a4b6a4660&q=${textSearch}&start=${number}`)

// , {
  // signal: controller.signal
// }


