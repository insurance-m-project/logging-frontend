import React, {useEffect, useState} from 'react';
import Styled from "styled-components"
import {BasicContainer, Container, SystemTitleLogo} from "../../components/container/Container";
import MeritzLogo from "../../images/MeritzLogo.svg";
import {useParams} from "react-router-dom";
import MedicalRecords from "../../components/contracts/MedicalRecords.json";
import UseWeb3 from "../../hooks/UseWeb3";

const TitleContainer = Styled.div`
  display: flex;
  justify-content: space-between;
`
// 표 있는 페이지의 네이비 바
const Bar = Styled.div`
  border-radius: 12px;
  height: 60px;
  width: 100%;
  background-color: #2A3042;
  box-sizing: border-box;
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  text-align: left;
  align-items: center;
  padding: 0 30px;
  justify-content: ${props => props.space ? 'space-between' : null};
`

const ColumnContainer = Styled.div`
  height: 40px;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 40px;
  margin-right: 30px;
`
const ShortColumnContainer = Styled(ColumnContainer)`
  display: flex;
  width: 30%;
`

const TableColumnContainer = Styled(ColumnContainer)`
  display: contents;
  width: 100%;
`

const TitleLabel = Styled.label`
  color: #262DE0;
  font-size: 20px;
  width: 150px;
  min-width: 100px;
  text-align: left;
`

const InfoInput = Styled.input.attrs({type: 'text'})`
  flex: 1;
  height: 20px;
  border-radius: 8px;
  border: 2px solid #E6E6E6;
  font-size: 20px;
  padding: 10px;
`

const MarginColumnContainer = Styled(BasicContainer)`
  padding: 40px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
const MarginRowContainer = Styled.div`
  display: flex;
  flex-direction: row;
`

const InfoTable = Styled.table`
  width: 100%;
  margin: 0 0 40px 40px;
  border-collapse: collapse;
  border: 1px solid #959494;
  font-size: 17px;
`

const InfoTableData = Styled.td`
  border: 1px solid #959494;
  height: 45px
`

const InfoTableNumberData = Styled(InfoTableData)`
  text-align: right;
  padding-right: 10px;
`

const ManageAddButtonImage = Styled.img`
  width: 16px;
  height: 16px;
  border-radius: 12px;
  border: 1px dashed var(--gray-300, #FFF);
  margin-right: 10px;
`

const AddButtonContainer = Styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: flex-end;
`

const ManageAddButton = Styled.button`
  height: 100%;
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  background: #414FCB;
  display: flex;
  align-items: center;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  cursor: pointer;
  font-size: 17px;
  color: white;
  white-space: nowrap;
`

function LoggingDetail() {

    const InitialValue = {
        name: '홍길동',
        RRN: '010101-3123456',
        KCD: 'J09',
        date: '2024-01-01',
        receiptNumber: '2401-01010',
        totalOop: null,
        totalPcc: null,
        totalFoop: null,
        nonReimbursement: null
    };

    // attribute
    const [inputValues, setInputValues] = useState(InitialValue);
    const {name, RRN, KCD, date, receiptNumber} = inputValues;
    let {address} = useParams()
    const [web3, account] =  UseWeb3();
    const getLoggingData = async () => {

        const networkId = await web3.eth.net.getId();
        const abi = MedicalRecords.abi;
        const log = new web3.eth.getTransactionReceipt(address, function(err, receipt) {
            if (!err) {
                receipt.logs.forEach(logs => {
                    const decodedLog = web3.eth.abi.decodeParameters(abi[0].inputs, logs.data);
                    console.log(decodedLog);
                });
            } else {
                console.error(err);
            }
        }); // 배포한 컨트랙트 정보 가져오기
        console.log(log);
        // const log = await Deployed.methods.getHospitalRecord(account).call();
        // setLogging(log.loggings);
    };


    useEffect(() => {
        if(account == null || web3 == null) return;
        getLoggingData();
        console.log(address);

    }, [web3, address]);

    const onChangeInput = event => {
        const {value, name: inputName} = event.target;
        setInputValues({...inputValues, [inputName]: value});
    }

    // const onChange
    return (
        <Container>
            <SystemTitleLogo src={MeritzLogo}></SystemTitleLogo>
            <Bar/>
            <MarginColumnContainer>
                <ShortColumnContainer>
                    <TitleLabel>보낸주소</TitleLabel>
                    <InfoInput name='name' value={name} onChange={onChangeInput}/>
                </ShortColumnContainer>
                <ShortColumnContainer>
                    <TitleLabel>받은 주소</TitleLabel>
                    <InfoInput name='KCD' value={KCD} onChange={onChangeInput}/>
                </ShortColumnContainer>
                <ShortColumnContainer>
                    <TitleLabel>Transaction Hash</TitleLabel>
                    <InfoInput name='date' value={date} onChange={onChangeInput}/>
                </ShortColumnContainer>
                <ShortColumnContainer>
                    <TitleLabel>데이터</TitleLabel>
                    <InfoInput name='KCD' value={KCD} onChange={onChangeInput}/>
                </ShortColumnContainer>
                <ShortColumnContainer>
                    <TitleLabel>받은주소</TitleLabel>
                    <InfoInput name='date' value={date} onChange={onChangeInput}/>
                </ShortColumnContainer>
            </MarginColumnContainer>

        </Container>

    );
}


export default LoggingDetail;
