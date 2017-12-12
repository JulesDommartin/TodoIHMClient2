import { Input, HostListener, Directive, HostBinding } from '@angular/core';
import { DragService } from './drag.service';

export interface DraggableOptions {
  zone?: string;
  data?: any;
}

@Directive({
  selector: '[todoDraggable]'
})
export class DraggableDirective {
  constructor(private dragService: DragService) {
    
  }
  
  @HostBinding('draggable')
  get draggable() {
    return true;
  }
  
  @Input()
  set todoDraggable(options: DraggableOptions) {
    if (options) {
      this.options = options;
    }
  }
  
  private options: DraggableOptions = {};
  
  @HostListener('dragstart', ['$event'])
  onDragStart(event) {
    const { zone = 'zone', data = {} } = this.options;
    console.log("drag");
    this.dragService.startDrag(zone);
    
    event.dataTransfer.setData('Text', JSON.stringify(data));
  }
}