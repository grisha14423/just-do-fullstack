import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import noteService from "../services/note.service";
// import { useAuth } from "./useAuth";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../store/users";

const NoteContext = React.createContext();

export const useNote = () => {
  return useContext(NoteContext);
};

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // const { currentUser } = useAuth();
  const currentUser = useSelector(getCurrentUserData());

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, []);

  useEffect(() => {
    const getNotes = async () => {
      try {
        const { content } = await noteService.get();
        // console.log(content);
        setNotes(content);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getNotes();
  }, []);

  const getNoteById = (id) => {
    return notes.find((note) => note._id === id);
  };

  async function deleteNote(id) {
    try {
      const { content } = await noteService.removeNote(id);
      if (!content) {
        setNotes((prevState) => prevState.filter((c) => c._id !== id));
      }
    } catch (error) {
      errorCatcher(error);
    }
    // setNotes((prevState) => {
    //   return prevState.filter((note) => note._id !== id);
    // });
  }

  async function addNote(data) {
    const note = {
      ...data,
      // _id: nanoid(),
      userId: currentUser._id,
    };
    console.log(note);
    try {
      const { content } = await noteService.createNote(note);
      setNotes((prevState) => [...prevState, content]);
    } catch (error) {
      errorCatcher(error);
    }
  }

  async function updateNote(data) {
    try {
      const { content } = await noteService.updateNote(data);
      const newNotes = [...notes];
      const noteIndex = newNotes.findIndex((note) => note._id === content._id);
      newNotes[noteIndex] = content;
      setNotes(newNotes);
    } catch (error) {
      errorCatcher(error);
    }
  }

  function errorCatcher(error) {
    const { message } = error;
    setError(message);
    setIsLoading(false);
  }

  return (
    <NoteContext.Provider
      value={{ notes, getNoteById, deleteNote, addNote, updateNote, isLoading }}
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
    </NoteContext.Provider>
  );
};
