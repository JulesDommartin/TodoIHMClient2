import { Component, OnInit, Inject } from '@angular/core';
import {TodoListWithItems, TodoListJSON, TodoListService, ItemJSON} from "../todo-list.service";
import {List} from "immutable";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  lists = List<TodoListJSON>();

  private title: string = '';

  constructor(private todoListService: TodoListService, public dialog: MatDialog,
    public toastr: ToastsManager,
    public snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  getLists(): TodoListWithItems[] {
    return this.todoListService.getLists();
  }

  createList(name: string) {
    if (name) {
      const localListID = this.todoListService.SERVER_CREATE_NEW_LIST(name, {
      });
      this.showSnackBar("List successfully created", "");
    }
  }

  showSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
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

  addToList($event): void {
    console.log($event);
  }

}


@Component({
  selector: 'add-list-dialog',
  templateUrl: 'add-list-dialog.html',
})
export class AddListDialog {

  public isValid : boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddListDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onKey(evt: any) {
    if (evt.keyCode === 13) {
      this.dialogRef.close(this.data.title);
    } else {
      if(this.data.title) {
        this.isValid = true;
      } else {
        this.isValid = false;
      }
    }
  }

}
