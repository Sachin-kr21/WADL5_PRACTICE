const {request,response} = require('express')
const express = require('express')
const app = express()
const bodyParser=require('body-parser')
app.use(bodyParser.json())

const {Todo}= require("./models")

app.get("/todos",(request,response) => {
    console.log('Todo list')
})
app.post("/todos",async (request,response) => {
    console.log("Creating a todo",request.body)
    try{
        const todo = await Todo.addTodo({title: request.body.title,dueDate: request.body.dueDate,completed:false});
        return response.json(todo);
    }
    catch(error){
        console.log(error)
        return response.status(422).json(error)
    }
})
app.put("/todos/:id/markAsCompleted", async (request,response) => {
    console.log('Updating a todo by ID: ', request.params.id)
    const todo= await Todo.findByPk(request.params.id)
    try{
        const updatedTodo = await todo.markAsCompleted()
        return response.json(updatedTodo)
    }
    catch(error){
        console.log(error)
        return response.status(422).json(error)
    }
})
app.delete("/todos/:id",(request,response) => {
    response.send("Delete a todo by ID: ".request.params.id)
})
app.listen(3000,() => {
    console.log("express server started");
})