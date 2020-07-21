import { Project } from './models/project';
import { TokenStorageService } from './token-storage.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'content-type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient,  private tokenStorage:TokenStorageService) { }
  URL1 = 'http://localhost:9000/api/project/';
  URL2 = 'http://localhost:9000/userStory/';
  URL3 = 'http://localhost:9000/taches/';
  URL4 = 'http://localhost:9000/sprints/';


  userConnecter = this.tokenStorage.getUser();
  usernameConnecter = this.userConnecter.username;

  getProjectById(id) : Observable<any>{
    return this.http.get(`${this.URL1}` + 'project' + '/' + `${id}`, httpOptions )
  }

  getProjects(): Observable<any>{
    return this.http.get(`${this.URL1}` + 'getAllProjects' + '/'+ this.usernameConnecter)
  }

  addProject(project: Project): Observable<any>{
    return this.http.post(`${this.URL1}` + 'add-project' + '/' + this.usernameConnecter, project)
  }
  addUserStory(userStory, idProject) : Observable<any>{
    userStory = {description:userStory}
    return this.http.post(`${this.URL2}` + 'addUserStory' + '/' + idProject, userStory)
  }
  addTasks (id, task): Observable<any>{
    task = {title :task.task,
            content : "i dont know",
            state : "todo",
    }
    return this.http.post(`${this.URL3}` + 'add' + '/' + id , task, httpOptions)
  }
  getNonTakenTasks(id) : Observable<any>{
    return this.http.get(`${this.URL3}` + 'nonTakenTasks' + '/' + `${id}`, httpOptions )
  }
  // Sprint
  createSprint(form) : Observable<any>{
    let sprint = {
      name: form.name,
      description : form.description,
      current : false
    }
    return this.http.post(`${this.URL4}`+ 'addSprint', sprint, httpOptions)
  }
  addTaskToSprint(id , idTask): Observable<any>{
    return this.http.get(`${this.URL4}` + 'addTaskToSprint' + '/' + `${id}` + '/' + `${idTask}` , httpOptions )
  }
  getAllSprints(id): Observable<any>{
    return this.http.get(`${this.URL4}` + 'getSprintsByProject' + '/' + `${id}` , httpOptions )
  }
  deleteSprint (id): Observable<any>{
    return this.http.get(`${this.URL4}` + 'deleteSprint' + '/' + `${id}` , httpOptions)
  }
}
