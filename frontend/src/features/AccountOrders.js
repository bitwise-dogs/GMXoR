import React, { useEffect, useState } from "react";
import contract from "../shared/contracts/readerContract";
import { ethers } from "ethers";
import Order from "../shared/AccountUnits/Order";
import getOrderType from "../shared/scripts/getOrderType";
import {
  formatRawPrice,
  formatPrice,
  formatTriggerPrice,
} from "../shared/scripts/StringFormatting";

function AccountOrders(props) {
  const [ordersDataRaw, setOrdersDataRaw] = useState(null);
  const [orders, setOrders] = useState([[]]);
  var ordersDataFormatted = [];
  var datastore = props.datastore;
  var account = props.account;

  const resultOrders = orders.map((element, index) => {
    return <Order key={index} element={element} index={index} />;
  });

  const fetchAccountOrders = async () => {
    try {
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
    fetchAccountOrders();
  }, [account]);

  useEffect(() => {
    (async () => {
      if (ordersDataRaw) {
        console.log(ordersDataRaw);
        for (let i = 0; i < ordersDataRaw.length; i++) {
          ordersDataFormatted.push([]);

          const sizeUsd = ordersDataRaw[i][1][2].toString();
          ordersDataFormatted[i].push(formatRawPrice(sizeUsd)); //размер в usd

          ordersDataFormatted[i].push(
            getOrderType(ordersDataRaw[i][1][0].toString())
          ); //тип ордера

          const triggerPrice = ordersDataRaw[i][1][4].toString().slice(0,-12);
          const isTrigger = true;
          ordersDataFormatted[i].push(triggerPrice); //размер тригера
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
      <h2>Active orders</h2>
      {ordersDataRaw ? (
        <table className="table">
          <thead>
            <tr>
              <th>Size</th>
              <th>Order type</th>
              <th>Trigger price</th>
            </tr>
          </thead>
          <tbody>{resultOrders}</tbody>
        </table>
      ) : (
        <p>Загрузка...</p>
      )}
    </div>
  );
}

export default AccountOrders;
