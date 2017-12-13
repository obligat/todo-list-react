import React from 'react';

export default class TodoCategory extends React.Component {
    constructor(props) {
        super(props);
        this.changeTodo = this.changeTodo.bind(this);
    }


    changeTodo(e) {
        this.props.onSelected(e.currentTarget.dataset.id);
    }

    checkActive(i) {
        if (i === Number(this.props.selectedId)) {
            return "list-group-item active add-btn";
        }
        else {
            return "list-group-item add-btn";
        }
    }

    render() {

        let items = this.props.Todos;

        return (
            <div className="list-group">
                {items.map((item, index) => {
                    let categories = item.items || [];

                    return (<a className={this.checkActive(index)}
                               onClick={this.changeTodo}
                               key={index}
                               data-id={index}>
                        <span className="badge pull-left">
                            {categories.filter(t => t.isDone).length} / {categories.length}
                        </span> {item.name}
                        <button type="button"
                                className="close pull-right" onClick={(e)=>this.props.deleteCategory(index,e)}>&times;</button>
                        </a>)
                })}
            </div>);
    }
}