import React from 'react'
import './QRCode.css'
import { useLocation, Link } from 'react-router-dom'
import icon from '../asset/image/icon_thai_payment.png'
import { Button } from '@material-ui/core'
import QRCodeView from 'qrcode.react'
import polycrc from 'polycrc'
import { ArrowBack } from '@material-ui/icons'

const typeValue = {
    telephone: "telephone",
    nationalId: "national ID"
}

const version = "000201"
const merchant_type = "010211"
const merchant = "2937"
const app_id = "0016A000000677010111"
const country = "5802TH"
const currency = "5303764"
const checksumPrefix = "6304"

function checkSumValue(value){
    let crc16 = polycrc.crc(16, 0x1021, 0xFFFF, 0x0000, false);
    let sum = crc16(value).toString(16).toUpperCase();
    return sum;
}

function formattedQR(type, value){
    var customerField = ""

    if(type === typeValue.telephone){
        const prefix = "01130066";
        let extractTel = value.slice(1, 10);
        let telVal = prefix + extractTel;
        customerField = telVal;
    }else if(type === typeValue.nationalId){
        const prefix = "0213";
        let val = value;
        let nationalVal = prefix + val;
        customerField = nationalVal;
    }else{
        return "Incorrect value!";
    }

    let allValue = version + merchant_type + merchant + app_id + customerField + country + currency + checksumPrefix;
    let checkSum = checkSumValue(allValue);
    let promptpayValue = allValue + checkSum;
    return promptpayValue;
}

export default function QRCodeShow() {
    const location = useLocation();
    const { type, value } = location.state;
    const [qr, setQr] = React.useState('');
    

    React.useEffect(()=>{
        let promptVal = formattedQR(type, value);
        setQr(promptVal);
    })

    return (
        <div id="form">
            <div>
                <div id="top-container">
                    <Link to="/">
                        <Button>
                            <ArrowBack/>
                        </Button>
                    </Link>
                    
                </div>
                <div id="form-container">
                    <div id="head-title">
                        <img src={icon} alt="prompt pay" className="main-logo"/>
                        <hr/>
                        <QRCodeView value={qr} size={250}/>
                    </div>
                    <hr/>
                    <div id="bottom-detail">
                        {type === typeValue.telephone ? "เบอร์โทรศัพท์": "บัตรประชาชน"} : {value}
                    </div>
                </div>
            </div>
        </div>
    )
}
