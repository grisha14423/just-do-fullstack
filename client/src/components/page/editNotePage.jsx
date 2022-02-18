import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
// import { useImportance } from "../../hooks/useImportance";
import { useNote } from "../../hooks/useNote";
import { getImportances } from "../../store/importances";
import SelectField from "../common/form/selectField";
import TextField from "../common/form/textField";

const EditNotePage = () => {
  const history = useHistory();
  const id = useParams().noteId;
  const { getNoteById } = useNote();
  const note = getNoteById(id);
  const { deleteNote } = useNote();
  const { updateNote } = useNote();
  // const { importances } = useImportance();
  const importances = useSelector(getImportances());

  const importanceList = importances.map((p) => ({
    label: p.name,
    value: p._id,
  }));

  const [data, setData] = useState({
    _id: note._id,
    title: note.title,
    content: note.content,
    importance: note.importance,
    userId: note.userId,
  });

  const handleDelete = (id) => {
    deleteNote(id);
    history.push("/notes");
  };

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = {
      ...data,
    };
    updateNote(newData);
    // console.log(newData);
    history.push(`/notes/${id}`);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <button
            className="btn btn-primary w-30 mx-auto m-2"
            onClick={() => history.push(`/notes/${id}`)}
          >
            Назад
          </button>
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
            <button type="submit" className="btn btn-primary w-50 mx-auto">
              Обновить
            </button>
            <button
              className="btn btn-danger w-50 mx-auto "
              onClick={() => handleDelete(id)}
            >
              Удалить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditNotePage;
