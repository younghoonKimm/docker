import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Input, List, Button } from 'antd';
import 'antd/dist/antd.css';

const { Search } = Input;

const Wrapper = styled.div`
  margin: 0 auto;
  width: 400px;
  height: auto;
`;

const ListItem = styled(List.Item)`
  height: 100%;
`;

function App() {
  useEffect(() => {
    axios.get('/api/hi').then((response) => {
      console.log('response', response);
    });
  }, []);

  useEffect(() => {
    axios.get('/api/values').then((response) => {
      console.log('response', response);
      setLists(response.data);
    });
  }, []);

  const [lists, setLists] = useState([]);
  const [value, setValue] = useState('');

  const changeHandler = (e) => {
    setValue(e.currentTarget.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post('/api/value', { value: value }).then((response) => {
      if (response.data.success) {
        console.log('response', response.data);
        setLists([...lists, response.data]);
        setValue('');
      } else {
        alert('값을 DB에 넣는데 실패했습니다.');
      }
    });
  };

  const deletHandler = (e) => {
    e.preventDefault();
    lists.filter((list) => list !== list);
  };

  return (
    <Wrapper>
      <br />
      Docker build
      <br />
      <form className='example' onSubmit={submitHandler}>
        <Search loading enterButton type='text' placeholder='입력해주세요...' onChange={changeHandler} value={value} />
      </form>
      <List>
        {lists &&
          lists.map((list, index) => (
            <ListItem
              key={index}
              actions={[
                <Button onClick={(e) => deletHandler(e)} key='list-loadmore-edit'>
                  삭제
                </Button>,
              ]}
            >
              {list.value}{' '}
            </ListItem>
          ))}
      </List>
      <br />
    </Wrapper>
  );
}

export default App;
