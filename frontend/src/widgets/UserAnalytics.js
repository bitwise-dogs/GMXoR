import React from "react";
import { useId, useState } from "react";
import AccountPositions from "../features/AccountPositions";
import AccountOrders from "../features/AccountOrders";
import Button from '@mui/material/Button';

const UserAnalytics = () => {
  const datastore = "0xFD70de6b91282D8017aA4E741e9Ae325CAb992d8";
  /* const [account, setAccount] = useState('0x591b6F096281DD7b645767C96aC34863A4Df9a89'); */
  const [account, setAccount] = useState(
    "0x78083780E6cD929E10bD6fB2a099bA00b3142621"
  );
  const id = useId();
  const [input, setInput] = useState(account);
  function updateAccount() {
    setAccount(input);
  }

  return (
    <div className="block_wrapper">
      <h2>Up-to-date information at the current address</h2>

      <div className="input_wrapper">
        {/* <label htmlFor={id}>Wallet address:</label> */}
        <input className="input"
          placeholder="Wallet Address"
          id={id}
          value={input}
          onInput={(e) => setInput(e.target.value)}
        />
        <Button onClick={updateAccount} variant='outlined' color="e7e7ec">Enter</Button>
      </div>
      <AccountPositions account={account} datastore={datastore} />
      <AccountOrders account={account} datastore={datastore} />
    </div>
  );
};

export default UserAnalytics;
