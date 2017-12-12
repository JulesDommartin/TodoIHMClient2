import { Output, EventEmitter, Input, HostListener, Directive, HostBinding, ElementRef, Renderer2 } from '@angular/core';
import { DragService } from './drag.service';

export interface DropTargetOptions {
  zone?: string;
}

@Directive({
  selector: '[todoDropTarget]'
})
export class DropTargetDirective {
  constructor(private dragService: DragService, private renderer: Renderer2, private hostElement: ElementRef) {
    
  }
  
  @Input()
  set todoDropTarget(options: DropTargetOptions) {
    if (options) {
      this.options = options;
    }
  }
  
  @Output('todoDrop') drop = new EventEmitter();
  
  private options: DropTargetOptions = {};
  
  @HostListener('dragenter', ['$event'])
  onDragEnter(event) {
    const { zone = 'zone' } = this.options;

    this.renderer.addClass(this.hostElement.nativeElement, 'todo-drag-over');

    if (this.dragService.accepts(zone)) {
       event.preventDefault();
    }
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event) {
    const { zone = 'zone' } = this.options;

    if (this.dragService.accepts(zone)) {
       event.preventDefault();
    }
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event) {
    this.renderer.removeClass(this.hostElement.nativeElement, 'todo-drag-over');
  }

  @HostListener('drop', ['$event'])
  onDrop(event) {
    const data =  JSON.parse(event.dataTransfer.getData('Text'));
    this.renderer.removeClass(this.hostElement.nativeElement, 'todo-drag-over');
    
    this.drop.next(data);
  }
}