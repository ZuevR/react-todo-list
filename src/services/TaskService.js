import MyAxios from '../utils/AxiosInterceptor';

export default class TaskService {
  static addNewTask(data) {
    return MyAxios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL}/tasks/add-task`,
      data,
    });
  }
}
