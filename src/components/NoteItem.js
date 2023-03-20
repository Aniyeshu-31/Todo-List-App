import React, { useContext } from "react";
import NoteContext from "../context/Notes/NotesContext";
const NoteItem = (props) => {
  const context = useContext(NoteContext);
  const {deleteNote}=context;
  const { note ,updateNote } = props;
  return (
    <div className="col-md-4 mt-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i className="fa-solid fa-trash mx-2" onClick={()=>{
            deleteNote(note._id);props.showAlert("Deleted successfully","success");
          }}></i>
          <i className="fa-regular fa-pen-to-square" onClick={()=>{updateNote(note)}}></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
