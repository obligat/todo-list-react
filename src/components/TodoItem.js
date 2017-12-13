import React from 'react';

export default function (props) {

    let formatTime = '';
    if(props.item.id){
        formatTime = new Date(props.item.id).toISOString().match(/(\d{4}-\d{2}-\d{2})/)[1];
    }

    return (<li className="list-group-item">
        <input type="checkbox"
               onChange={(e) => props.handleChange(props.item.id, e)}
               checked={props.item.isDone}/>
        <span style={{textDecoration: props.item.isDone ? "line-through" : ""}}>
            {props.item.text} &nbsp;&nbsp;
        </span>
        <span>{formatTime}</span>
        <button type="button"
                className="close pull-right"
                aria-hidden="true"
                onClick={() => props.onRemove(props.item.id)}>&times;</button>
    </li>);
}
