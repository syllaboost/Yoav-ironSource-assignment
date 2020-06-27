import axios from 'axios';
import {START_TACKING_PIXEL_URL, END_TACKING_PIXEL_URL} from './constants';
export const sendStartVideoTreckingPixel = async () => {
    axios.get(START_TACKING_PIXEL_URL)
    .then(() => console.log("start tracking pixel been sent successfully"))
    .catch(err => console.error("error in sending start tracking pixel: ", err.message))
}

export const sendEndVideoTreckingPixel = async () => {
    axios.get(END_TACKING_PIXEL_URL)
    .then(() => console.log("end tracking pixel been sent successfully"))
    .catch(err =>  console.error("error in sending end tracking pixel: ", err.message))
};