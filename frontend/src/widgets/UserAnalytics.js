import React from "react";
import { useId, useState } from "react";
import AccountPositions from "../features/AccountPositions";
import AccountOrders from "../features/AccountOrders";

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
    <div>
      <h1>Актуальная информация по текущему адресу</h1>

      <div>
        <label htmlFor={id}>Wallet address:</label>
        <input
          id={id}
          value={input}
          onInput={(e) => setInput(e.target.value)}
        />
        <button onClick={updateAccount}>Enter</button>
      </div>
      <AccountPositions account={account} datastore={datastore} />
      <AccountOrders account={account} datastore={datastore} />
    </div>
  );
};

export default UserAnalytics;
