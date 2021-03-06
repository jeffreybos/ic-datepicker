import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: 'ic-datepicker-config-form',
  templateUrl: './datepicker-config-form.component.html',
  styleUrls: ['./datepicker-config-form.component.scss']
})
export class DatepickerConfigFormComponent implements OnInit, OnChanges {
  @Input() exampleDatepickerConfig;
  @Output() onConfigChanged = new EventEmitter();

  configForm: FormGroup;
  displayFormatOptions: string[];
  iconSets = [{
    value: 'svg',
    label: 'Default (SVG)'
  }, {
    value: 'fontAwesome',
    label: 'Font Awesome'
  }, {
    value: 'material',
    label: 'Material Icons'
  }];
  minDateOptions: any;
  maxDateOptions: any;
  positionOptions: string[];

  constructor() { }

  ngOnInit() {
    this.displayFormatOptions = ['L', 'LL', 'DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'];
    this.minDateOptions = {
      attrs: {
        id: 'min-date',
        placeholder: 'None Set'
      },
      inputClasses: ['form-control']
    };
    this.maxDateOptions = {
      attrs: {
        id: 'max-date',
        placeholder: 'None Set'
      },
      inputClasses: ['form-control']
    };
    this.positionOptions = ['top', 'bottom'];
  }

  ngOnChanges(changes: SimpleChanges) {
    let datepickerConfig = changes['exampleDatepickerConfig'].currentValue;
    this.configForm = this.buildConfigForm(datepickerConfig);
    this.subscribeToFormChanges();
  }

  private buildConfigForm(value) {
    let configForm = new FormGroup({
      closeOnSelect: new FormControl(),
      disableDatepicker: new FormControl(),
      disableWeekends: new FormControl(),
      displayFormat: new FormControl(),
      iconSet: new FormControl('svg'),
      maxDate: new FormControl(),
      minDate: new FormControl(),
      position: new FormControl(),
      showDayQuickOptions: new FormControl(),
      showEmptyRow: new FormControl(),
      stringModelFormat: new FormControl()
    });

    configForm.patchValue(value);

    return configForm;
  }

  private subscribeToFormChanges() {
    const formChanges$ = this.configForm.valueChanges;

    formChanges$.subscribe((formData) => {
      this.onConfigChanged.emit({
        config: formData
      });
    });
  }
}
