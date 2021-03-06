import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { Button } from '../../ComponentsTodoList/Button';
import { Container } from '../../ComponentsTodoList/Container';
import { Dropdown } from '../../ComponentsTodoList/Dropdown';
import { Heading3 } from '../../ComponentsTodoList/Heading';
import { Table, Th, Thead, Tr } from '../../ComponentsTodoList/Table';
import { TextField } from '../../ComponentsTodoList/TextField';
import { arrTheme } from '../../Themes/ThemeManager';
import {
  addTaskAction,
  changeThemeAction,
  deleteTaskAction,
  doneTaskAction,
  editTaskAction,
  updateTask,
} from './../../../redux/actions/TodoListAction';

class TodoList extends Component {
  state = {
    taskName: '',
    disabled: true,
  };

  renderTaskTodo = () => {
    return this.props.taskList
      .filter((task) => !task.done)
      .map((task, index) => {
        return (
          <Tr key={index}>
            <Th style={{ verticalAlign: 'middle' }}>{task.taskName}</Th>
            <Th className="text-right">
              <Button
                onClick={() => {
                  this.setState(
                    {
                      disabled: false,
                    },
                    () => {
                      this.props.dispatch(editTaskAction(task));
                    }
                  );
                }}
                className="ml-1"
              >
                <i className="fa fa-edit"></i>
              </Button>
              <Button
                onClick={() => {
                  this.props.dispatch(doneTaskAction(task.id));
                }}
                className="ml-1"
              >
                <i className="fa fa-check"></i>
              </Button>
              <Button
                onClick={() => {
                  this.props.dispatch(deleteTaskAction(task.id));
                }}
                className="ml-1"
              >
                <i className="fa fa-trash"></i>
              </Button>
            </Th>
          </Tr>
        );
      });
  };

  renderTaskCompleted = () => {
    return this.props.taskList
      .filter((task) => task.done)
      .map((task, index) => {
        return (
          <Tr key={index}>
            <Th style={{ verticalAlign: 'middle' }}>{task.taskName}</Th>
            <Th className="text-right">
              <Button
                onClick={() => {
                  this.props.dispatch(deleteTaskAction(task.id));
                }}
                className="ml-1"
              >
                <i className="fa fa-trash"></i>
              </Button>
            </Th>
          </Tr>
        );
      });
  };

  renderTheme = () => {
    return arrTheme.map((theme, index) => {
      return <option value={theme.id}>{theme.name}</option>;
    });
  };

  render() {
    return (
      <ThemeProvider  theme={this.props.themeTodoList}>
        <Container className="w-50">
        <Heading3 style={{fontSize: '3rem', fontFamily: 'cursive'}} className="text-center mb-4">Todo List</Heading3>
          <Dropdown className="mb-2"
            onChange={(e) => {
              let { value } = e.target;
              //Dispatch value l??n reducer
              this.props.dispatch(changeThemeAction(value));
            }}
          >
            {this.renderTheme()}
          </Dropdown>
         
          <TextField
            value={this.state.taskName}
            onChange={(e) => {
              this.setState(
                {
                  taskName: e.target.value,
                },
                () => {
                  console.log(this.state);
                }
              );
            }}
            name="taskName"
            label="Task Name"
            className="w-50"
          />
          <Button
            name="taskName"
            onClick={() => {
              //L???y th??ng tin ng d??ng nh???p v??o t??? input
              let { taskName } = this.state;

              //T???o ra 1 task object
              let newTask = {
                id: Date.now(),
                taskName: taskName,
                done: false,
              };

              //????a task object l??n redux th??ng qua dispatch
              this.props.dispatch(addTaskAction(newTask));
            }}
            className="ml-2"
          >
            <i className="fa fa-plus"></i> Add Task
          </Button>
          {this.state.disabled ? (
            <Button
              disabled
              onClick={() => {
                this.props.dispatch(updateTask(this.state.taskName));
              }}
              className="ml-2"
            >
              <i class="fa fa-upload"></i> Update Task
            </Button>
          ) : (
            <Button
              onClick={() => {
                let { taskName } = this.state;
                this.setState(
                  {
                    disabled: true,
                    taskName: '',
                  },
                  () => {
                    this.props.dispatch(updateTask(taskName));
                  }
                );
              }}
              className="ml-2"
            >
              <i class="fa fa-upload"></i> Update Task
            </Button>
          )}

          <hr />
          <Heading3>Task Todo</Heading3>
              <hr/>
          <Table>
            <Thead>{this.renderTaskTodo()}</Thead>
          </Table>

          <Heading3>Task Complete</Heading3>

          <Table>
            <Thead>{this.renderTaskCompleted()}</Thead>
          </Table>
        </Container>
      </ThemeProvider>
    );
  }
  //????y l?? lifecycle tr??? v??? props c?? v?? state c?? c???a component tr?????c khi render (lifecycle n??y ch???y sau render)
  componentDidUpdate(prevProps, prevState) {
    //So s??nh n???u nh?? props tr?????c ???? (taskEdit tr?????c m?? kh??c taskEdit hi???n t???i th?? m??nh m???i setState)
    if (prevProps.taskEdit.id !== this.props.taskEdit.id) {
      this.setState({
        taskName: this.props.taskEdit.taskName,
      });
    }
  }
}

const mapStateToProps = (state) => {
  return {
    themeTodoList: state.TodoListReducer.themeTodoList,
    taskList: state.TodoListReducer.taskList,
    taskEdit: state.TodoListReducer.taskEdit,
  };
};

export default connect(mapStateToProps)(TodoList);
