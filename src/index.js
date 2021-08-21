import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import GetDetails from './components/GetDetails';
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
  Image,
  Divider,
  Container
} from "semantic-ui-react";

ReactDOM.render(
  <React.StrictMode>
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{width:600}}>
        <Divider></Divider>
        <Image
        src="https://i.ibb.co/WVcv2Dd/banner2.png" alt="banner2"
        as='a'
        size='massive'
        href='https://opensea.io/collection/cryptographiccoins'
        target='_blank'
        />
      </Grid.Column>
    </Grid>

    <GetDetails />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
