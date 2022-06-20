import React, { useState } from "react";
function NavBar({ nowPage, page, pageNum, setNowPage }) {
  const renderNavBar = [];
  let startPage = parseInt(nowPage);
  if (startPage <= 4) {
    startPage = 5;
  }
  let endPage = startPage + 6;
  if (endPage > pageNum) {
    endPage = pageNum;
  }
  for (let i = startPage - 4; i <= endPage; i++) {
    renderNavBar.push(
      nowPage === i ? (
        <li
          className="page-item h-100 active"
          key={i}
          onClick={(e) => {
            setNowPage(i);
          }}>
          <a className={"page-link h-100"}>{i}</a>
        </li>
      ) : (
        <li
          className="page-item h-100"
          key={i}
          onClick={(e) => {
            setNowPage(i);
          }}>
          <a className={"page-link h-100"}>{i}</a>
        </li>
      )
    );
  }

  return (
    <nav
      className="row
        justify-content-around "
      aria-label="Page navigation">
      <ul className="pagination pagination-sm">
        <li
          style={{ cursor: "pointer" }}
          className="page-item disabled"
          onClick={() => setNowPage(nowPage <= 1 ? nowPage : nowPage - 1)}>
          <a className="page-link" tabIndex="-1" aria-disabled="true">
            Previous
          </a>
        </li>
        {renderNavBar}
        <li
          className="page-item"
          onClick={() =>
            setNowPage(nowPage === pageNum ? nowPage : nowPage + 1)
          }>
          <a className="page-link">Next</a>
        </li>
      </ul>
    </nav>
  );
}
export default NavBar;
