import { useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import Swal from "sweetalert2"
import { useForm } from "../../hooks"
import { ImageGallery } from "../components"
import { setActiveNote, starSaveNote, startDeletingNote, startUploadingFiles } from "../../../store/journal"

export const NoteView = () => {

  const dispatch = useDispatch()
  const { active:note, messageSaved, isSaving } = useSelector( state => state.journal )

  const { body, title, date, onInputChange, formState } = useForm( note );

  const dateString = useMemo( () => {
    const newDate = new Date( date)
    return newDate.toUTCString()
  }, [date])

  const fileInputRef = useRef()

  useEffect(() => {
    dispatch( setActiveNote( formState ) )
  }, [formState]);

  useEffect(() => {
    if ( messageSaved.length > 0 ){
      Swal.fire('Note updated', messageSaved, 'success')
    }
  }, [ messageSaved ]);

  const onSaveNote = () => {
    dispatch( starSaveNote() )
  }

  const onFileInputChange = ({ target }) => {
    if ( target.files === 0 ) return;
    
    dispatch( startUploadingFiles( target.files ) )
  }

  const onDelete = () => {
    dispatch( startDeletingNote() )
  }

  return (
    <Grid 
      container
      className="animate__animated animate__fadeIn animate__faster"
      direction="row"
      justifyContent="space-between"
      sx={{ mb: 1 }}>

      <Grid item>
        <Typography fontSize={39} fontWeight='light'>{ dateString } </Typography>
      </Grid>

      <Grid item>

        <input 
          type="file" 
          multiple 
          onChange={ onFileInputChange }
          style={{ display: 'none' }}
          ref={ fileInputRef } />

        <IconButton 
          color="primary"
          disabled={ isSaving } 
          onClick={ () => fileInputRef.current.click() }>
          <UploadOutlined />
        </IconButton>

        <Button 
          disabled={ isSaving }
          color="primary" 
          sx={{ padding: 2}}
          onClick={ onSaveNote }>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Save
        </Button>
      </Grid>

      <Grid container>
        <TextField 
          type="text"
          variant="filled"
          fullWidth
          placeholder="Enter a title"
          label="Title"
          sx={{ border: 'none', mb: 1 }}
          name="title"
          value={ title }
          onChange={ onInputChange }
        />

        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="What happened today?"
          minRows={5}
          sx={{ border: 'none', mb: 1 }}
          name="body"
          value={ body }
          onChange={onInputChange}
        />
      </Grid>

      <Grid 
        container
        justifyContent="end">
        <Button
          onClick={ onDelete }
          sx={{ mt: 2} }
          color="error" >
          <DeleteOutline />
          Delete note
        </Button>
      </Grid>

      <ImageGallery images={ note.imageUrls } />
      
    </Grid>
  )
}
