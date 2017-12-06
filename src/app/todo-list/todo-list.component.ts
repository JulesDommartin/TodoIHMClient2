import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TodoListWithItems, TodoListService} from "../todo-list.service";
import {MatDialog} from "@angular/material";
import {DeleteModalComponent} from "../delete-modal/delete-modal.component";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit, OnChanges {
  @Input() list: TodoListWithItems;
  @Input() clock: number;
  private editingName = false;

  constructor(private todoListService: TodoListService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  createItem(label: string) {
    const id = this.todoListService.SERVER_CREATE_ITEM(this.list.id, label, false, {
      someData: "someValue",
      someNumber: 42,
      someArray: ["riri", "fifi", "loulou"],
      itemColor: "#FFFFFF"
      // Add other data here...
    });
  }

  setName(name: string) {
    this.todoListService.SERVER_UPDATE_LIST_NAME(this.list.id, name);
    this.editName(false);
  }

  isEditingName(): boolean {
    return this.editingName;
  }

  editName(edit: boolean) {
    this.editingName = edit;
  }

  delete() {

  }

  getColor(): string {
    return this.list.data["color"] ? this.list.data["color"] : "#FFFFFF";
  }

  openDeleteModal(): void {
    this.dialog.open(DeleteModalComponent, {
      width: '350px',
      data: {list: this.list}
    });
  }

  setColor(color: string) {
    console.log("setColor", color);
    this.todoListService.SERVER_UPDATE_LIST_DATA(
      this.list.id,
      Object.assign({}, this.list.data, {color})
    );
  }
}
