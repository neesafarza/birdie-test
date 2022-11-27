import React, { useState } from "react";
import { MainForm } from "./mainForm";
import { Table } from "./table";
import { getKeyByValue } from "../helper";

export const MainApp = () => {
  const [data, setData] = useState([]);
  const [information, setInformation] = useState({
    careRecipientId: "",
    eventType: "",
  });
  const [tableHeader, setTableHeader] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const eventTypeEnum = getKeyByValue(information.eventType);

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
          <h3 data-testid="table-header">{tableHeader}</h3>
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
