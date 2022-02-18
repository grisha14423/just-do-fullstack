import React from "react";
import { useImportance } from "../../hooks/useImportance";
import Importance from "./importance";

const ImportanceList = ({ importance }) => {
  const { isLoading } = useImportance();

  const { getImportance } = useImportance();
  const importanceList = getImportance(importance);
  // console.log(importance);

  if (isLoading) return "Loadind ...";
  return (
    <>
      {importanceList.map((imp) => (
        <Importance key={imp._id} {...imp} />
      ))}
    </>
  );
};

export default ImportanceList;
