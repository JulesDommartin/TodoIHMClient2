import { Component, OnInit, Inject } from '@angular/core';
import {TodoListWithItems, TodoListJSON, TodoListService, ItemJSON} from "../todo-list.service";
import {List} from "immutable";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  lists = List<TodoListJSON>();

  private title: string = '';

  constructor(private todoListService: TodoListService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  getLists(): TodoListWithItems[] {
    return this.todoListService.getLists();
  }

  createList(name: string) {
    if (name) {
      const localListID = this.todoListService.SERVER_CREATE_NEW_LIST(name, {
      });
    }
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(AddListDialog, {
      width: '350px',
      data: { title: this.title }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        this.title = '';
        this.createList(result);
      }
    });
  }

}


@Component({
  selector: 'add-list-dialog',
  templateUrl: 'add-list-dialog.html',
})
export class AddListDialog {

  constructor(
    public dialogRef: MatDialogRef<AddListDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onKey(evt: any) {
    if (evt.keyCode === 13) {
      this.dialogRef.close(this.data.title);
    }
  }

}
