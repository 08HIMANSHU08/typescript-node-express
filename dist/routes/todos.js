"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = [];
const router = (0, express_1.Router)();
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    const body = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        text: body.text
    };
    todos.push(newTodo);
    res.status(201).json({ message: 'added todo', todo: newTodo, todos: todos });
});
router.put('/todo/:totoId', (req, res, next) => {
    const body = req.body;
    const tid = req.params.totoId;
    const totoIndex = todos.findIndex(todoItem => todoItem.id === tid);
    if (totoIndex >= 0) {
        todos[totoIndex] = { id: todos[totoIndex].id, text: body.text };
        return res.status(200).json({ message: 'updated todo', todos: todos });
    }
    res.status(404).json({ message: "could not find todo for thid id" });
});
router.delete('/todo/:todoId', (req, res, next) => {
    const params = req.params;
    todos = todos.filter(todoItem => todoItem.id != params.todoId);
    res.status(200).json({ message: 'deleted todo', todos: todos });
});
exports.default = router;