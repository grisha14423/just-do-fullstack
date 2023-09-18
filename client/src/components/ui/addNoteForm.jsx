import React, { useState } from "react";
import { useNote } from "../../hooks/useNote";
// import { nanoid } from "nanoid";
import SelectField from "../common/form/selectField";
import TextField from "../common/form/textField";
import { useSelector } from "react-redux";
// import { useImportance } from "../../hooks/useImportance";
import { getImportances } from "../../store/importances";

const AddNoteForm = () => {
  const { addNote } = useNote();
  // const { importances } = useImportance();
  const importances = useSelector(getImportances());

  const [data, setData] = useState({
    title: "",
    content: "",
    importance: "",
  });

  const importanceList = importances.map((p) => ({
    label: p.name,
    value: p._id,
  }));

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = {
      // _id: nanoid(),
      ...data,
    };
    setData({
      title: "",
      content: "",
      importance: "",
    });

    addNote(newData);
  };

  const isValid = () => {
    if (data.title && data.content && data.importance) return true;
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <form onSubmit={handleSubmit}>
            <TextField
              label="Заголовок"
              name="title"
              value={data.title}
              onChange={handleChange}
            />
            <TextField
              label="Заметка"
              name="content"
              value={data.content}
              onChange={handleChange}
            />
            <SelectField
              label="Выбери важность"
              defaultOption="Выберите..."
              name="importance"
              options={importanceList}
              onChange={handleChange}
              value={data.importance}
            />
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary w-50 mx-auto"
                disabled={isValid}
              >
                Добавить
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNoteForm;
