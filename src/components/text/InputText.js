import React, { useState } from 'react';
import styled from 'styled-components';

// Label 컴포넌트 스타일 정의
const Label = styled.label`
  font-size: 30px;
  font-weight: bold;
  margin-right: 10px;
  color: #262DE0;
`;

// Text 컴포넌트 스타일 정의
const Text = styled.input`
  height: 50px;
  border: 1px solid #E1E0E2;
  padding: 0 20px;
  margin-bottom: 16px;
  border-radius: 10px;
  box-sizing: border-box;
  font-size: 15px;
`;

const InputText = ({ labelText, initialValue }) => {
    const [text, setText] = useState(initialValue);

    const handleChange = (event) => {
        setText(event.target.value);
    };

    return (
        <div>
            <Label>{labelText}</Label>
            <Text type="text" value={text} onChange={handleChange} />
        </div>
    );
};

export default InputText;
