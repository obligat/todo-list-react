import React from 'react';

export default function (props) {

    let formatTime = '';
    let reg = /(\d{2})\/(\d{2})\/(\d{4})/g;
    if (props.item.id) {
        formatTime = new Date(props.item.id).toLocaleString('en-GB').match(/(\d{2}\/\d{2}\/\d{4}).*(\d{2}:\d{2}:\d{2})/);
        formatTime = formatTime[1].replace(reg, '$3-$2-$1') + '  ' + formatTime[2].slice(0, -3);
    }

    return (<li className="list-group-item todo-item-li">
        <div>
            <input type="checkbox"
                   onChange={(e) => props.handleChange(props.item.id, e)}
                   checked={props.item.isDone}/>
            <span className="todo-item-text" style={{textDecoration: props.item.isDone ? "line-through" : ""}}>
            {props.item.text}
        </span>
        </div>
        <div>
            <span className="time-info">{formatTime} &nbsp;&nbsp;</span>
            <button type="button"
                    className="close"
                    onClick={() => props.onRemove(props.item.id)}>&times;</button>
        </div>
    </li>);
}
