import React from 'react';
import TodoItem from './TodoItem';

export default function (props) {


    let allItems = props.items || [];
    let status = props.filter.status;

    let allItemsFilter = getFilterItems(allItems, status);

    let queryText = props.filter.keyword;

    if (queryText) {
        let queryResult = [];
        let regExp = new RegExp(queryText);
        allItemsFilter.forEach(item => {
            if (regExp.test(item.text)) {
                queryResult.push(item);
            }
        });

        return <ul>{mapItem(queryResult,props)}</ul>
    }

    const doneNumber = allItems.filter(item => item.isDone).length;

    return (
        <div>
            <div className="count-label">
                <span className="label label-info">ALL &nbsp; {allItems.length}</span>
                &nbsp;
                <span className="label label-info">DONE  &nbsp; {doneNumber}</span>
            </div>
            <ul className="list-group">
                {mapItem(allItemsFilter,props)}
            </ul>

        </div>)

}

function mapItem(obj,props) {
    return obj.map(item =>
        <TodoItem item={item} key={item.id}
                  onRemove={props.onDelete}
                  handleChange={props.handleChange}/>)
}

function getFilterItems(allItems, status) {
    let allItemsFilter = allItems;
    switch (status) {
        case 'false':
            allItemsFilter = allItems.filter(t => !t.isDone);
            break;
        case 'true':
            allItemsFilter = allItems.filter(t => t.isDone);
            break;
    }

    return allItemsFilter;
}

