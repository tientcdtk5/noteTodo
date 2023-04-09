// mảng chứa danh sách công việc
const todos = JSON.parse(localStorage.getItem("todos")) || [];

// Lấy ra thẻ danh sách công việc
const todoListElement = document.querySelector(".todo__list");
const createFormElement = document.querySelector(".create__form");
const titleInputElement = createFormElement.querySelector(".form__control");
const clearButtonElement = document.querySelector(".todo__clear__button");
const countElement = document.querySelector(".todo__count__value");
const filterForm = document.querySelector(".filter__form");
function saveLocal() {
  // JSON.string(); // chuyển từ obj sang chuỗi
  // JSON.parse(); // Chuyển chuỗi thành obj
  localStorage.setItem("todo", JSON.stringify(todos));
  // localStorage.getItem();
}

function updateTodoCount() {
  countElement.textContent = todos.filter(function (todo) {
    return !todo.status;
  }).length;
}
// tạo 1 obj
function createNewtodo(title) {
  return {
    id: Date.now(),
    title,
    status: false,
  };
}
// xóa 1 công việc
function deleteTodo(e) {
  const buttonElement = e.target;
  console.log(buttonElement);
  const liElement = buttonElement.parentElement; // parent chứ ko phải prent
  const todoId = liElement.getAttribute("todo-id");
  liElement.remove();

  const todoIndex = todos.findIndex(function (todo) {
    return todo.id == todoId;
  });
  todos.splice(todoIndex, 1);
  updateTodoCount();
  saveLocal();
}

function updateTodo(e) {
  const checkboxElement = e.target;
  const liElement = checkboxElement.parentElement;
  const todoId = liElement.getAttribute("todo-id");
  const todo = todos.find(function (todo) {
    return todo.id == todoId;
  });
  todo.status = checkboxElement.checked;
  updateTodoCount();
  saveLocal();
}
// tạo 1 thẻ công việc
function createTodoItem(todo) {
  const liElement = document.createElement("li");
  liElement.classList.add("todo__item");
  const checkboxElement = document.createElement("input");
  checkboxElement.type = "checkbox";
  checkboxElement.classList.add("todo__checkbox");
  checkboxElement.addEventListener("change", updateTodo);
  // Nếu công việc đã hoàn thành
  if (todo.status) {
    checkboxElement.checked = true;
  }
  const titleElement = document.createElement("span");
  titleElement.classList.add("todo__title");
  titleElement.textContent = todo.title;

  const buttonElement = document.createElement("button");
  buttonElement.classList.add("todo__delete__button");
  buttonElement.textContent = `delete`; //sửa lại
  buttonElement.style.marginLeft = "4px"; //sửa
  buttonElement.addEventListener("click", deleteTodo);

  liElement.append(checkboxElement, titleElement, buttonElement);
  liElement.setAttribute("todo-id", todo.id);
  return liElement;
}

function renderTodoList(todos) {
  todoListElement.innerHTML = "";
  todos.forEach(function (todo) {
    const item = createTodoItem(todo);

    todoListElement.append(item);
  });
  updateTodoCount();
}

createFormElement.addEventListener("submit", function (e) {
  e.preventDefault();
  let title = titleInputElement.value;
  const newTodo = createNewtodo(title);
  todos.push(newTodo);
  const newTodoItem = createTodoItem(newTodo);
  todoListElement.append(newTodoItem);
  titleInputElement.value = ""; // khi ấn enter thì có thể reset ô input
  updateTodoCount();
  saveLocal();
});
clearButtonElement.addEventListener("click", function () {
  todos.length = 0;
  todoListElement.innerHTML = "";
  updateTodoCount();
});
filterForm.addEventListener("change", function (e) {
  const filterValue = filterForm.elements.filter.value;
  const items = Array.from(todoListElement.children);
  items.forEach(function (item) {
    const inputElement = item.querySelector(".todo__checkbox");
    switch (filterValue) {
      case "active": {
        console.log("Active");

        if (inputElement.checked) {
          item.style.display = "none";
        } else {
          item.style.display = "block";
        }
        break;
      }
      case "completed": {
        console.log("Completed");

        if (inputElement.checked) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
        break;
      }
      default: {
        console.log("Active");
        item.style.display = "block";
      }
    }
  });
});
renderTodoList(todos);

// Dưới đây là một số lệnh thường được sử dụng trong DOM:

// document.getElementById(id): Tìm kiếm phần tử theo id và trả về đối tượng phần tử.

//     document.getElementsByTagName(tagName): Tìm kiếm phần tử theo tên thẻ và trả về một mảng các đối tượng phần tử.

//         document.createElement(tagName): Tạo một phần tử mới với tên thẻ được chỉ định và trả về đối tượng phần tử mới.

//             element.innerHTML: Truy cập hoặc thiết lập nội dung HTML của phần tử.

//                 element.style.property: Truy cập hoặc thiết lập thuộc tính CSS của phần tử.

//                     element.getAttribute(name): Lấy giá trị của thuộc tính được chỉ định từ phần tử.

//                         element.setAttribute(name, value): Thiết lập giá trị của thuộc tính được chỉ định cho phần tử.

//                             element.appendChild(node): Thêm một nút con vào phần tử.

//                                 element.removeChild(node): Xóa nút con khỏi phần tử.

//                                     element.addEventListener(event, function): Gắn một hàm xử lý sự kiện cho phần tử.

// Các lệnh này được sử dụng để tương tác với các phần tử trong DOM và thay đổi nội dung và hiển thị của chúng.
