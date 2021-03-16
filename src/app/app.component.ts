import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Todo } from "src/models/todo.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  public title: String = "Minhas Tarefas";
  public todos: Todo[] = [];

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

    this.todos.push(new Todo(1, "Estudar Angular", true));
    this.todos.push(new Todo(2, "Estudar ReactJS", false));
    this.todos.push(new Todo(3, "Estudar Salesforce", false));
  }

  removerTodo(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
  }

  refazerTodo(todo: Todo) {
    todo.done = false;
  }

  concluirTodo(todo: Todo) {
    todo.done = true;
  }
}
