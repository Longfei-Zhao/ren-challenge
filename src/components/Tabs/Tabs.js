import React, { useState } from "react";
import Summary from "../Summary/Summary";
import Chart from "../Chart/Chart";
import Statistics from "../Statistics/Statistics";
import Analysis from "../Analysis/Analysis";
import Settings from "../Settings/Settings";
import "./Tabs.scss";

const Tabs = () => {
  const TabName = ["Summary", "Chart", "Statistics", "Analysis", "Settings"];
  const [activeTab, setActiveTab] = useState("Chart");

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <>
      <ul className="nav">
        {TabName.map((tabName) => (
          <li
            key={tabName}
            className={activeTab === tabName ? "active" : ""}
            onClick={() => handleTabChange(tabName)}
          >
            {tabName}
          </li>
        ))}
      </ul>
      <div className="tab-content">
        {(() => {
          switch (activeTab) {
            case "Summary":
              return <Summary />;
            case "Chart":
              return <Chart />;
            case "Statistics":
              return <Statistics />;
            case "Analysis":
              return <Analysis />;
            case "Settings":
              return <Settings />;
            default:
              return null;
          }
        })()}
      </div>
    </>
  );
};

export default Tabs;
