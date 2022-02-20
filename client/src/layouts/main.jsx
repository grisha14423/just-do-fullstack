import React from "react";
// import useMockData from "../utils/mockData";

const Main = () => {
  // const { error, initialize, progress, status } = useMockData();
  // const handleClick = () => {
  //   initialize();
  // };
  return (
    <div className="container mt-5">
      {/* <h3>Инициализация данных в FireBase</h3>
      <ul>
        <li>Status: {status}</li>
        <li>Progress: {progress}%</li>
        {error && <li>error: {error}</li>}
      </ul>
      <button className="btn btn-primary" onClick={handleClick}>
        {" "}
        Инициализировать
      </button> */}

      <div className="card">
        <div className="card-body">
          <h3>Добро пожаловать в приложение Just Do!</h3>
          <p>
            Это Full Stack приложение для заметок, в котором можно создавать,
            редактировать, удалять заметки, осуществить поиск по уже созданным.
            <br />
            Есть возможность включить темный цветовой режим.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
