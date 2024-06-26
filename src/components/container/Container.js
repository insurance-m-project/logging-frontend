import styled from "styled-components"

// 배경 화면
export const Container = styled.div`
  max-height: 100vh;
  width: 100%;
  padding: 40px;
  display: flex;
  flex-direction: column;

`

// 내부 화면
export const BasicContainer = styled.div`
  border-radius: 12px;
  background: #FFF;
  box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.25);
  height: 100%;
  width: 100%;
  position: relative;
  overflow-y: scroll;
`

export const WhiteContainer = styled.div`
  border-radius: 12px;
  background: #FFF;
  box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.25);
  overflow-y: scroll;
  height: 650px;
  width: 95%;
  position: relative;
`

// 페이지 제목
export const SystemTitleLogo = styled.img`
  color: #4C4C4C;
  width: 300px;
  height: 90px;
  margin-left: 10px;
`

// 링크 태그 감싸는 div
export const SystemLink = styled.div`
  margin-left: 10px;
  text-align: left;
`

// 병원 명
export const HospitalText = styled.text`
  color: #4C4C4C;
  font-size: 30px;
  font-weight: bold;
  line-height: 30px;
  text-align: left;
  margin-bottom: 20px;
  margin-right: 10px;
`