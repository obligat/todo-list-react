import React from 'react';

export default class TodoFilter extends React.Component {

    isActive(value) {
        return ((value === this.props.filter.status) ? 'active' : '');
    }


    render() {
        return (<nav className="navbar bg-info">
            <div className="collapse navbar-collapse">
                {
                    this.props.TodoForm
                }

                <form className="navbar-form navbar-left">
                    <div className="input-group">
                        <input type="text" className="form-control" onChange={(e)=>this.props.onSearch(e)}
                               placeholder="search"/>
                    </div>

                </form>

                <ul className="nav navbar-nav navbar-right nav-tabs">
                    <li className={this.isActive('SHOW_ALL')}><a onClick={(e) => this.props.onFilter(e)}
                                                                 id="SHOW_ALL">All</a></li>
                    <li className={this.isActive('false')}><a onClick={(e) => this.props.onFilter(e)}
                                                                 id="false">Incomplete</a></li>
                    <li className={this.isActive('true')}><a onClick={(e) => this.props.onFilter(e)}
                                                             id="true">Complete</a></li>
                </ul>
            </div>
        </nav>);
    }
}