import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: any;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    app.ngOnInit();
  });

  // ============ 基础生命周期 ============
  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have the 'TestProject01' title`, () => {
    expect(app.title).toEqual('TestProject01');
  });

  // ============ 数据初始化 ============
  it('should initialize employees with 14 items', () => {
    expect(app.employees.length).toBe(14);
  });

  it('should have 4 root nodes (parentId = 0)', () => {
    const roots = app.employees.filter((e: any) => e.parentId === 0);
    expect(roots.length).toBe(4);
  });

  it('should include CEO, COO, CTO, CFO as root titles', () => {
    const rootTitles = app.employees
      .filter((e: any) => e.parentId === 0)
      .map((e: any) => e.Title);
    expect(rootTitles).toContain('CEO');
    expect(rootTitles).toContain('COO');
    expect(rootTitles).toContain('CTO');
    expect(rootTitles).toContain('CFO');
  });

  it('should have all unique ids', () => {
    const ids = app.employees.map((e: any) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  // ============ 状态数据 ============
  it('should have 5 statuses', () => {
    expect(app.statusesData.length).toBe(5);
    expect(app.statusesData).toEqual([
      'Not Started',
      'Need Assistance',
      'In Progress',
      'Deferred',
      'Completed',
    ]);
  });

  it('should initialize componentID with 3 values', () => {
    expect(app.componentID).toEqual(['', '001', '002']);
  });

  it('should initialize all employees with Status "Not Started"', () => {
    app.employees.forEach((e: any) => {
      expect(e.Status).toBe('Not Started');
    });
  });

  // ============ setStatusValue：自身同步 ============
  it('should update Status and State on the same node', () => {
    const newData = { id: 4, Status: '', State: '' };
    app.setStatusValue(newData, 'Completed');
    expect(newData.Status).toBe('Completed');
    expect(newData.State).toBe('Completed');
  });

  // ============ setStatusValue：递归更新所有子节点 State ============
  it('should update State of all descendants when parent Status changes', () => {
    // id 1 (CEO) 有子孙：2,3,4,5,6
    const newData = { id: 1, Status: '', State: '' };
    app.setStatusValue(newData, 'In Progress');

    // 子孙的 State 都应为 'In Progress'
    [2, 3, 4, 5, 6].forEach((id) => {
      const emp = app.employees.find((e: any) => e.id === id);
      expect(emp!.State).toBe('In Progress');
    });
  });

  it('should NOT affect other branches when a node Status changes', () => {
    // 修改 id 1 (CEO 分支)，id 8 (COO 分支) 不受影响
    const newData = { id: 1, Status: '', State: '' };
    app.setStatusValue(newData, 'Completed');

    const cooChild = app.employees.find((e: any) => e.id === 8);
    expect(cooChild!.State).toBe('California'); // 原始 State 未变
  });

  it('should update multi-level descendants recursively', () => {
    // id 2 有子节点 3,4，id 3 又有子节点 5,6 → 三层结构
    const newData = { id: 2, Status: '', State: '' };
    app.setStatusValue(newData, 'Deferred');

    [3, 4, 5, 6].forEach((id) => {
      const emp = app.employees.find((e: any) => e.id === id);
      expect(emp!.State).toBe('Deferred');
    });
  });

  it('should do nothing for a leaf node (no descendants)', () => {
    const newData = { id: 12, Status: '', State: '' };
    app.setStatusValue(newData, 'Completed');

    expect(newData.Status).toBe('Completed');
    expect(newData.State).toBe('Completed');
    // 无子节点，不影响其他节点
  });

  // ============ onEditorPreparing：叶子可编辑，父节点不可编辑 ============
  it('should cancel Status editing for a parent node', () => {
    const e: any = {
      dataField: 'Status',
      row: { data: { id: 1 } }, // id 1 是父节点
      cancel: false,
    };
    app.onEditorPreparing(e);
    expect(e.cancel).toBe(true);
  });

  it('should NOT cancel Status editing for a leaf node', () => {
    const e: any = {
      dataField: 'Status',
      row: { data: { id: 4 } }, // id 4 是叶子节点
      cancel: false,
    };
    app.onEditorPreparing(e);
    expect(e.cancel).toBe(false);
  });

  it('should NOT cancel editing for other columns', () => {
    const e: any = {
      dataField: 'Mobile_Phone',
      row: { data: { id: 1 } },
      cancel: false,
    };
    app.onEditorPreparing(e);
    expect(e.cancel).toBe(false);
  });

  // ============ onStatusSaved ============
  it('should call component.refresh() on save', () => {
    const refreshSpy = jasmine.createSpy('refresh');
    const e: any = { component: { refresh: refreshSpy } };
    app.onStatusSaved(e);
    expect(refreshSpy).toHaveBeenCalled();
  });

  // ============ onFocusedCellChanging ============
  it('should set isHighlighted to true', () => {
    const e: any = { isHighlighted: false };
    app.onFocusedCellChanging(e);
    expect(e.isHighlighted).toBe(true);
  });

  // ============ 表头模板 ============
  it('should render Mobile phone header with pencil icon', () => {
    const cellElement = { innerHTML: '' };
    app.mobilePhoneHeader(cellElement);
    expect(cellElement.innerHTML).toContain('Mobile phone');
    expect(cellElement.innerHTML).toContain('9998'); // 铅笔字符 &#9998;
  });
});
