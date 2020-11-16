
// <NotesGrid type = "HIGH PRIORITY NOTES" notes = "highPriorityNotes" />

// highPriorityNotes

const obj = {
    a: 1,
    b: "a"
}

console.log(obj[obj.b])



// <div>
//     <h5 style={{ marginLeft: "40px", marginBottom: "30px" }}>{props.type}</h5>

//     <Masonry
//         breakpointCols={3}
//         className="my-masonry-grid"
//         columnClassName="my-masonry-grid_column">



//         {
//             user[props.notes].map((note, index) => <div>
//                 {

//                     (isEditHighLoading && currentlyEditing == index) ? <CircularProgress /> :
//                         <div>
//                             {
//                                 (currentlyEditing == index && currentPriority == "High") ?



//                                     <div>

//                                         <EditField note={note} sendEditReq={sendEditReq} />

//                                     </div>

//                                     :
//                                     <div style={{ margin: "10px" }}>
//                                         {
//                                             (!(note.photoInfo == "")) ?
//                                                 <div>
//                                                     <div style={{ marginLeft: "80px" }}>
//                                                         <Image publicId={note.photoInfo} width="100" height="100" cloudName="prakhar-parashar" />

//                                                     </div>
//                                                     <hr width="75%"></hr>
//                                                 </div>
//                                                 :
//                                                 null}

//                                         {note.noteText}
//                                         <div style={{ display: "grid", gridTemplateColumns: "auto auto auto", gridGap: "20px" }}>
//                                             <Tooltip title="edit">
//                                                 <IconButton onClick={() => { editNote(index, note.notePriority) }}><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
//                                                     <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
//                                                     <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
//                                                 </svg></IconButton>
//                                             </Tooltip>

//                                             <Tooltip title="Delete">
//                                                 <IconButton aria-label="delete" onClick={() => { deleteNote(index, note.notePriority, note.userGoogleId) }}>
//                                                     <DeleteIcon />
//                                                 </IconButton>
//                                             </Tooltip>

//                                             <ChangePriority currentPriority={note.notePriority} index={index} userGoogleId={note.userGoogleId} changePriorityRequest={changePriorityRequest} />
//                                         </div>
//                                     </div>
//                             }
//                         </div>}
//             </div>)
//         }

//     </Masonry>
// </div>