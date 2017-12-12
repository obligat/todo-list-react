import React from 'react';

export default function (props) {


    return (<li className="list-group-item">
        <input type="checkbox"
               onChange={(e) => props.handleChange(props.item.id, e)}
               checked={props.item.isDone}/>
        <span style={{textDecoration: props.item.isDone ? "line-through" : ""}}>
            {props.item.text}
        </span>
        <button type="button"
                className="close pull-right"
                aria-hidden="true"
                onClick={() => props.onRemove(props.item.id)}>&times;</button>
    </li>);
}
