import {useEffect, useState} from 'react';
import Web3 from "/node_modules/web3/dist/web3.min";


const UseWeb3 = ()=>{
    const [account, setAccount] = useState(null);
    const [web3, setWeb3] = useState(null);

    useEffect(()=>{

        (async ()=>{
            if (!window.ethereum) return;

            const [address] = await window.ethereum.request({
                method: 'eth_requestAccounts',
            })

            setAccount(address);

            const web3 = new Web3(window.ethereum);
            setWeb3(web3);

        })();
    }, []);
    console.log(account);
    return [web3, account];
};

export default UseWeb3;