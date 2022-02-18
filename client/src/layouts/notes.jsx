import React from "react";
import { useParams } from "react-router";
import NotePage from "../components/page/notePage";
import NotesListPage from "../components/page/notesListPage";
import EditNotePage from "../components/page/editNotePage";
import { NoteProvider } from "../hooks/useNote";

const Notes = () => {
  const params = useParams();
  const { noteId, edit } = params;
  return (
    <>
      <NoteProvider>
        {noteId ? (
          edit ? (
            <EditNotePage />
          ) : (
            <NotePage noteId={noteId} />
          )
        ) : (
          <NotesListPage />
        )}
      </NoteProvider>
    </>
  );
};

export default Notes;
