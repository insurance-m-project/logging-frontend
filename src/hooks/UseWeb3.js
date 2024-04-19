import {useEffect, useState} from 'react';
import Web3 from "web3/dist/web3.min.js";


const UseWeb3 = ()=>{
    const [account, setAccount] = useState(null);
    const [web3, setWeb3] = useState(null);
    const [loggingWeb3, setLoggingWeb3] = useState(null);
    const loggingUrl = process.env.REACT_APP_ETHEREUM_NODE_URL;
    useEffect(()=>{

        (async ()=>{
            if (!window.ethereum) return;

            const [address] = await window.ethereum.request({
                method: 'eth_requestAccounts',
            })

            setAccount(address);

            const web3 = new Web3(window.ethereum);
            // const loggingWeb3 = new Web3(new Web3.providers.HttpProvider('http://34.64.230.165:9500'));
            const loggingWeb3 = new Web3(new Web3.providers.HttpProvider(loggingUrl));
            console.log(process.env.REACT_APP_ETHEREUM_NODE_URL);
            setWeb3(web3);
            setLoggingWeb3(loggingWeb3);

        })();
    }, []);
    console.log(account);
    return [web3, loggingWeb3, account];
};

export default UseWeb3;