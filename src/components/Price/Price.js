import React, { useEffect, useState } from "react";
import {
  toFormattedString,
  toPercentageString,
  HostName,
  ApiKey,
} from "../../util";
import "./Price.scss";

const Price = () => {
  const [state, setstate] = useState({ curPrice: 63179.71, diff: 2161.42 });

  useEffect(() => {
    fetch(`${HostName}latest?period_id=1DAY&limit=2`, {
      headers: {
        "X-CoinAPI-Key": ApiKey,
      },
    })
      .then((res) => res.json())
      .then(
        (data) => {
          setstate({
            curPrice: data[0].price_close,
            diff: data[0].price_close - data[1].price_close,
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  return (
    <div className="price-container">
      <div className="cur-price"> {toFormattedString(state.curPrice)}</div>
      <div className={`diff ${state.diff >= 0 ? "positive" : "negative"}`}>
        {toFormattedString(state.diff, true)} (
        {toPercentageString(state.diff, state.curPrice)})
      </div>
    </div>
  );
};

export default Price;
