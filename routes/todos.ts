import {Router} from 'express';

import {Todo} from '../models/todo';

let todos:Todo[] = [];

const router = Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({todos:todos});
})

router.post('/todo',(req,res,next)=>{
    const newTodo:Todo = {
        id: new Date().toISOString(),
        text:req.body.text
    }
    todos.push(newTodo);
})
router.put('/todo/:totoId',(req,res,next)=>{
    const tid = req.params.totoId;
    const totoIndex = todos.findIndex(todoItem=>todoItem.id===tid);
    if(totoIndex>=0){
        todos[totoIndex] = {id:todos[totoIndex].id,text:req.body.text};
        return res.status(200).json({message:'updated todo',todos:todos});
    }
    res.status(404).json({message:"could not find todo for thid id"});
})

router.delete('/todo/:todoId',(req,res,next)=>{
    todos = todos.filter(todoItem=>todoItem.id!=req.params.todoId);
    res.status(200).json({message:'deleted todo',todos:todos});
})

export default router;