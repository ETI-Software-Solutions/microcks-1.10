/*
 * Copyright The Microcks Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ImportJob } from '../models/importer.model';


@Injectable({ providedIn: 'root' })
export class ImportersService {

  constructor(private http: HttpClient) { }

  getImportJobs(page: number = 1, pageSize: number = 20): Observable<ImportJob[]> {
    const options = { params: new HttpParams().set('page', String(page - 1)).set('size', String(pageSize)) };
    return this.http.get<ImportJob[]>(ENDPOINTS.IMPORT_JOB(), options);
  }

  filterImportJobs(labelsFilter: Map<string, string>, nameFilter: string): Observable<ImportJob[]> {
    let httpParams: HttpParams = new HttpParams();
    if (nameFilter != null) {
      httpParams = httpParams.set('name', nameFilter);
    }
    if (labelsFilter != null) {
      for (const key of Array.from( labelsFilter.keys() )) {
        httpParams = httpParams.set('labels.' + key, labelsFilter.get(key));
      }
    }

    const options = { params: httpParams };
    return this.http.get<ImportJob[]>(this.rootUrl + '/jobs/search', options);
  }

  countImportJobs(): Observable<any> {
    return this.http.get<any>(ENDPOINTS.JOB_COUNT());
  }

  createImportJob(job: ImportJob): Observable<ImportJob> {
    return this.http.post<ImportJob>(ENDPOINTS.IMPORT_JOB(), job);
  }

  updateImportJob(job: ImportJob): Observable<ImportJob> {
    return this.http.post<ImportJob>(ENDPOINTS.IMPORT_JOB() + '/' + job.id, job);
  }

  deleteImportJob(job: ImportJob): Observable<ImportJob> {
    return this.http.delete<ImportJob>(ENDPOINTS.IMPORT_JOB() + '/' + job.id);
  }

  activateImportJob(job: ImportJob): Observable<ImportJob> {
    return this.http.put<ImportJob>(ENDPOINTS.IMPORT_JOB() + '/' + job.id + '/activate', job);
  }

  startImportJob(job: ImportJob): Observable<ImportJob> {
    return this.http.put<ImportJob>(ENDPOINTS.IMPORT_JOB() + '/' + job.id + '/start', job);
  }

  stopImportJob(job: ImportJob): Observable<ImportJob> {
    return this.http.put<ImportJob>(ENDPOINTS.IMPORT_JOB() + '/' + job.id + '/stop', job);
  }
}
