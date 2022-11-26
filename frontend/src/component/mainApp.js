import React, { useState, useEffect } from "react";
import { MainForm } from "./mainForm";
import { Table } from "./table";
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

  return (
    <div>
      <MainForm
        setData={setData}
        setTableHeader={setTableHeader}
        information={information}
        setInformation={setInformation}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {tableHeader && (
        <>
          <h3>{tableHeader}</h3>
          <Table
            information={information}
            data={data}
            setData={setData}
            eventTypeEnum={eventTypeEnum}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};
