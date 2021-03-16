import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Todo } from "src/models/todo.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  public title: String = "My Todo List";
  public todos: Todo[] = [];

  public mode: String = "list";

  //Criação de Formulário
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      description: [
        "",
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(60),
          Validators.required
        ])
      ]
    });

    this.loadLocalStorage();
  }

  addTodo() {
    const description = this.form.controls["description"].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, description, false));
    this.saveLocalStorage();
    this.clearForm();
  }

  removeTodo(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
      this.saveLocalStorage();
    }
  }

  undoTodo(todo: Todo) {
    todo.done = false;
    this.saveLocalStorage();
  }

  doneTodo(todo: Todo) {
    todo.done = true;
    this.saveLocalStorage();
  }

  clearForm() {
    this.form.reset();
  }

  //Tratando persistência em localStorage
  saveLocalStorage() {
    const data = JSON.stringify(this.todos);
    localStorage.setItem("todos", data);
    this.mode = "list";
  }

  loadLocalStorage() {
    const data = localStorage.getItem("todos");
    if (data) {
      this.todos = JSON.parse(data);
    } else {
      this.todos = [];
    }
  }

  changeMode(mode: String) {
    this.mode = mode;
  }
}
