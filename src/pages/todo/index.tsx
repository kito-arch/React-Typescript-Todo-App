import { Grid, styled } from "@mui/material";
import { useCallback, useState } from "react";
import { DummyTodoList } from "../../dummydata";
import { TodoCardComponent } from "../../components/todoCard";


const FlexCenter = styled('div')(() => ({
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
}))

const Title = styled('h1')( ({theme}) => ({
    color: theme.palette.primary.main 
}))



export const TodoPage = () => {

    const [todoList, setTodoList] = useState(DummyTodoList)
    const [editIndex, setEditIndex] = useState(-1)

    const toggleCheck = useCallback((id: number) => {
        const tempTodoList = todoList
        const index = tempTodoList.findIndex(e => e.id == id)
        tempTodoList[index].checked = !tempTodoList[index].checked
        setTodoList([...tempTodoList])
    }, [todoList])

    const deleteTodo = useCallback((id: number) => {
        let tempTodoList = todoList
        tempTodoList = tempTodoList.filter(el => el.id != id)
        setTodoList([...tempTodoList])
    }, [todoList])

    const saveEdit = useCallback((id: number, title: string, description: string) => {
        const tempTodoList = todoList
        const index = tempTodoList.findIndex(e => e.id == id)
        tempTodoList[index].title = title
        tempTodoList[index].description = description
        setTodoList([...tempTodoList])
        setEditIndex(-1)
    }, [todoList])

    return(
        <Grid container sx = {{px: 1, justifyContent: 'space-around'}}>
            <Grid item xs = {5}>
                <FlexCenter>
                    <div style = {{width: '100%'}}>
                        <Title>
                            Todo
                        </Title>
                        {todoList.filter(el => el.checked == false).map((el)=>{
                            return(
                                <TodoCardComponent key = {el.id} {...el} toggleCheck={toggleCheck} deleteTodo = {deleteTodo} isEditing = {el.id == editIndex} setEditIndex={setEditIndex} saveEdit = {saveEdit}/>
                            )
                        })}
                    </div>
                </FlexCenter>
            </Grid>
            <Grid item xs = {5}>
                <FlexCenter>
                    <div style = {{width: '100%'}}>
                        <Title>
                            Done
                        </Title>
                        {todoList.filter(el => el.checked == true).map((el)=>{
                            return(
                                <TodoCardComponent key = {el.id} {...el} toggleCheck={toggleCheck} deleteTodo = {deleteTodo} isEditing = {el.id == editIndex} setEditIndex={setEditIndex} saveEdit = {saveEdit}/>
                            )
                        })}
                    </div>
                </FlexCenter>
            </Grid>
        </Grid>
    )
} 