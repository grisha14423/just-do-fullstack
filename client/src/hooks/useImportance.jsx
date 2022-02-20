import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import importanceService from "../services/importance.service";

const ImportanceContext = React.createContext();

export const useImportance = () => {
  return useContext(ImportanceContext);
};

export const ImportanceProvider = ({ children }) => {
  const [importances, setImportance] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, []);

  useEffect(() => {
    // API.importance.fetchAll().then((data) => setImportance(data));
    const getImprs = async () => {
      try {
        const { content } = await importanceService.get();
        // console.log(content);

        setImportance(content);
        setIsLoading(false);
      } catch (error) {
        // console.log(error);
      }
    };
    getImprs();
  }, []);

  const getImportance = (id) => {
    const imp = [];
    imp.push(importances.find((importance) => importance._id === id));
    return imp;
  };

  return (
    <ImportanceContext.Provider
      value={{ importances, getImportance, isLoading }}
    >
      {!isLoading ? (
        children
      ) : (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border text-info " role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </ImportanceContext.Provider>
  );
};
