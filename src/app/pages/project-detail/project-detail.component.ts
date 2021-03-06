import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Project, Thing, ProjectService, ThingService } from '../../shared/backend';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  public project: Project;
  public things$: Observable<Thing[]>;
  public editorOptions = {
    lineNumbers: 'on',
    theme: 'vs-dark',
    language: 'python'
  };

  constructor(
    private pService: ProjectService,
    private tService: ThingService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.pService.show(params.get('id')))
    ).subscribe(
      (p: Project) => this.project = p
    );
    this.refresh();
  }

  public refresh(): void {
    this.things$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.tService.list(params.get('id')))
    );
  }

  public thingRemove(pid: string, tid: string): void {
    this.tService.remove(pid, tid).subscribe(() => this.refresh());
  }

}
