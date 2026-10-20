import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DxButtonModule, DxTreeListModule } from 'devextreme-angular';
import { DxTextBoxTypes } from 'devextreme-angular/ui/text-box';
import { DxTreeListTypes } from 'devextreme-angular/ui/tree-list';

export class Employee {
  id: number | undefined;
  parentId?: number | null;
  Full_Name: string | undefined;

  Prefix: string | undefined;

  Title: string | undefined;

  City: string | undefined;

  State: string | undefined;

  Email: string | undefined;

  Skype: string | undefined;

  Mobile_Phone: string | undefined;

  Birth_Date: string | undefined;

  Hire_Date: string | undefined;

  Status: string | undefined;

}


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DxButtonModule,DxTreeListModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})


export class AppComponent {
  title = 'TestProject01';
  chooseMode: NonNullable<DxTreeListTypes.ColumnChooser['mode']> = 'select';
  // columnChooserModes: { key: DxTreeListTypes.ColumnChooser['mode'], name: string }[] = [{
  //   key: 'dragAndDrop',
  //   name: 'Drag and drop',
  // }, {
  //   key: 'select',
  //   name: 'Select',
  // }];
  // columnChooserModes[1].key:NonNullable<DxTreeListTypes.ColumnChooser['mode']> = 'select';
 
  editOnKeyPress = true;
  enterKeyAction: DxTreeListTypes.EnterKeyAction = 'moveFocus';
  enterKeyDirection: DxTreeListTypes.EnterKeyDirection = 'column';
  public employees: Employee[] = [];
  private parentIds: Set<number> = new Set();

  public componentID :string[];
  public statusesData: string[];
  mobilePhoneHeader = (cellElement: any) => {
    cellElement.innerHTML = 'Mobile phone <span style="margin-left:6px;color:#337ab7;">&#9998;</span>';
  };


    constructor() {
    this.componentID = ['','001','002'];
    this.statusesData = [
      'Not Started',
      'Need Assistance',
      'In Progress',
      'Deferred',
      'Completed',
    ];
  }

