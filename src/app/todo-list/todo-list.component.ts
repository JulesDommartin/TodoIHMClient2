import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TodoListWithItems, TodoListService} from "../todo-list.service";
import {MatDialog} from "@angular/material";
import {DeleteModalComponent} from "../delete-modal/delete-modal.component";
import {MatSnackBar} from '@angular/material';

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

  constructor(private todoListService: TodoListService, public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  showSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  createItem(label: string) {
    if (label) {
      const id = this.todoListService.SERVER_CREATE_ITEM(this.list.id, label, false, {
      });
      this.showSnackBar("Item sucessfully created", "");
    } else {
      this.showSnackBar("You can't add an empty task", "");
    }
  }

  setName(name: string) {
    this.todoListService.SERVER_UPDATE_LIST_NAME(this.list.id, name);
    this.showSnackBar("Name successfully updated", "");
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

  addToList($event): void {
    let item = this.todoListService.getItem(this.list.id, $event.item.id);
    if (!item) {
      this.todoListService.SERVER_CREATE_ITEM(this.list.id, $event.item.label, $event.item.checked, $event.item.data);
      this.todoListService.SERVER_DELETE_ITEM($event.listId, $event.item.id);
    }
  }
}
