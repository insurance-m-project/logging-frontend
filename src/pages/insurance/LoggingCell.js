import React from 'react';
import styled from "styled-components";

export const LineTr = styled.tr`
  color: #4c4c4c;
  text-align: center;
  height: 60px;
  max-height: 60px;
  border-bottom: #E1E0E2 solid 1px;
`

function LoggingCell(props) {
    return (
        <LineTr>
            <td width="60%">{props.transactionHash}</td>
            <td width="40%">{props.date}</td>
        </LineTr>
    )
}

export default LoggingCell;