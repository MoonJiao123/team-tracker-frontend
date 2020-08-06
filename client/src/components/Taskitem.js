import React from 'react'
import { View} from '@tarojs/components'

export default function Taskitem(props) {
    const dragStart = e => {
        const target = e.target;
        e.dataTransfer.setData('task_id', target.id);
        
        setTimeout(() => {
            target.style.display = 'none';
        }, 0);
    }
    const dragOver = e => {
        e.stopPropagation();
    }
    return (
        <View
            id={props.id}
            className={props.className}
            draggable={props.draggable}
            onDragStart={dragStart}
            ondragOver={dragOver}
        >
            {props.children}

        </View>
    )
}