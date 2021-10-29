import React, { useEffect, useState } from "react";
import { CgArrowsExpandRight, CgAdd } from "react-icons/cg";
import {
  ComposedChart,
  Area,
  Bar,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  toFormattedString,
  testData,
  HostName,
  ApiKey,
  PeriodOptions,
} from "../../util";
import "./Chart.scss";

const Chart = () => {
  const defaultPeriod = "1w";
  const [activePeriod, setactivePeriod] = useState(defaultPeriod);
  const [data, setData] = useState(testData);
  let posData = null;

  const fetchData = (periodOption) => {
    fetch(
      `${HostName}history?period_id=${periodOption.period_id}&time_start=${periodOption.time_start}`,
      {
        headers: {
          "X-CoinAPI-Key": ApiKey,
        },
      }
    )
      .then((res) => res.json())
      .then(
        (data) => {
          periodOption.data = data;
          setData(data);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  useEffect(() => {
    fetchData(
      PeriodOptions.find((periodOption) => periodOption.value === defaultPeriod)
    );
  }, []);

  const handlePeriodChange = (periodOption) => {
    setactivePeriod(periodOption.value);

    if (periodOption.data) {
      setData(periodOption.data);
    } else {
      fetchData(periodOption);
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length && posData) {
      let y = posData[label].y - 20;
      return (
        <div
          className="custom-tooltip"
          style={{ transform: `translate(0, ${y}px)` }}
        >
          {toFormattedString(payload[1].value)}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="chart-container">
      <div className="btn-container">
        <div className="operation-container">
          <button>
            <CgArrowsExpandRight /> Fullscreen
          </button>
          <button>
            <CgAdd /> Compare
          </button>
        </div>
        <div className="period-container">
          {PeriodOptions.map((periodOption) => (
            <button
              key={periodOption.value}
              className={activePeriod === periodOption.value ? "active" : ""}
              onClick={() => handlePeriodChange(periodOption)}
            >
              {periodOption.value}
            </button>
          ))}
        </div>
      </div>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E8E7FF" />
                <stop offset="100%" stopColor="#FFFFFF" />
              </linearGradient>
            </defs>
            <YAxis
              type="number"
              hide={true}
              yAxisId={2}
              domain={["0", (dataMax) => dataMax * 3]}
            />
            <YAxis
              type="number"
              hide={true}
              domain={["auto", "auto"]}
              yAxisId={1}
            />
            <CartesianGrid
              horizontal={false}
              verticalPoints={Array.from(
                { length: 5 },
                (_, i) => (738 * (i + 1)) / 6
              )}
            />
            <Tooltip content={<CustomTooltip />} position={{ x: 700 }} />
            <Bar
              dataKey="volume_traded"
              fill="#E6E8EB"
              isAnimationActive={false}
              yAxisId={2}
            />
            <Area
              type="linear"
              dataKey="price_close"
              stroke="#4B40EE"
              strokeWidth={2}
              fill="url(#colorUv)"
              isAnimationActive={false}
              yAxisId={1}
              onMouseEnter={(data) => {
                if (!posData) {
                  posData = [...data.points];
                }
              }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
