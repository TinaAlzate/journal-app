import { useMemo } from "react"
import { useDispatch } from "react-redux"
import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { setActiveNote } from "../../../store/journal"

export const SidebarItem = ({ id, title = '', body, date, imageUrls = [] }) => {

  const dispatch = useDispatch()

  const onActiveNote = () => {
    dispatch( setActiveNote({ title, body, id, date, imageUrls}) )
  }

  const newTitle = useMemo(() => {

    return title.length > 17
      ? title.substring(0,15) + '...'
      : title;

  }, [ title ])

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={ onActiveNote }>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={ newTitle } />
          <ListItemText secondary={ body } />
        </Grid>
      </ListItemButton>
    </ListItem>
  )
}
