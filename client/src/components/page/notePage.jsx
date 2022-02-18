import React from "react";
import { useHistory } from "react-router-dom";
import { useNote } from "../../hooks/useNote";
import ImportanceList from "../ui/importanceList";
import "../../styles/noteList.css";

const NotePage = ({ noteId }) => {
  const { getNoteById } = useNote();
  const history = useHistory();
  const note = getNoteById(noteId);
  const { deleteNote } = useNote();

  const handleClick = () => {
    history.push(history.location.pathname + "/edit");
  };

  const handleDelete = (noteId) => {
    deleteNote(noteId);
    history.push("/notes");
  };
  const handleBack = () => {
    history.push("/notes");
  };

  if (note) {
    return (
      <div className="col-md-6 offset-md-3 shadow p-4">
        <div className="card mb-3">
          <div className="card-body">
            <svg
              className="position-absolute top-0 end-0 btn btn-primary btn-sm"
              onClick={handleClick}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-gear-wide"
              viewBox="0 0 16 16"
            >
              <path d="M8.932.727c-.243-.97-1.62-.97-1.864 0l-.071.286a.96.96 0 0 1-1.622.434l-.205-.211c-.695-.719-1.888-.03-1.613.931l.08.284a.96.96 0 0 1-1.186 1.187l-.284-.081c-.96-.275-1.65.918-.931 1.613l.211.205a.96.96 0 0 1-.434 1.622l-.286.071c-.97.243-.97 1.62 0 1.864l.286.071a.96.96 0 0 1 .434 1.622l-.211.205c-.719.695-.03 1.888.931 1.613l.284-.08a.96.96 0 0 1 1.187 1.187l-.081.283c-.275.96.918 1.65 1.613.931l.205-.211a.96.96 0 0 1 1.622.434l.071.286c.243.97 1.62.97 1.864 0l.071-.286a.96.96 0 0 1 1.622-.434l.205.211c.695.719 1.888.03 1.613-.931l-.08-.284a.96.96 0 0 1 1.187-1.187l.283.081c.96.275 1.65-.918.931-1.613l-.211-.205a.96.96 0 0 1 .434-1.622l.286-.071c.97-.243.97-1.62 0-1.864l-.286-.071a.96.96 0 0 1-.434-1.622l.211-.205c.719-.695.03-1.888-.931-1.613l-.284.08a.96.96 0 0 1-1.187-1.186l.081-.284c.275-.96-.918-1.65-1.613-.931l-.205.211a.96.96 0 0 1-1.622-.434L8.932.727zM8 12.997a4.998 4.998 0 1 1 0-9.995 4.998 4.998 0 0 1 0 9.996z" />
            </svg>
            <button
              type="button"
              className="btn btn-danger position-absolute top-10 end-0 me-2"
              onClick={() => handleDelete(noteId)}
            >
              Удалить
            </button>

            <div className="d-flex flex-column align-items-center text-center position-relative">
              <div className="mt-3">
                <h4 className="title">{note.title}</h4>
                <p className="text-secondary mb-1">{note.content}</p>
                <div className="text-muted">
                  <ImportanceList importance={note.importance} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-grid gap-2 col-6 mx-auto">
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleBack}
          >
            Назад
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-info " role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
};

export default NotePage;
