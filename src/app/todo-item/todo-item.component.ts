import {ChangeDetectionStrategy, Component, Inject, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ListID, ItemJSON, TodoListService} from "../todo-list.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {DeleteModalComponent} from "../delete-modal/delete-modal.component";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements OnInit, OnChanges {
  @Input() item: ItemJSON;
  @Input() listId: ListID;
  @Input() clock: number;
  private editingLabel = false;

  constructor(private todoListService: TodoListService, public dialog: MatDialog) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
  }

  setLabel(label: string) {
    this.todoListService.SERVER_UPDATE_ITEM_LABEL(this.listId, this.item.id, label);
    this.editLabel(false);
  }

  isEditingLabel(): boolean {
    return this.editingLabel;
  }

  editLabel(edit: boolean) {
    this.editingLabel = edit;
  }

  check(checked: boolean) {
    this.todoListService.SERVER_UPDATE_ITEM_CHECK(this.listId, this.item.id, checked);
  }

  openDeleteModal(): void {
    this.dialog.open(DeleteModalComponent, {
      width: '250px',
      data: {listId: this.listId, item: this.item}
    });
  }
}
