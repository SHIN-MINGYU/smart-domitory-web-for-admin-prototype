import axios from "axios";
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function BusInfoTable({ data, setUpdate, update }) {
  const [show, setShow] = useState(false);
  const [type, setType] = useState();
  const [value, setValue] = useState();
  const [bus_date, setBus_date] = useState();
  const [bus_id, setBus_id] = useState();
  const [newValue, setNewValue] = useState("");
  const [bus_stop, setBus_stop] = useState("");
  const [bus_times, setBus_times] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onSubmit = () => {
    if (value) {
      axios
        .patch(process.env.REACT_APP_API_URL + "/admin/businfo", {
          bus_date,
          type,
          bus_time: newValue,
          bus_id,
        })
        .then((res) => {
          setUpdate(update + 1);
          setNewValue("");
        });
    } else {
      axios
        .post(process.env.REACT_APP_API_URL + "/admin/businfo/create", {
          bus_date,
          bus_time: newValue,
          type,
          bus_stop,
          bus_times,
        })
        .then((res) => setUpdate(update + 1));
    }
    handleClose();
  };

  if (data) {
    let renderItem = [];
    const busInfo = [
      "복현캠퍼스",
      "우방(원어민)",
      "시티병원",
      "유성 APT",
      "SK빌딩",
      "동천 119 안전센터",
      "칠곡 운암역",
      "북구문화예술센터",
      "기업은행 칠곡점",
      "태전역",
      "글로벌캠퍼스",
      "글로벌생활관",
      "영어마을",
      "문양역",
    ];
    for (let i = 0; i < data[data.length - 1].bus_times; i++) {
      const newArr = data.filter((el) => el.bus_times === i + 1);
      const row = busInfo.map((el, index) => {
        return (
          <td
            key={index}
            onClick={() => {
              const current = getTime(newArr, el).current;
              const index = getTime(newArr, el).index
                ? getTime(newArr, el).index
                : 0;
              setBus_id(newArr[index].bus_id);
              setBus_date(newArr[index].bus_date);
              setType(newArr[index].type);
              setBus_stop(el);
              setValue(current);
              setBus_times(newArr[0].bus_times);
              handleShow();
            }}
            className="text-info text-center">
            {getTime(newArr, el).current}
            <input id={el + "i"} style={{ display: "none" }}></input>
          </td>
        );
      });
      renderItem = renderItem.concat([<tr key={i}>{row}</tr>]);
    }
    return (
      <>
        {renderItem}
        <Modal centered={true} show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>
              <p>
                <span>
                  {type
                    ? "복현캠퍼스 ➜ 글로벌캠퍼스"
                    : "글로벌캠퍼스 ➜ 복현캠퍼스"}
                </span>
                <span className="ml-4">{bus_date ? "주말" : "평일"}</span>
              </p>
              <span>{bus_stop}</span> <Button variant="danger">삭제</Button>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>기존값 : {value}</div>
            <div>
              변경하고싶은 값 :{" "}
              <input
                type="time"
                min={7}
                max={20}
                value={newValue}
                onChange={(e) => {
                  setNewValue(e.target.value);
                }}></input>
            </div>
          </Modal.Body>
          <Modal.Footer className="">
            <Button variant="secondary" onClick={handleClose}>
              닫기
            </Button>
            <Button variant="primary" onClick={onSubmit}>
              수정/생성
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  } else {
    return <></>;
  }
}
function getTime(arr, str) {
  let current;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].bus_stop === str) {
      current = arr[i].bus_time;
      return { current, index: i };
    }
  }
  return { current: undefined, index: undefined };
}
export default BusInfoTable;
