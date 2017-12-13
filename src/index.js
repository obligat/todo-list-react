import React from 'react';
import ReactDom from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
import TodoCategoryForm from './components/TodoCategoryForm';
import TodoCategory from './components/TodoCategory';

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        let todoApp = JSON.parse(localStorage.getItem('todoApp')) || [];
        /*this.state = {
            Todo: [
                {
                    name: 'default',
                    items: [],
                }
            ],
            filter: {keyword: '', status: "SHOW_ALL"},
            selectedCategory: 0,
        };*/
        if(!todoApp.length){
            todoApp =  [
                {
                    name: 'default',
                    items: [],
                }
            ]
        }
        this.state = {
            Todo: todoApp,
            filter: {keyword: '', status: "SHOW_ALL"},
            selectedCategory: 0,
        };
        this.handleChange = this.handleChange.bind(this);
        this.updateItems = this.updateItems.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.filterItem = this.filterItem.bind(this);
        this.searchItem = this.searchItem.bind(this);
        this.AddCategory = this.AddCategory.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
        this.setSelectedCategory = this.setSelectedCategory.bind(this);
    }

    handleChange(id, e) {
        let type = this.state.selectedCategory;
        let isChecked = e.target.checked;
        let items = this.state.Todo[type].items;
        let item = items.filter(item => item.id === id);
        item[0].isDone = isChecked;

        this.setState({
            items: [...items, item]
        });

        localStorage.setItem('todoApp', JSON.stringify(this.state.Todo));
    }

    updateItems(newItem) {
        let newTodo = this.state.Todo;
        let type = this.state.selectedCategory;
        let allItems = this.state.Todo[type].items.concat(newItem);
        newTodo[type].items = allItems;
        localStorage.setItem('todoApp', JSON.stringify(newTodo));
        this.setState({
            Todo: newTodo,
        })
    }

    deleteItem(id) {
        let newTodo = this.state.Todo;
        let type = this.state.selectedCategory;
        let copyItems = this.state.Todo[type].items.slice();
        let newItems = copyItems.filter(item => item.id !== id);
        newTodo[type].items = newItems;
        localStorage.setItem('todoApp', JSON.stringify(newTodo));
        this.setState({
            Todo: newTodo,
        })
    }

    filterItem(e) {
        let status = e.target.id;
        let keyword = this.state.filter.keyword;
        this.setState({
            filter: {
                keyword,
                status,
            }
        });
    }

    searchItem(e) {
        e.stopPropagation();
        e.preventDefault();
        let keyword = e.target.value;
        let status = this.state.filter.status;
        this.setState({
            filter: {
                keyword,
                status,
            }
        });
    }

    AddCategory(newCategory) {
        let category = {name: newCategory, items: []};
        let newTodo = this.state.Todo.concat([category]);
        localStorage.setItem('todoApp', JSON.stringify(newTodo));
        this.setState({
            Todo: newTodo
        });
    }

    setSelectedCategory(index) {
        this.setState({
            selectedCategory: index
        });
    }

    deleteCategory(index) {
        let copyTodo = this.state.Todo;
        copyTodo.splice(index, 1);
        localStorage.setItem('todoApp', JSON.stringify(copyTodo));
        this.setState({
            Todo: copyTodo
        });
    }

    render() {
        let type = this.state.selectedCategory;
        let Todo = this.state.Todo;
        console.log(Todo);
        if(Todo.length === 0){
            Todo[type] = [];
        }
        return (
            <div className="container app-container">
                <div className="col-md-3">
                    <div className="category-form">
                        <TodoCategoryForm onFormSubmit={this.AddCategory}/>
                    </div>
                    <TodoCategory selectedId={this.state.selectedCategory}
                                  onSelected={this.setSelectedCategory}
                                  Todos={Todo}
                                  deleteCategory={this.deleteCategory}
                    />
                </div>
                <div className="col-md-9">
                    <TodoFilter filter={this.state.filter}
                                TodoForm={<TodoForm onFormSubmit={this.updateItems}/>}
                                onFilter={this.filterItem}
                                onSearch={this.searchItem}/>
                    <TodoList filter={this.state.filter}
                              items={Todo[type].items}
                              handleChange={this.handleChange}
                              onDelete={this.deleteItem}/>
                </div>
            </div>)
    }
}

ReactDom.render(<TodoApp/>, document.getElementById("todo"));