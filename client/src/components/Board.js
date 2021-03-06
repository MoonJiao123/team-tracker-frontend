import React, { Component } from 'react'
import { View} from '@tarojs/components'

export default function Board(props) {
    const drop = e =>{
        e.preventDefault();
        const task_id = e.dataTransfer.getData('task_id');
        const task = document.getElementById(task_id);
        task.style.display = 'block';
        e.target.appendChild(task);
    }

    const dragOver = e =>{
        e.preventDefault();
    }
    return (
        <View 
            id={props.id}
            className ={props.className}
            onDrop={drop}
            onDragOver={dragOver}
        >
            {props.children}
        </View>
    )
}
