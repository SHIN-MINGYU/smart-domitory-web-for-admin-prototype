import React from "react";
import moment from "moment";

function DatePerPeople({ data }) {
  const now = new Date();
  now.setDate(now.getDate() - 1);
  const renderItem = data.map((el, index) => {
    now.setDate(now.getDate() + 1);
    return (
      <div className="flex-row d-flex justify-content-around" key={index}>
        <p className="d-inline">{moment(now).format("YYYY-MM-DD")}</p>
        <p className="d-inline">{el.count}</p>
      </div>
    );
  });
  return <>{renderItem}</>;
}
export default DatePerPeople;
