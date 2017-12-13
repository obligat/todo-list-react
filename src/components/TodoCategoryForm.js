import React from 'react';

export default class TodoCategoryForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onFormSubmit(this.state.item);
        this.setState({
            item: '',
        });
        this.refs.item.focus();
    }

    onChange(e) {
        this.setState({
            item: e.target.value,
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="input-group">
                    <input type="text" className="form-control" ref="item"
                               onChange={this.onChange}
                               value={this.state.item}/>
                    <span className="input-group-addon">Add</span>
                </div>
            </form>
        );

    }
}