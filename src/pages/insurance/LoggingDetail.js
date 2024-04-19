import React, {useEffect, useState} from 'react';
import Styled from "styled-components"
import UseWeb3 from '../../hooks/UseWeb3';
import {Container, HospitalText, SystemTitleLogo, BasicContainer} from "../../components/container/Container";
import SearchButtonImage from "../../images/SearchPlus.svg"
import {addMedicalRecords} from "../../components/contracts/MedicalRecord";

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
    function formatNumber(number) {
        return new Intl.NumberFormat().format(number);
    }

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

    const InitialTreatDetail1 = {
        id: 1,
        category: "검사료",
        date: '2023-12-22',
        treatCode: '831',
        description: '인플루엔자 신속 항원검사',
        price: 20000,
        oop: 0,
        pcc: 0,
        foop: 0,
        nonReimbursement: 20000
    }
    const InitialTreatDetail2 = {
        id: 2,
        category: "주사료",
        date: '2023-12-22',
        treatCode: '647801091',
        description: '삼진토브라마이신주사80mg',
        price: 1203,
        oop: 361,
        pcc: 842,
        foop: 0,
        nonReimbursement: 0
    }
    const InitialTreatDetail3 = {
        id: 3,
        category: "주사료",
        date: '2023-12-22',
        treatCode: 'KK010',
        description: '피하또는근육내주사()',
        price: 1655,
        oop: 496,
        pcc: 1159,
        foop: 0,
        nonReimbursement: 0
    }
    const InitialTreatDetail4 = {
        id: 4,
        category: "진찰료",
        date: '2023-12-22',
        treatCode: 'AA254',
        description: '재진진찰료-의원, 보건의료원 내 의과',
        price: 12380,
        oop: 3714,
        pcc: 8666,
        foop: 0,
        nonReimbursement: 0
    }
    const InitialTreatDetail5 = {
        id: 5,
        category: "진찰료",
        date: '2023-12-22',
        treatCode: 'AL801',
        description: '의원 외래환자 의약품 관리료',
        price: 220,
        oop: 60,
        pcc: 154,
        foop: 0,
        nonReimbursement: 0
    }

    const InitialTreatDetailList = [
        InitialTreatDetail1,
        InitialTreatDetail2,
        InitialTreatDetail3,
        InitialTreatDetail4,
        InitialTreatDetail5
    ];

    // attribute
    const [inputValues, setInputValues] = useState(InitialValue);
    const[initialTreatDetailList, setInitialTreatDetailList] = useState(InitialTreatDetailList);
    const[total, setTotal] = useState(0);
    const {name, RRN, KCD, date, receiptNumber} = inputValues;
    const [totalOop, setTotalOop] = useState(0);
    const [totalPcc ,setTotalPcc] = useState(0);
    const [totalFoop ,setTotalFoop] = useState(0);
    const [nonReimbursement ,setNonReimbursement] = useState(0);
    const [web3, loggingWeb3, account] = UseWeb3();

    useEffect(() => {
        const totalOop = initialTreatDetailList.reduce((acc, info) => acc + info.oop, 0);
        const totalPcc = initialTreatDetailList.reduce((acc, info) => acc + info.pcc, 0);
        const totalFoop = initialTreatDetailList.reduce((acc, info) => acc + info.foop, 0);
        const nonReimbursement = initialTreatDetailList.reduce((acc, info) => acc + info.nonReimbursement, 0);

        setTotalOop(totalOop);
        setTotalPcc(totalPcc);
        setTotalFoop(totalFoop);
        setNonReimbursement(nonReimbursement);
        setTotal(totalPcc + totalFoop + nonReimbursement);

    }, []);

    const onChangeInput = event => {
        const {value, name: inputName} = event.target;
        setInputValues({...inputValues, [inputName]: value});
    }

    const onClickBtn = event => {
        const regUnique = /^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))-[1-8][0-9]{6}$/
        console.log(inputValues.RRN)
        if(!regUnique.test(inputValues.RRN)) {
            alert("주민번호를 다시 확인해주세요.");
            return;
        }

        addMedicalRecords(
            web3,
            loggingWeb3,
            account,
            inputValues,
            totalOop,
            totalPcc,
            totalFoop,
            nonReimbursement,
            initialTreatDetailList)
            .then(r => console.log(r));
    }

    // const onChange

    return (
        <Container>
            <TitleContainer>
                <SystemTitleLogo> 보험 서류 청구 시스템 </SystemTitleLogo>
                <HospitalText>연세이비인후과의원</HospitalText>
            </TitleContainer>
            <Bar/>
            <MarginColumnContainer>
                <MarginRowContainer>
                    <ShortColumnContainer>
                        <TitleLabel>성명</TitleLabel>
                        <InfoInput name='name' value={name} onChange={onChangeInput}/>
                    </ShortColumnContainer>
                    <ShortColumnContainer>
                        <TitleLabel>질병분류기호</TitleLabel>
                        <InfoInput name='KCD' value={KCD} onChange={onChangeInput}/>
                    </ShortColumnContainer>
                    <ShortColumnContainer>
                        <TitleLabel>진료기간</TitleLabel>
                        <InfoInput name='date' value={date} onChange={onChangeInput}/>
                    </ShortColumnContainer>
                </MarginRowContainer>
                <MarginRowContainer>
                    <ShortColumnContainer>
                        <TitleLabel>주민등록번호</TitleLabel>
                        <InfoInput name='RRN' value={RRN} onChange={onChangeInput}/>
                    </ShortColumnContainer>
                    <ShortColumnContainer>
                        <TitleLabel>영수증번호</TitleLabel>
                        <InfoInput name='receiptNumber' value={receiptNumber} onChange={onChangeInput}/>
                    </ShortColumnContainer>
                </MarginRowContainer>
                <MarginRowContainer>
                    <TableColumnContainer>
                        <TitleLabel>진료비<br></br>세부산정내역</TitleLabel>
                        <InfoTable>
                            <thead>
                                <tr style={{backgroundColor: '#B1C9F9', border: '1px solid #959494', height: '45px'}}>
                                    <th scope="col" style={{width: '7%', border: '1px solid #959494'}}>항목</th>
                                    <th scope="col" style={{width: '10%', border: '1px solid #959494'}}>일자</th>
                                    <th scope="col" style={{width: '10%', border: '1px solid #959494'}}>코드</th>
                                    <th scope="col" style={{width: '26%', border: '1px solid #959494'}}>명칭</th>
                                    <th scope="col" style={{width: '10%', border: '1px solid #959494'}}>금액</th>
                                    <th scope="col" style={{width: '10%', border: '1px solid #959494'}}>본인부담금</th>
                                    <th scope="col" style={{width: '10%', border: '1px solid #959494'}}>공단부담금</th>
                                    <th scope="col" style={{width: '10%', border: '1px solid #959494'}}>전체본인부담</th>
                                    <th scope="col" style={{width: '10%', border: '1px solid #959494'}}>비급여</th>
                                </tr>
                            </thead>

                            <tbody>
                                {initialTreatDetailList.map(function (info, i) {
                                    return (
                                        <tr  key={info.id} style={{border: '1px solid #959494', height: '45px'}}>
                                            <InfoTableData>{info.category}</InfoTableData>
                                            <InfoTableData>{info.date}</InfoTableData>
                                            <InfoTableData>{info.treatCode}</InfoTableData>
                                            <InfoTableData>{info.description}</InfoTableData>
                                            <InfoTableNumberData>{formatNumber(info.price)}</InfoTableNumberData>
                                            <InfoTableNumberData>{formatNumber(info.oop)}</InfoTableNumberData>
                                            <InfoTableNumberData>{formatNumber(info.pcc)}</InfoTableNumberData>
                                            <InfoTableNumberData>{formatNumber(info.foop)}</InfoTableNumberData>
                                            <InfoTableNumberData>{formatNumber(info.nonReimbursement)}</InfoTableNumberData>
                                        </tr>
                                    )
                                })}
                                <tr style={{border: '1px solid #959494', height: '45px'}}>
                                    <InfoTableData colSpan={4}>계</InfoTableData>
                                    <InfoTableNumberData> {formatNumber(total)}</InfoTableNumberData>
                                    <InfoTableNumberData name='totalOop' value={totalOop}>{formatNumber(totalOop)}</InfoTableNumberData>
                                    <InfoTableNumberData name='totalPcc' value={totalPcc}>{formatNumber(totalPcc)}</InfoTableNumberData>
                                    <InfoTableNumberData name='totalFoop' value={totalFoop}>{formatNumber(totalFoop)}</InfoTableNumberData>
                                    <InfoTableNumberData name='nonReimbursement' value={nonReimbursement}>{formatNumber(nonReimbursement)}</InfoTableNumberData>
                                </tr>
                            </tbody>

                        </InfoTable>
                    </TableColumnContainer>
                </MarginRowContainer>
                <AddButtonContainer>
                    <ManageAddButton onClick={onClickBtn}>
                        <ManageAddButtonImage src={SearchButtonImage}/>
                        보험서류청구
                    </ManageAddButton>
                </AddButtonContainer>
            </MarginColumnContainer>

        </Container>

    );
}


export default LoggingDetail;
