import { TodoListDarkTheme } from './../../JSS_StyledComponents/Themes/TodoListDarkTheme';
import { add_task, change_theme, delete_task, done_task, edit_task, update_task } from './../types/TodoListTypes';
import { arrTheme } from './../../JSS_StyledComponents/Themes/ThemeManager';

const initialState = {
  themeTodoList: TodoListDarkTheme,
  taskList: [
    
  ],
  taskEdit: { id: '-1', taskName: '', done: false },
};

const TodoListReducer = (state = initialState, action) => {
  switch (action.type) {
    case add_task: {
      console.log(action);
      if (action.newTask.taskName.trim() === '') {
        alert('TaskName is required');
        return { ...state };
      }
      //Kiểm tra tồn tại
      let taskListUpdate = [...state.taskList];
      let index = taskListUpdate.findIndex((task) => task.taskName === action.newTask.taskName);

      if (index !== -1) {
        alert('taskName already exists');

        return { ...state };
      }

      taskListUpdate.push(action.newTask);

      state.taskList = taskListUpdate;

      return { ...state };
    }
    case change_theme: {
      //Tìm ra theme dựa vào action.themeId được chọn
      let theme = arrTheme.find((theme) => theme.id == action.themeId);
      if (theme) {
        //set lại theme cho state.themeTodoList
        state.themeTodoList = { ...theme.theme };
      }
      return { ...state };
    }

    case done_task: {
      //Click vào done check => dispatch action có taskId
      let taskListUpdate = [...state.taskList];
      //Tìm ra task đó ở vị trí nào trong mảng, tiến hành cập nhật lại thuộc tính done=true
      //Và cập nhật state của redux
      let index = taskListUpdate.findIndex((task) => task.id === action.taskId);

      if (index !== -1) {
        taskListUpdate[index].done = true;
      }

      return { ...state, taskList: taskListUpdate };
    }

    case delete_task: {
      let taskListUpdate = [...state.taskList];
      let index = taskListUpdate.findIndex((task) => task.id === action.taskId);
      if (index !== -1) {
        taskListUpdate.splice(index, 1);
      }

      return { ...state, taskList: taskListUpdate };
    }
    case edit_task: {
      return { ...state, taskEdit: action.task };
    }

    case update_task: {
      console.log(action);
      //Chỉnh sửa lại taskName của taskEdit
      state.taskEdit = { ...state.taskEdit, taskName: action.taskName };

      //Tìm trong taskList cập nhật lại taskEdit người dùng update
      let taskListUpdate = [...state.taskList];

      let index = taskListUpdate.findIndex((task) => task.id === state.taskEdit.id);

      if (index !== -1) {
        taskListUpdate[index] = state.taskEdit;
      }
      state.taskList = taskListUpdate;
      state.taskEdit = { id: '-1', taskName: '', done: false };

      return { ...state };
    }

    default:
      return { ...state };
  }
};

export default TodoListReducer;
