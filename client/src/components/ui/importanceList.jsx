import React from "react";
import { useImportance } from "../../hooks/useImportance";
import Importance from "./importance";

const ImportanceList = ({ importance }) => {
  const { isLoading } = useImportance();

  const { getImportance } = useImportance();
  const importanceList = getImportance(importance);
  // console.log(importanceList);

  if (isLoading) return "Loadind ...";
  return (
    <>
      {importanceList.map((qual) => (
        <Importance key={qual._id} {...qual} />
      ))}
    </>
  );
};

export default ImportanceList;
