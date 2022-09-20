import express from 'express';
import mongoose from 'mongoose'
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { v4 as uuid } from 'uuid';

//import Connection from './database/db.js';
import DefaultData from './default.js';
import Routes from './routes/route.js';


dotenv.config();
const app = express();

const Connect = async () => {
    const URL="mongodb+srv://naveen1:naveen1@cluster0.7mqul.mongodb.net/flipcart?retryWrites=true&w=majority"
  try {
      await mongoose.connect(URL, { useNewUrlParser: true })
      console.log('Database connected successfully');
  } catch (error) {
      console.log('Error while connecting to the database ', error);
  }
};


DefaultData();


app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/', Routes);

export let paytmMerchantkey = process.env.PAYTM_MERCHANT_KEY;
export let paytmParams = {};
paytmParams['MID'] = process.env.PAYTM_MID,
paytmParams['WEBSITE'] = process.env.PAYTM_WEBSITE,
paytmParams['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID,
paytmParams['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID,
paytmParams['ORDER_ID'] = uuid(),
paytmParams['CUST_ID'] = process.env.PAYTM_CUST_ID,
paytmParams['TXN_AMOUNT'] = '100',
paytmParams['CALLBACK_URL'] = 'http://localhost:8000/callback'
paytmParams['EMAIL'] = 'naveenmech1074@gmail.com'
paytmParams['MOBILE_NO'] = '123456789'

const PORT = process.env.PORT||8000;


app.listen(PORT, () =>{
    Connect()
    console.log(`Server is running successfully on PORT ${PORT}`)});