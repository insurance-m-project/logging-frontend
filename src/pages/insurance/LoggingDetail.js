import React, {useEffect, useState} from 'react';
import Styled from "styled-components"
import {Container, SystemLink, SystemTitleLogo, WhiteContainer} from "../../components/container/Container";
import MeritzLogo from "../../images/MeritzLogo.svg";
import {Link, useParams} from "react-router-dom";
import SearchButtonImage from "../../images/SearchPlus.svg"
import MedicalRecords from "../../components/contracts/MedicalRecords.json";
import UseWeb3 from "../../hooks/UseWeb3";
import PrettyJson from "./PrettyJson";

// 표 있는 페이지의 네이비 바
const Bar = Styled.div`
  border-radius: 12px;
  height: 60px;
  width: 100%;
  background-color: #2A3042;
  box-sizing: border-box;
  position: sticky;
  top: 0;
  display: flex;
  text-align: left;
  align-items: center;
  padding: 0 30px;
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
  background: #E52712;
  display: flex;
  align-items: center;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  cursor: pointer;
  font-size: 17px;
  color: white;
  white-space: nowrap;
`

const ColumnContainer = Styled.div`
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  margin-right: 30px;
`
const ShortColumnContainer = Styled(ColumnContainer)`
  margin-left: 60px;
  display: flex;
  width: 30%;
`
const TitleLabel = Styled.label`
    flex: 1;
  color: #600000;
  font-size: 20px;
  width: 150px;
  min-width: 100px;
  text-align: left;
  margin-right: 100px;
`
const RightLabel = Styled(TitleLabel)`  
   margin-right: 0px;
`

const Input = Styled.p`
  flex: 1;
  min-width: 300px;
  max-width: 300px;
  height: 30px;
  border-radius: 8px;
  border: 1px solid #E6E6E6;
  
  display: inline-block; 
  font-size: 20px;
  padding: 10px;
  text-align: left;
`

const InfoInput = Styled(Input)`
  overflow-y: hidden;
`


const DataInput = Styled(Input)`
  height: 200px;
  word-wrap: break-word;
  overflow-y: scroll;
  font-size: 20px;
`

const DataOutput = Styled(Input)`
  min-width: 500px;
  height: 450px;
  overflow-y: scroll;
`

const MarginRowContainer = Styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  
  
`
const MarginColumnContainer = Styled.div`
  justify-content: space-around;
  box-sizing: border-box;
  // padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
`

function LoggingDetail() {
    // attribute
    let {address} = useParams();
    const [web3, account] = UseWeb3();
    const [to, setTo] = useState('');
    const [from, setFrom] = useState('');
    const [data, setData] = useState('');
    const [decodeData, setDecodeData] = useState('');
    const [logging, setLogging] = useState([]);

    const getLoggingData = async () => {
        const abi = MedicalRecords.abi;
        const receipt = await new Promise((resolve, reject) => {
            web3.eth.getTransactionReceipt(address, function (err, receipt) {
                if (!err) {
                    const decodedLogs = receipt.logs.map(log => {
                        return web3.eth.abi.decodeParameters(abi[0].inputs, log.data);
                    });
                    console.log(decodedLogs);
                    setLogging(decodedLogs);
                    resolve(receipt);
                } else {
                    console.error(err);
                    reject(err);
                }
            });
        });
        setTo(receipt.to);
        setFrom(receipt.from);
        setData(receipt.logs[0].data);
    };


    useEffect(() => {
        if (account == null || web3 == null) return;
        getLoggingData();
       console.log(logging);
    }, [web3]);

    const onClickBtn = event => {
        const abi = MedicalRecords.abi;
        console.log();
        const dataToJson = JSON.stringify(web3.eth.abi.decodeParameters(abi[0].inputs, data), null, 2);
        setDecodeData(dataToJson);
    }
    // const onChange
    return (
        <Container>
            <SystemLink><Link to={'/'}><SystemTitleLogo src={MeritzLogo}></SystemTitleLogo></Link></SystemLink>
            <WhiteContainer>
                <Bar>
                    <AddButtonContainer>
                        <ManageAddButton onClick = {onClickBtn}>
                            <ManageAddButtonImage src={SearchButtonImage} />
                            변환
                        </ManageAddButton>
                    </AddButtonContainer>
                </Bar>
                <MarginRowContainer>
                    <MarginColumnContainer>
                        <ShortColumnContainer>
                            <TitleLabel>보낸주소</TitleLabel>
                            <InfoInput>{from}</InfoInput>
                        </ShortColumnContainer>
                        <ShortColumnContainer>
                            <TitleLabel>받은 주소</TitleLabel>
                            <InfoInput>{to}</InfoInput>
                        </ShortColumnContainer>
                        <ShortColumnContainer>
                            <TitleLabel>Transaction Hash</TitleLabel>
                            <InfoInput>{address}</InfoInput>
                        </ShortColumnContainer>
                        <ShortColumnContainer>
                            <TitleLabel>데이터</TitleLabel>
                            <DataInput>{data}</DataInput>
                        </ShortColumnContainer>
                    </MarginColumnContainer>
                    <MarginColumnContainer>
                        <ShortColumnContainer>
                            <RightLabel>변환데이터</RightLabel>
                            <DataOutput><PrettyJson data={decodeData} /></DataOutput>
                        </ShortColumnContainer>
                    </MarginColumnContainer>
                </MarginRowContainer>
            </WhiteContainer>
        </Container>

    );
}


export default LoggingDetail;
