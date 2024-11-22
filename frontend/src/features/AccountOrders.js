import React, { useEffect, useState } from "react";
import contract from "../shared/contracts/readerContract";
import { ethers } from "ethers";
import Order from "../shared/AccountUnits/Order";

function AccountOrders(props) {
  const [ordersDataRaw, setOrdersDataRaw] = useState(null);
  const [orders, setOrders] = useState([[]]);
  var ordersDataFormatted = [];
  var datastore = props.datastore;
  var account = props.account;

  const resultOrders = orders.map((element, index) => {
    return <Order key={index} element={element} index={index} />;
  });

  const fetchContractData = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const _walletAddress = await signer.getAddress();

      const start = 0;
      const end = 10;

      const ordersData = await contract.getAccountOrders(
        datastore,
        account,
        start,
        end
      );

      setOrdersDataRaw(ordersData);
    } catch (error) {
      console.error("Ошибка вызова контракта:", error);
    }
  };

  useEffect(() => {
    fetchContractData();
  }, [account]);

  useEffect(() => {
    (async () => {
      if (ordersDataRaw) {
        for (let i = 0; i < ordersDataRaw.length; i++) {
          ordersDataFormatted.push([]);

          let balance = ordersDataRaw[i][1][2].toString();
          ordersDataFormatted[i].push(
            balance.slice(0, -30) + "." + balance.slice(-30, -28) + "  $"
          );

          ordersDataFormatted[i].push(ordersDataRaw[i][1][0].toString());
        }
      }
    })();
  }, [ordersDataRaw]);

  useEffect(() => {
    (async () => {
      if (ordersDataFormatted.length > 0) {
        let orders_copy = [];
        ordersDataFormatted.forEach((el) => {
          orders_copy.push(el);
        });
        setOrders(orders_copy);
      }
    })();
  }, [ordersDataFormatted]);

  return (
    <div className="block">
      <h2>Активные ордеры</h2>
      {ordersDataRaw ? <ol>{resultOrders}</ol> : <p>Загрузка...</p>}
    </div>
  );
}

export default AccountOrders;