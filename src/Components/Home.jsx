import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete'
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import AddNote from './AddNote'
import { useSelector, useDispatch } from 'react-redux';
import { Image } from 'cloudinary-react'
import './masonry.css'
import TextField from '@material-ui/core/TextField';
import Axios from 'axios'
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import Button from '@material-ui/core/Button';
import { getUpdatedNotesAction } from '../Redux/Actions'
import { useHistory } from 'react-router-dom';
import Masonry from 'react-masonry-css'
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip'
import ChangePriority from './changePriority';
import EditField from './EditField'


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));




export default function Home() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [AddNoteModal, setAddNoteModal] = React.useState(false);
    const [currentlyEditing, setCurrentlyEditing] = React.useState(-1)
    // const [currentlyEditingText, setCurrentlyEditingText] = React.useState("")
    const [currentPriority, setCurrentPriority] = React.useState("")
    const [isEditHighLoading, setEditHighLoading] = React.useState(false)
    const [isEditMediumLoading, setEditMediumLoading] = React.useState(false)
    const [isEditLowLoading, setEditLowLoading] = React.useState(false)
    const dispatch = useDispatch()






    const user = useSelector(state => {
        if (state) {

            return state.user
        }
    })

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    const editNote = (index, priority) => {
        setCurrentPriority(priority)
        setCurrentlyEditing(index)
    }


    const sendEditReq = (priority, userGoogleId, currentlyEditingText) => {

        if (priority == "High") {
            setEditHighLoading(true)
        }
        else if (priority == "Medium") {
            setEditMediumLoading(true)
        }
        else {
            setEditLowLoading(true)
        }


        Axios({
            method: "post",
            url: "https://cryptic-reef-81818.herokuapp.com/editNote",
            data: {
                priority, currentlyEditing, currentlyEditingText, userGoogleId
            }
        }).then(() => {
            console.log("hiii")
            setCurrentlyEditing(-1)

            setCurrentPriority("")
            if (priority == "High") {
                dispatch(getUpdatedNotesAction(user.googleId, null, setEditHighLoading))
            }
            else if (priority == "Medium") {
                dispatch(getUpdatedNotesAction(user.googleId, null, setEditMediumLoading))
            }
            else {
                dispatch(getUpdatedNotesAction(user.googleId, null, setEditLowLoading))

            }
        })
        console.log(currentlyEditing, currentlyEditingText)
    }

    const deleteNote = (index, priority, userGoogleId) => {
        setCurrentlyEditing(index)
        if (priority == "High") {
            setEditHighLoading(true)
        }
        else if (priority == "Medium") {
            setEditMediumLoading(true)
        }
        else {
            setEditLowLoading(true)
        }
        Axios({
            method: "post",
            url: "https://cryptic-reef-81818.herokuapp.com/deleteNote",
            data: {
                priority, index, userGoogleId
            }
        }).then(() => {

            if (priority == "High") {
                dispatch(getUpdatedNotesAction(user.googleId, null, setEditHighLoading))
                setCurrentlyEditing(-1)
            }
            else if (priority == "Medium") {
                dispatch(getUpdatedNotesAction(user.googleId, null, setEditMediumLoading))
                setCurrentlyEditing(-1)
            }
            else {
                dispatch(getUpdatedNotesAction(user.googleId, null, setEditLowLoading))
                setCurrentlyEditing(-1)

            }
        })
    }

    const closeModal = () => {
        setAddNoteModal(false)
    }


    const changePriorityRequest = (newPriority, currentPriority, index, userGoogleId) => {
        setCurrentlyEditing(index)
        if (currentPriority == "High") {
            setEditHighLoading(true)
        }
        else if (currentPriority == "Medium") {
            setEditMediumLoading(true)
        }
        else {
            setEditLowLoading(true)
        }

        Axios({
            method: "post",
            url: "http://localhost:8080/changePriority",
            data: {
                newPriority,
                currentPriority,
                index,
                userGoogleId
            }
        }).then(() => {

            if (currentPriority == "High") {
                dispatch(getUpdatedNotesAction(user.googleId, null, setEditHighLoading))
                setCurrentlyEditing(-1)
            }
            else if (currentPriority == "Medium") {
                dispatch(getUpdatedNotesAction(user.googleId, null, setEditMediumLoading))
                setCurrentlyEditing(-1)
            }
            else {
                dispatch(getUpdatedNotesAction(user.googleId, null, setEditLowLoading))
                setCurrentlyEditing(-1)

            }
        })
    }




    return (

        (user) ?
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, {
                                [classes.hide]: open,
                            })}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Noter
          </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        }),
                    }}
                >
                    <div className={classes.toolbar}>
                        <h5>{(user) ? user.name : null}</h5>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <br></br>
                    <div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>
                        <img src={(user) ? user.imageUrl : null} height="50px" width="50px" style={{ marginLeft: "10px" }}></img>
                        {
                            (open == true) ? <p style={{ marginTop: "10px" }}>{user ? user.email : null}</p> : null
                        }
                    </div>

                    <List>
                        <ListItem button key="Add" onClick={() => { setAddNoteModal(true); setOpen(false) }}>
                           
                            <ListItemIcon> 
                                <Tooltip title="Add a Note">
                                <AddIcon />
                                </Tooltip>
                                </ListItemIcon>
                            <ListItemText primary="Add" />
                            

                        </ListItem>
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <AddNote
                        closeModal={closeModal}
                        show={AddNoteModal}
                        onHide={() => setAddNoteModal(false)}

                    />


                    <div>
                        <h5 style={{ marginLeft: "40px", marginBottom: "30px" }}>HIGH PRIORITY NOTES</h5>

                        <Masonry
                            breakpointCols={3}
                            className="my-masonry-grid"
                            columnClassName="my-masonry-grid_column">



                            {
                                user.highPriorityNotes.map((note, index) => <div>
                                    {

                                        (isEditHighLoading && currentlyEditing == index) ? <CircularProgress /> :
                                            <div>
                                                {
                                                    (currentlyEditing == index && currentPriority == "High") ?



                                                        <div>
                                                            
                                                            <EditField note={note} sendEditReq={sendEditReq} />

                                                        </div>

                                                        :
                                                        <div style={{ margin: "10px" }}>
                                                            {
                                                                (!(note.photoInfo == "")) ?
                                                                    <div>
                                                                        <div style={{ marginLeft: "80px" }}>
                                                                            <Image publicId={note.photoInfo} width="100" height="100" cloudName="prakhar-parashar" />

                                                                        </div>
                                                                        <hr width="75%"></hr>
                                                                    </div>
                                                                    :
                                                                    null}

                                                            {note.noteText}
                                                            <div style={{ display: "grid", gridTemplateColumns: "auto auto auto", gridGap: "20px" }}>
                                                                <Tooltip title="edit">
                                                                    <IconButton onClick={() => { editNote(index, note.notePriority) }}><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                                    </svg></IconButton>
                                                                </Tooltip>

                                                                <Tooltip title="Delete">
                                                                    <IconButton aria-label="delete" onClick={() => { deleteNote(index, note.notePriority, note.userGoogleId) }}>
                                                                        <DeleteIcon />
                                                                    </IconButton>
                                                                </Tooltip>

                                                                <ChangePriority currentPriority={note.notePriority} index={index} userGoogleId={note.userGoogleId} changePriorityRequest={changePriorityRequest} />
                                                            </div>
                                                        </div>
                                                }
                                            </div>}
                                </div>)
                            }

                        </Masonry>
                    </div>
                    <br></br>
                    <br></br>
                    <hr width="75%"></hr>
                    <br></br>
                    <br></br>




                    <div>
                        <h5 style={{ marginLeft: "40px", marginBottom: "30px" }}>MEDIUM PRIORITY NOTES</h5>
                        <Masonry
                            breakpointCols={3}
                            className="my-masonry-grid"
                            columnClassName="my-masonry-grid_column">


                            {
                                user.mediumPriorityNotes.map((note, index) => <div>

                                    {

                                        (isEditMediumLoading && currentlyEditing == index) ? <CircularProgress /> :
                                            <div>
                                                {
                                                    (currentlyEditing == index && currentPriority == "Medium") ?
                                                        <div>
                                                            <EditField note={note} sendEditReq={sendEditReq} />

                                                        </div>
                                                        :

                                                        <div style={{ margin: "10px" }}>

                                                            {



                                                                (!(note.photoInfo == "")) ?
                                                                    <div>
                                                                        <div style={{ marginLeft: "80px" }}>
                                                                            <Image publicId={note.photoInfo} width="100" height="100" cloudName="prakhar-parashar" />

                                                                        </div>
                                                                        <hr width="75%"></hr>
                                                                    </div>
                                                                    :
                                                                    null}

                                                            {note.noteText}
                                                            <div style={{ display: "grid", gridTemplateColumns: "auto auto auto", gridGap: "20px" }}>
                                                                <Tooltip title="edit">
                                                                    <IconButton onClick={() => { editNote(index, note.notePriority) }}><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                                    </svg></IconButton>
                                                                </Tooltip>

                                                                <Tooltip title="Delete">
                                                                    <IconButton aria-label="delete" onClick={() => { deleteNote(index, note.notePriority, note.userGoogleId) }}>
                                                                        <DeleteIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                                <ChangePriority currentPriority={note.notePriority} index={index} userGoogleId={note.userGoogleId} changePriorityRequest={changePriorityRequest} />
                                                            </div>

                                                        </div>
                                                }
                                            </div>}
                                </div>)
                            }
                        </Masonry>
                    </div>

                    <br></br>
                    <br></br>
                    <hr width="75%"></hr>
                    <br></br>
                    <br></br>



                    <div>
                        <h5 style={{ marginLeft: "40px", marginBottom: "30px" }}>LOW PRIORITY NOTES</h5>
                        <Masonry
                            breakpointCols={3}
                            className="my-masonry-grid"
                            columnClassName="my-masonry-grid_column"
                        >


                            {
                                user.lowPriorityNotes.map((note, index) => <div>

                                    {

                                        (isEditLowLoading && currentlyEditing == index) ? <CircularProgress /> :
                                            <div>
                                                {
                                                    (currentlyEditing == index && currentPriority == "Low") ?
                                                        <div>

                                                            <EditField note={note} sendEditReq={sendEditReq} />

                                                        </div>
                                                        :

                                                        <div style={{ margin: "10px" }}>

                                                            {
                                                                (!(note.photoInfo == "")) ?
                                                                    <div>
                                                                        <div style={{ marginLeft: "80px" }}>
                                                                            <Image publicId={note.photoInfo} width="100" height="100" cloudName="prakhar-parashar" />

                                                                        </div>
                                                                        <hr width="75%"></hr>
                                                                    </div>
                                                                    :
                                                                    null}

                                                            {note.noteText}
                                                            <div style={{ display: "grid", gridTemplateColumns: "auto auto auto", gridGap: "20px" }}>
                                                                <Tooltip title="edit">
                                                                    <IconButton onClick={() => { editNote(index, note.notePriority) }}><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                                    </svg></IconButton>
                                                                </Tooltip>

                                                                <Tooltip title="Delete">
                                                                    <IconButton aria-label="delete" onClick={() => { deleteNote(index, note.notePriority, note.userGoogleId) }}>
                                                                        <DeleteIcon />
                                                                    </IconButton>
                                                                </Tooltip>

                                                                <ChangePriority currentPriority={note.notePriority} index={index} userGoogleId={note.userGoogleId} changePriorityRequest={changePriorityRequest} />

                                                            </div>
                                                        </div>
                                                }
                                            </div>}
                                </div>)
                            }
                        </Masonry>
                    </div>
                </main>
            </div>
            : null


    );
}