import { Button, Card, Checkbox, Grid, TextField, Typography, styled } from "@mui/material";
import { useRef } from "react";
import { TodoListProps } from "../../commonInterfaces";


const CustomCard = styled(Card)(({ theme }) => ({
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1)
}));

interface TodoCardProps extends TodoListProps {
    toggleCheck(id: number): void,
    deleteTodo(id: number): void,
    setEditIndex(id: number): void,
    saveEdit(id: number, title: string, description: string): void,
    isEditing: boolean
}



export const TodoCardComponent = ({id, checked, title, description, toggleCheck, deleteTodo, isEditing, setEditIndex, saveEdit}: TodoCardProps) => {
    
    const titleRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLInputElement>(null)

    return(
        <CustomCard elevation={3}>
            <Grid container>
                <Grid item>
                    <Checkbox onChange={()=>{toggleCheck(id)}} checked = {checked}></Checkbox>
                </Grid>
                <Grid item xs = {8}>
                    {!isEditing ?
                        <>
                            <Typography variant = 'h6' style = {{textDecoration: checked ? 'line-through' : 'none', color: checked ? 'lightgray' : 'black'}}>
                                {title}
                            </Typography>
                            <Typography variant = 'body1' style = {{textDecoration: checked ? 'line-through' : 'none', color: checked ? 'lightgray' : 'black'}}>
                                {description}
                            </Typography>
                            <Button onClick = {()=>{setEditIndex(id)}} variant = 'contained' color = 'info' sx = {{marginBottom: 1}}>
                                Edit
                            </Button>
                        </>
                        :
                        <>
                            <TextField inputRef = {titleRef} defaultValue={title} sx = {{marginBottom: 1}}/>
                            <TextField inputRef = {descriptionRef} defaultValue={description} sx = {{marginBottom: 1}}/>
                            <br/>
                            <Button onClick={()=>{if(titleRef.current && descriptionRef.current)saveEdit(id, titleRef.current.value, descriptionRef.current.value)}} variant = 'contained' color = 'success' sx = {{marginBottom: 1}}>
                                Save
                            </Button>
                            <br/>
                            <Button onClick={()=>{setEditIndex(-1)}} variant = 'contained' color = 'warning'>
                                Discard
                            </Button>
                        </>
                    }
                </Grid>
                {!isEditing &&
                    <Grid item xs = {2}>
                        <Button variant="contained" onClick={()=>{deleteTodo(id)}} color="error">
                            Delete
                        </Button>
                    </Grid>
                }
            </Grid>
        </CustomCard>
    )
}