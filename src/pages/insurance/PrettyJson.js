import React from 'react';
import styled from 'styled-components';

// JSON 데이터를 보여주는 스타일드 컴포넌트
const StyledJsonDisplay = styled.pre`
    white-space: pre-wrap;
    word-wrap: break-word;
    padding: 10px;
`;

// JSON 데이터를 받아 예쁘게 표현하는 컴포넌트
const PrettyJson = ({ data }) => {
    // JSON.stringify 함수를 사용하여 들여쓰기와 함께 JSON 데이터를 문자열로 변환
    const formattedJson = JSON.stringify(data, null, 2).replace(/\\n/g, '\n').replace(/\\+/g, '');;
    return (
        <StyledJsonDisplay>{formattedJson}</StyledJsonDisplay> // 들여쓰기된 JSON 데이터를 보여줍니다.
    );
};

export default PrettyJson;