  ngOnInit() {
    this.employees = [{
    id :1,
    parentId:0,
    Full_Name: 'John Heart',
    Prefix: 'Mr.',
    Title: 'CEO',
    City: 'Los Angeles',
    State: 'California',
    Email: 'jheart@dx-email.com',
    Skype: 'jheart_DX_skype',
    Mobile_Phone: '(213) 555-9392',
    Birth_Date: '1964-03-16',
    Hire_Date: '1995-01-15',
    Status: 'Not Started'
  },
  {
    id :2,
    parentId:1,
    Full_Name: 'Marcus Orbison',
    Prefix: 'Mr.',
    Title: 'Travel Coordinator',
    City: 'Los Angeles',
    State: 'California',
    Email: 'marcuso@dx-email.com',
    Skype: 'marcuso_DX_skype',
    Mobile_Phone: '(213) 555-7098',
    Birth_Date: '1982-03-02',
    Hire_Date: '2005-05-19',
    Status: 'Not Started'
  }, {
  id :3,
  parentId:2,
    Full_Name: 'Sandy Bright',
    Prefix: 'Ms.',
    Title: 'Benefits Coordinator',
    City: 'Denver',
    State: 'Colorado',
    Email: 'sandrab@dx-email.com',
    Skype: 'sandrab_DX_skype',
    Mobile_Phone: '(818) 555-0524',
    Birth_Date: '1983-09-11',
    Hire_Date: '2005-06-04',
    Status: 'Not Started'
  }, {
  id :4,
  parentId:2,
    Full_Name: 'Morgan Kennedy',
    Prefix: 'Mrs.',
    Title: 'Graphic Designer',
    City: 'San Fernando Valley',
    State: 'California',
    Email: 'morgank@dx-email.com',
    Skype: 'morgank_DX_skype',
    Mobile_Phone: '(818) 555-8238',
    Birth_Date: '1984-07-17',
    Hire_Date: '2012-01-11',
    Status: 'Not Started'
  }, 
  {
    id :5,
      parentId:3,
    Full_Name: 'Violet Bailey',
    Prefix: 'Ms.',
    Title: 'Jr Graphic Designer',
    City: 'La Canada',
    State: 'California',
    Email: 'violetb@dx-email.com',
    Skype: 'violetb_DX_skype',
    Mobile_Phone: '(818) 555-2478',
    Birth_Date: '1985-06-10',
    Hire_Date: '2012-01-19',
    Status: 'Not Started'
  }, {
  id :6,
   parentId:3,
    Full_Name: 'Ken Samuelson',
    Prefix: 'Dr.',
    Title: 'Ombudsman',
    City: 'St. Louis',
    State: 'Missouri',
    Email: 'kents@dx-email.com',
    Skype: 'kents_DX_skype',
    Mobile_Phone: '(562) 555-9282',
    Birth_Date: '1972-09-11',
    Hire_Date: '2009-04-22',
    Status: 'Not Started'
  },
 {
  id :7,
   parentId:0,
    Full_Name: 'Samantha Bright',
    Prefix: 'Dr.',
    Title: 'COO',
    City: 'Los Angeles',
    State: 'California',
    Email: 'samanthab@dx-email.com',
    Skype: 'samanthab_DX_skype',
    Mobile_Phone: '(213) 555-2858',
    Birth_Date: '1966-05-02',
    Hire_Date: '2004-05-24',
    Status: 'Not Started'
  }, 
  {
  id :8,
   parentId:7,
    Full_Name: 'Taylor Riley',
    Prefix: 'Mr.',
    Title: 'Network Admin',
    City: 'San Jose',
    State: 'California',
    Email: 'taylorr@dx-email.com',
    Skype: 'taylorr_DX_skype',
    Mobile_Phone: '(310) 555-7276',
    Birth_Date: '1982-08-14',
    Hire_Date: '2012-04-14',
    Status: 'Not Started'
  }, 
  {
  id :9,
  parentId:7,
    Full_Name: 'Amelia Harper',
    Prefix: 'Mrs.',
    Title: 'Network Admin',
    City: 'Los Angeles',
    State: 'California',
    Email: 'ameliah@dx-email.com',
    Skype: 'ameliah_DX_skype',
    Mobile_Phone: '(213) 555-4276',
    Birth_Date: '1983-11-19',
    Hire_Date: '2011-02-10',
    Status: 'Not Started'
  }, {
  id :10,
   parentId:7,
    Full_Name: 'Wally Hobbs',
    Prefix: 'Mr.',
    Title: 'Programmer',
    City: 'Chatsworth',
    State: 'California',
    Email: 'wallyh@dx-email.com',
    Skype: 'wallyh_DX_skype',
    Mobile_Phone: '(818) 555-8872',
    Birth_Date: '1984-12-24',
    Hire_Date: '2011-02-17',
    Status: 'Not Started'
  }, 
  {
  id :11,
   parentId:7,
    Full_Name: 'Brad Jameson',
    Prefix: 'Mr.',
    Title: 'Programmer',
    City: 'San Fernando',
    State: 'California',
    Email: 'bradleyj@dx-email.com',
    Skype: 'bradleyj_DX_skype',
    Mobile_Phone: '(818) 555-4646',
    Birth_Date: '1988-10-12',
    Hire_Date: '2011-03-02',
    Status: 'Not Started'
  }, {
  id :12,
   parentId:7,
    Full_Name: 'Karen Goodson',
    Prefix: 'Miss',
    Title: 'Programmer',
    City: 'South Pasadena',
    State: 'California',
    Email: 'kareng@dx-email.com',
    Skype: 'kareng_DX_skype',
    Mobile_Phone: '(626) 555-0908',
    Birth_Date: '1987-04-26',
    Hire_Date: '2011-03-14',
    Status: 'Not Started'
  },
  {
  id :13,
   parentId:0,
    Full_Name: 'Arthur Miller',
    Prefix: 'Mr.',
    Title: 'CTO',
    City: 'Denver',
    State: 'Colorado',
    Email: 'arthurm@dx-email.com',
    Skype: 'arthurm_DX_skype',
    Mobile_Phone: '(310) 555-8583',
    Birth_Date: '1972-07-11',
    Hire_Date: '2007-12-18',
    Status: 'Not Started'
  },
  {
    id :14,
    parentId:0,
    Full_Name: 'Olivia Turner',
    Prefix: 'Ms.',
    Title: 'CFO',
    City: 'New York',
    State: 'New York',
    Email: 'oliviat@dx-email.com',
    Skype: 'oliviat_DX_skype',
    Mobile_Phone: '(212) 555-3412',
    Birth_Date: '1978-06-21',
    Hire_Date: '2010-09-01',
    Status: 'Not Started'
  }
];
    this.parentIds = new Set(
      this.employees.filter(e => e.parentId !== 0).map(e => e.parentId!)
    );
  }






  setStatusValue = (newData: any, value: any) => {
    newData.Status = value;
    newData.State = value;
    this.updateDescendantsState(newData.id, value);
  };

  private updateDescendantsState(parentId: number, state: string) {
    this.employees
      .filter(e => e.parentId === parentId)
      .forEach(child => {
        child.State = state;
        this.updateDescendantsState(child.id!, state);
      });
  }

  onStatusSaved(e: any) {
    e.component.refresh();
  }

  onEditorPreparing(e: any) {
    // Status 列：父节点不可编辑（显示为文本），叶子节点可编辑（下拉菜单）
    if (e.dataField === 'Status' && e.row && this.parentIds.has(e.row.data.id)) {
      e.cancel = true;
    }
  }

  onFocusedCellChanging(e: any) {
    e.isHighlighted = true;
  }

  helloWorld() {
    alert('Hello DevExtreme!');
  }
}
