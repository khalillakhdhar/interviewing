import { Component, OnInit } from "@angular/core";
import { Utilisateur } from "src/app/classes/utilisateur";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-icons",
  templateUrl: "icons.component.html"
})
export class IconsComponent implements OnInit {
  id:string;
grade:string;

user:Utilisateur;
users:Utilisateur[];
constructor(private userService:UserService) { }

ngOnInit(): void {
  this.user=new Utilisateur();
  this.id=localStorage.getItem("id");
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
  for (let u of this.users)
{
if((u.id==this.id))
{
this.user=u;

}
console.log("user",this.user);


}

  console.log("liste",this.users);

});



}
update()
{
  let us=Object.assign({},this.user);
this.userService.update_User(this.id,us);
alert("updated successfully");


}
}
