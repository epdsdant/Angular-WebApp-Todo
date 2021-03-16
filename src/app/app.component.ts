import { Component } from "@angular/core";
import { Todo } from "src/models/todo.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  public title: String = "Minhas Tarefas";
  public todos: Todo[] = [];

  constructor() {
    this.todos.push(new Todo(1, "Estudar Angular", false));
    this.todos.push(new Todo(2, "Estudar ReactJS", false));
    this.todos.push(new Todo(3, "Estudar Salesforce", false));
  }

  removerTodo() {}
}
