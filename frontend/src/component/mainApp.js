import React, { useState, useEffect } from "react";
import { MainForm } from "./mainForm";
import { Table } from "./table";
import { getEvents } from "../ApiService";
import { getKeyByValue } from "../helper";
import { eventTypeOptions } from "../helper";

export const MainApp = () => {
  const [data, setData] = useState([]);
  const [information, setInformation] = useState({
    careRecipientId: "df50cac5-293c-490d-a06c-ee26796f850d",
    eventType: "",
  });
  const [tableHeader, setTableHeader] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const eventTypeEnum = getKeyByValue(eventTypeOptions, information.eventType);

  useEffect(() => {
    getEvents(information.careRecipientId, eventTypeEnum, currentPage)
      .then((res) => {
        setData(res);
      })
      .catch((error) => console.error("Unable to get data:", error));
  }, [currentPage, information]);

  return (
    <div>
      <MainForm
        setData={setData}
        setTableHeader={setTableHeader}
        currentPage={currentPage}
        information={information}
        setInformation={setInformation}
      />
      {tableHeader && (
        <>
          <h3>{tableHeader}</h3>
          <Table
            information={information}
            data={data}
            setData={setData}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            eventTypeEnum={eventTypeEnum}
          />
        </>
      )}
    </div>
  );
};
