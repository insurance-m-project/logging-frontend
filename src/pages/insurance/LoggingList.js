import React, {useEffect, useState} from 'react';
import {
    Container,
    SystemTitleLogo,
    WhiteContainer
} from "../../components/container/Container";
import Styled from "styled-components";
import LoggingCell from "./LoggingCell";
import UseWeb3 from "../../hooks/UseWeb3";
import MedicalLogging from '../../components/contracts/MedicalLogging.json';
import MeritzLogo from "../../images/MeritzLogo.svg";

const TitleContainer = Styled.div`
  display: flex;
  justify-content: space-between;
`

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
const TableContainer = Styled.div`
  overflow-y: scroll;
`
const TransactionThead = Styled.thead`
  position: sticky;
  top: 0;
  border-radius: 12px;
  height: 60px;
  z-index: 2;
  color: white;
`

const Table = Styled.table`
  border-collapse: collapse;
  width: 100%;
  font-size: 18px;
  position: absolute;
  top: 0;
  table-layout: fixed;
`

function LoggingList() {
    const [web3, account] = UseWeb3();
    const [loggings, setLogging] = useState([]);

    // 데이터 불러오기
    const getLoggingData = async () => {
        const networkId = await web3.eth.net.getId();
        const CA = MedicalLogging.networks[networkId].address;
        const abi = MedicalLogging.abi;
        const Deployed = new web3.eth.Contract(abi, CA); // 배포한 컨트랙트 정보 가져오기
        const log = await Deployed.methods.getHospitalRecord(account).call();
        setLogging(log.loggings);
        console.log(loggings);
    };

    useEffect(() => {
        getLoggingData();
    }, [web3, account]);

    return (
        <Container>
            <SystemTitleLogo src = {MeritzLogo}></SystemTitleLogo>
            <WhiteContainer>
                <Bar/>
                <TableContainer>
                    <Table>
                        <TransactionThead>
                            <tr>
                                <th width="60%">Transaction Hash</th>
                                <th width="40%">Date</th>
                            </tr>
                        </TransactionThead>
                        <tbody>

                        {loggings.map(function (info, i){
                            return <LoggingCell
                                transactionHash={info.transactionHash}
                                date={info.date}
                            />
                        })}
                        </tbody>
                    </Table>
                </TableContainer>
            </WhiteContainer>
        </Container>
    )
}


export default LoggingList;
