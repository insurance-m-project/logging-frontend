import React from 'react';
import {
    Container,
    HospitalText,
    SystemTitleText,
    WhiteContainer
} from "../../components/container/Container";
import Styled from "styled-components";
import LoggingCell from "./LoggingCell";

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
    return (
        <Container>
            <TitleContainer>
                <SystemTitleText> 보험 서류청구 시스템 </SystemTitleText>
                <HospitalText>연세이비인후과의원</HospitalText>
            </TitleContainer>
            <WhiteContainer>
                <Bar/>
                <TableContainer>
                    <Table>
                        <TransactionThead>
                            <tr>
                                <th width="70%">Transaction Hash</th>
                                <th width="30%">Date</th>
                            </tr>
                        </TransactionThead>
                        <tbody>
                            <LoggingCell
                                transactionHash={"ddkk"}
                                date={"dkdk"}
                            />
                        </tbody>
                    </Table>
                </TableContainer>
            </WhiteContainer>
        </Container>
    )
}


export default LoggingList;
