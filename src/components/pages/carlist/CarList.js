import React, { useEffect, useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import './CarList.scss';
import CarListItem from './carListItem/CarListItem';
import axios from 'axios';
import PageButton from '../pageButton/PageButton';
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

const CarList = () => {
  // 버튼 동작 확인용
  const handleDetailClick = () => {
    window.location.href = 'https://www.naver.com';
  };

  const handleSearchClick = () => {
    alert('검색버튼 클릭 확인용');
  };

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;
  createSearchParams(page);

  const [pageMaker, setPageMaker] = useState({});

  const [carInfoList, setCarInfoList] = useState([]);

  const [pageButtoncount, setPageButtonCount] = useState();

  const [pageNo, setPageNo] = useState(1);
  const location = useLocation();
  const pageButtonClickHandler = (no) => {
    setPageNo(no);
    if (location.pathname && pageNo !== no) {
      navigate(`/carList?page=${no}`, { state: page });
    }
  };

  useEffect(() => {
    const handleBackButton = (event) => {
      // 이 이벤트를 통해 뒤로 가기 버튼이 눌렸을 때 원하는 작업을 수행할 수 있습니다.
      console.log(event.state);

      setPageNo(event.state);
    };

    window.addEventListener('popstate', handleBackButton);
  }, []);

  const carListRendering = async () => {
    let url = `http://localhost:8181/carList?pageNo=${page}`;
    // console.log(url);
    const res = await axios.get(url);

    try {
      console.log(res.data);
      setCarInfoList(res.data.subsidyCarList);
      setPageMaker(res.data.pageMaker);
      setPageButtonCount(res.data.pageMaker.end);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    carListRendering();
  }, [pageNo]);

  return (
    <Grid container className='carContainer'>
      <Typography variant='h1' className='ecoCarTitle'>
        구매보조금 지원 차종
      </Typography>

      <Grid
        item
        className='carbox'
        style={{
          marginTop: '20px',
          marginBottom: '100px',
        }}
      >
        <div className='searchBox'>
          <input
            type='text'
            placeholder='차량을 검색하세요.'
            className='search'
          />
          <Button
            className='searchBtn'
            variant='contained'
            // color='primary'
            onClick={handleSearchClick}
          >
            검색
          </Button>
        </div>
        <Grid container className='carInfoBox'>
          {carInfoList.map((carInfo) => (
            <CarListItem key={carInfo.id} info={carInfo} />
          ))}

          <PageButton
            pageMaker={pageMaker}
            buttonCount={pageButtoncount}
            clickHandler={pageButtonClickHandler}
            page={pageNo}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CarList;
