import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-house-edit',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `<dialog open id="my_modal_3" #modal class="modal">
    <div class="modal-box w-full h-full">
      <form method="dialog">
        <button
          (click)="close()"
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
      </form>
      <h3 class="text-lg font-bold">Edit the House</h3>
      <p class="py-4">You could edit house {{ id }} here.</p>
    </div>
  </dialog>`,
  styles: ``,
})
export class HouseEditComponent implements OnInit {
  @Input() id = '';
  @ViewChild('modal') modal!: ElementRef;
  location = inject(Location);
  ngOnInit() {
    console.log('Editing house with id:', this.id);
  }
  close() {
    this.modal.nativeElement.close();
    this.location.back();
  }
}
