import React, { useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';
import styled from 'styled-components';

export const Container = styled.div`
  box-sizing: border-box;
  font-family: 'Roboto Mono', monospace;
  max-width: 700px;
  height: 600px;
  margin: 0 auto;
  text-align: center;
  font-height: 1.4rem;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
`


export default function Search () {
    const [keyword, setKeyword] = useState()
    const [giphy, setGiphy] = useState()
    const [loading, setLoading] = useState(false)
     
    const searchGiphy = () => {
        setLoading(true)
        const api_key = 'm7NRr08D4ogCCb4hoKCF78Hr45OOYVcM'
        const q = keyword
        const limit = 1
    
        axios
        .get(`http://api.giphy.com/v1/gifs/search?q=${q}&api_key=${api_key}&limit=${limit}`)
        .then((response) => {
          console.log('response', response)
          const url = response.data.data[0].embed_url
          setGiphy(url)
          setLoading(false)
        })
        .catch(function(err) {
          console.error(err);
        })
      }

    return ( 
        <Container>
            <div>
                <h1>Encontre gifs dahora</h1>
                <input onChange={e => setKeyword(e.target.value)}/>
                <button onClick={searchGiphy}>Buscar</button>
            </div>

            {loading ?
                <div>
                    <LoadingOutlined style={{ fontSize: 24 }} spin />
                </div>
                :
                <div>
                    <iframe src={giphy} title='gif' width="480" height="460" frameBorder="0" />
                </div>
            }   
        </Container>

     );
}
