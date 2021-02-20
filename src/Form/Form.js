import React from 'react'
import './Form.css'
import { useHistory } from 'react-router-dom'
import { Button, TextField } from '@material-ui/core'
import DoneIcon from '@material-ui/icons/Done'
import CreateIcon from '@material-ui/icons/Create'
import colors from '../Library/colors'
import icon from '../asset/image/icon_thai_payment.png'

const radioValue = {
    telephone: "telephone",
    nationalId: "national ID"
}

export default function Form() {
    const history = useHistory();
    const [selectedField, setField] = React.useState(radioValue.telephone);
    const [telephone, setTelephone] = React.useState('');
    const [nationalId, setNationalId] = React.useState('');
    const [isError, setError] = React.useState(false);

    const handlerSubmit = () =>{
        switch(selectedField){
            case(radioValue.telephone):
                if(telephone !== '' && telephone.length === 10){
                    history.push("/show",{
                        type: radioValue.telephone,
                        value: telephone
                    })
                }else{
                    setError(true)
                }
                break;
            case(radioValue.nationalId):
                if(nationalId !== '' && nationalId.length === 13){
                    history.push("/show",{
                        type: radioValue.nationalId,
                        value: nationalId
                    })
                }else{
                    setError(true)
                }
                break;
        }
    }

    const clearForm = () =>{
        setTelephone('');
        setNationalId('');
    }

    return (
        <div id="form">
            <div id="form-container">
                <div id="head-title">
                    <img src={icon} alt="prompt pay" className="main-logo"/>
                </div>
                <hr/>
                <div style={{textAlign: 'center', marginTop: 10}}>
                    <TopButton
                    title="เบอร์โทรศัพท์"
                    isSelected={selectedField === radioValue.telephone}
                    onClick={()=>{
                        setError(false);
                        clearForm();
                        setField(radioValue.telephone);
                    }}
                    />
                    <TopButton
                    title="บัตรประชาชน"
                    isSelected={selectedField === radioValue.nationalId}
                    onClick={()=>{
                        setError(false);
                        clearForm();
                        setField(radioValue.nationalId);
                    }}
                    />
                </div>
                <div id="form-field" style={{marginTop: 10}}>
                    { selectedField === radioValue.telephone ? 
                    <TextField 
                    label="เบอร์โทรศัพท์"
                    placeholder="XXXXXXXXXX"
                    inputProps={{ 
                        maxLength: 10,
                        inputMode: "numeric",
                    }}
                    error={isError && telephone.length < 10 ? true:false}
                    helperText={"กรุณากรอกเบอร์โทรศัพท์ 10 หลัก"}
                    value={telephone}
                    onChange={(e)=>{
                        setTelephone(e.target.value);
                    }}
                    style={{display:'block', marginTop: 8}}/>
                    : null
                    }
                    { selectedField === radioValue.nationalId ?
                    <TextField 
                    label="เลขที่บัตรประจำตัวประชาชน"
                    placeholder="XXXXXXXXXXXXX"
                    value={nationalId}
                    onChange={(e)=>{
                        setNationalId(e.target.value);
                    }}
                    inputProps={{ 
                        maxLength: 13,
                        inputMode: "numeric",
                    }}
                    error={isError && nationalId.length < 13 ? true:false}
                    helperText={"กรุณากรอกเลขบัตรประชาชน 13 หลัก"}
                    style={{display:'block', marginTop: 8}}/>
                    : null
                    }
                </div>
                <div id="form-bottom">
                    <Button 
                    variant="contained"
                    color="primary"
                    onClick={()=>handlerSubmit()}
                    style={{width: "100%", backgroundColor: colors.primary}}>
                        <CreateIcon style={{width: 20, height: 20, marginRight: 5}}/> สร้าง QRCode
                    </Button>
                </div>
            </div>
            
        </div>
    )
}

function TopButton(props){
    const title = props.title;
    const isSelected = props.isSelected;
    const onClick = props.onClick;

    return(
        <Button 
        style={{
            marginRight: 10, 
            color: isSelected ? colors.primary : colors.black
        }}
        onClick={onClick}>
            <b>{title}</b>
            { isSelected ?
            <DoneIcon style={{fontSize: 18, marginLeft: 6}}/> : null
            }
        </Button>
    )
}