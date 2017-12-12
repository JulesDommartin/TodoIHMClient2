import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {TodoListService, ListID, ItemJSON} from "../todo-list.service";
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private todoListService: TodoListService,
    public snackBar: MatSnackBar
  ) { }

  deleteItem(listId: ListID, item: ItemJSON) {
    this.todoListService.SERVER_DELETE_ITEM(listId, item.id);
    this.dialogRef.close();
    this.showSnackBar("Item sucessfully deleted", "");
  }

  showSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  deleteList(listId: ListID) {
    this.todoListService.SERVER_DELETE_LIST(listId);
    this.dialogRef.close();
    this.showSnackBar("List sucessfully deleted", "");
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
