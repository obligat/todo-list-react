import React from 'react';

export default class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {
                text: '',
                id: null,
                isDone: false,
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.refs.item.value) {
            this.props.onFormSubmit(this.state.item);
            this.setState({
                item: {
                    text: '',
                    id: null,
                    isDone: false,
                }
            });
        }
        this.refs.item.focus();
    }

    onChange(e) {
        this.setState({
            item: {
                text: e.target.value,
                id: new Date().getTime(),
                isDone: false,
            }
        })
    }

    render() {
        return (

            <form onSubmit={this.handleSubmit} className="navbar-form navbar-left">
                <div className="input-group">
                    <input className="form-control" ref="item" onChange={this.onChange}
                           value={this.state.item.text}/>
                    <span className="input-group-addon" onClick={this.handleSubmit}>Add</span>
                </div>
            </form>
        )
    }
}