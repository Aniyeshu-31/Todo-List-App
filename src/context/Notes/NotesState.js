import React, { useState} from 'react'
import NoteContext from './NotesContext'

const NoteState = (props)=>{
  const host = "http://localhost:5000"
  const notesInitial=[];
  const[notes,setnotes]=useState(notesInitial);
    // GET ALL NOTES
  const getAllNotes= async ()=>{
    // TODO API CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
     method: 'GET', // *GET, POST, PUT, DELETE, etc.
     headers: {
       'Content-Type': 'application/json',
       'auth-token':localStorage.getItem('token')
     
     },
   })
   const json = await response.json();
    console.log(json);
    setnotes(json);
}

// ADD NOTE
 const addNote= async (title,description,tag)=>{
     // TODO API CALL
     const response = await fetch(`${host}/api/notes/addNote`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      
      },
      body: JSON.stringify({title,description,tag})
    })
     const note = await response.json();
     setnotes(notes.concat(note));
 }
// DELETE NOTE
 const deleteNote=async (id)=>{
  //API CALL
  const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      'auth-token':localStorage.getItem('token')
    
    },
  });
  const json=response.json();
  console.log(json);
  const newNotes = notes.filter((note)=>{
    return note._id!==id; 
  })
  setnotes(newNotes);
 }
// EDIT NOTE
const editNote=async (id,title,description,tag)=>{
  //API call
  const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      'auth-token':localStorage.getItem('token')
    
    },
    body: JSON.stringify({title,description,tag})
  })
  const json= await response.json();
  console.log(json);
  let newNotes =  JSON.parse(JSON.stringify(notes));
  for(let index=0;index<newNotes.length;index++){
    const element = newNotes[index];
    if(element._id===id){
      newNotes[index].title=title;
      newNotes[index].description=description;
      newNotes[index].tag=tag;
      break;
    }
  }
  setnotes(newNotes);
}

return(
  <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getAllNotes}}>
      {props.children}
  </NoteContext.Provider>
)
}
export default NoteState;

// Context API syntax