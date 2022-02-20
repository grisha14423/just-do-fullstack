import React from "react";
import { useSelector } from "react-redux";
import { useImportance } from "../../hooks/useImportance";
import { getImprtanceById } from "../../store/importances";
import Importance from "./importance";

const ImportanceList = ({ importance }) => {
  const { isLoading } = useImportance();
  const importanceList = useSelector(getImprtanceById(importance));

  // const { getImportance } = useImportance();
  // const importanceList = getImportance(importance);
  // console.log(importanceList);

  if (isLoading) return "Loading  imp...";
  return (
    <Importance {...importanceList} />

    // <>
    //   {importanceList.map((imp) => (
    //     <Importance key={imp} {...imp} />
    //   ))}
    // </>
  );
};

export default ImportanceList;
