import { Component, OnInit } from "@angular/core";
import { Utilisateur } from "src/app/classes/utilisateur";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-user",
  templateUrl: "user.component.html"
})
export class UserComponent implements OnInit {
  user:Utilisateur;
  users:Utilisateur[];
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.user=new Utilisateur();
    this.read();
  }
read()
{
  this.userService.read_Users().subscribe(data => {

    this.users = data.map(e => {
      return {
       id: e.payload.doc.id,

       nom: e.payload.doc.data()["nom"],
       email: e.payload.doc.data()["email"],
       mdp: e.payload.doc.data()["mdp"],
       adresse: e.payload.doc.data()["adresse"],
       ville: e.payload.doc.data()["ville"],
       codepostale: e.payload.doc.data()["codepostale"],
      
       telephone: e.payload.doc.data()["telephone"],
       grade: e.payload.doc.data()["grade"],



      };
    });
    console.log(this.users);

  });

}
supprimer(id)
{
if(confirm("êtes vous sûre de vouloire supprimer?"))
{
  this.userService.delete_User(id);
}


}
}
