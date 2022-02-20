import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";
import { useNote } from "../../hooks/useNote";
import AddNoteForm from "../ui/addNoteForm";
import ImportanceList from "../ui/importanceList";
import "../../styles/noteList.css";
import TextField from "../common/form/textField";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../../store/users";

const NotesListPage = () => {
  const { notes, deleteNote, isLoading } = useNote();
  // const { currentUser } = useAuth();
  const currentUser = useSelector(getCurrentUserData());
  const [searchQuery, setSearchQuery] = useState("");

  function filterNotes(data) {
    const filteredNotes = searchQuery
      ? data.filter(
          (note) =>
            note.content.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
        )
      : data;
    return filteredNotes;
  }
  const filteredNotes = filterNotes(notes);

  const handleSearchQuery = (target) => {
    setSearchQuery(target.value);
  };

  const handleDelete = (event) => {
    event.preventDefault();
    deleteNote(event.target.id);
  };

  if (!isLoading && notes.length === 0) {
    return <AddNoteForm />;
  }
  let flag = false;
  if (notes) {
    return (
      <>
        <AddNoteForm />
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6 offset-md-3 shadow p-4">
              <TextField
                label="Найти заметку"
                type="text"
                name="searchQuery"
                placeholder="Search"
                onChange={handleSearchQuery}
                value={searchQuery}
              />
            </div>
          </div>
        </div>
        <div className="list-group d-flex w-50 mx-auto">
          {filteredNotes.map((note) => {
            if (note.userId === currentUser._id) {
              flag = true;
              return (
                <Link
                  key={note._id}
                  to={`/notes/${note._id}`}
                  className="list-group-item list-group-item-action m-2"
                  data-toggle="list"
                  aria-current="true"
                >
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1 title">{note.title}</h5>
                    <button
                      id={note._id}
                      onClick={handleDelete}
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                    ></button>
                  </div>
                  <p className="mb-1 content">{note.content}</p>
                  <small>
                    <ImportanceList importance={note.importance} />
                  </small>
                </Link>
              );
            }
          })}
          {!flag && (
            <div className="d-flex justify-content-center mt-5">
              <h2>Заметок пока нет</h2>
            </div>
          )}
        </div>
      </>
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

export default NotesListPage;
