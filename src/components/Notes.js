import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/Notes/NotesContext";
import NoteItem from "../components/NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
const Note = (props) => {
  const [note, setNote] = useState({
    id:"",
    etitle: "",
    edescription: "",
    etag: "default",
  });
  const navigate = useNavigate();
  const context = useContext(NoteContext);
  const { notes, getAllNotes,editNote } = context;
  const handleClick=(e)=>{
    editNote(note.id,note.etitle,note.edescription,note.etag);
    refClose.current.click();
    console.log("updating The Note...")
    props.showAlert(
      "Note Updated successfully","success"
    );
    // e.preventDefault();
}
const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
}
  useEffect(() => {
    if(localStorage.getItem('token')){
      getAllNotes();
    }
    else{
      navigate("/login");
    }
    //eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refClose= useRef(null);
  const updateNote = (currentnote) => {
    ref.current.click();
    setNote({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag});
  };
  return (
    <>
      <AddNote showAlert={props.showAlert}/>

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                EditNote
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    value={note.etitle}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="desc" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                    value={note.edescription}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={onChange}
                    value={note.etag}
                    minLength={5}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick}>
                UpdateNote
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2 className="my-3">Your Notes</h2>
        <div className="container mx-1">
        {notes.length===0 && 'No Notes to display'}
        </div>
        {notes.map((note) => {
          return (
            <NoteItem note={note} key={note._id} showAlert={props.showAlert} updateNote={updateNote} />
          );
        })}
      </div>
    </>
  );
};

export default Note;
