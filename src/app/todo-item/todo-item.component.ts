import {ChangeDetectionStrategy, Component, Inject, Input, OnChanges, OnInit, SimpleChanges, ViewChild, AfterViewInit} from '@angular/core';
import {ListID, ItemJSON, TodoListService} from "../todo-list.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {DeleteModalComponent} from "../delete-modal/delete-modal.component";
import {MatSnackBar} from '@angular/material';

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
  @ViewChild('newLabel') input: HTMLInputElement;
  itemJson: string = "";
  private editingLabel = false;

  constructor(private todoListService: TodoListService, public dialog: MatDialog,
    public snackBar: MatSnackBar) { 
    this.itemJson = JSON.stringify(this.item);
  }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
  }

  ngAfterViewInit() {
  }

  setLabel(label: string) {
    if (label) {
      this.todoListService.SERVER_UPDATE_ITEM_LABEL(this.listId, this.item.id, label);
      this.showSnackBar("Task successfully updated", "");
      this.editLabel(false, this.input);
    } else {
      this.showSnackBar("Can't set an empty label", "");
    }
  }

  showSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  isEditingLabel(): boolean {
    return this.editingLabel;
  }

  editLabel(edit: boolean, input) {
    this.editingLabel = edit;
    if (this.editingLabel) {
      setTimeout(function(){
        input.focus();
      }, 100);
    }
  }

  check(checked: boolean) {
    this.todoListService.SERVER_UPDATE_ITEM_CHECK(this.listId, this.item.id, checked);
  }

  openDeleteModal(): void {
    this.dialog.open(DeleteModalComponent, {
      width: '350px',
      data: {listId: this.listId, item: this.item}
    });
  }

  onCheckBoxChange(event): void {
    console.log(event);
    this.check(event.checked);
  }
}
