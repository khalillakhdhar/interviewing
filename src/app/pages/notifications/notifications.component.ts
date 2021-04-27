import { Component, OnInit } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import { Utilisateur } from "src/app/classes/utilisateur";
import { ProduitService } from "src/app/services/produit.service";
import { UserService } from "src/app/services/user.service";
import { Produit } from '../../classes/produit';
import { AngularFireStorage } from "@angular/fire/storage";
import { map, finalize } from "rxjs/operators";
import { Observable } from "rxjs";
@Component({
  selector: "app-notifications",
  templateUrl: "notifications.component.html"
})
export class NotificationsComponent implements OnInit {
  id:string;
grade:string;
downloadURL: Observable<string>;
selectedFile: File = null;
fb = "";
produit:Produit;
produits:Produit[];
constructor(private produitService:ProduitService,private storage: AngularFireStorage) { }

ngOnInit(): void {
  this.produit=new Produit();
  this.id=localStorage.getItem("id");
  this.read();
}
onFileSelected(event) {
  var n = Date.now();
  const file = event.target.files[0];
  const filePath = `/Products/${n}`;
  const fileRef = this.storage.ref(filePath);
  const task = this.storage.upload(`/Products/${n}`, file);
  task
    .snapshotChanges()
    .pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe((url) => {
          if (url) {
            this.fb = url;
          }
          console.log(this.fb);
        });
      })
    )
    .subscribe((url) => {
      if (url) {
        console.log(url);
      }
    });
}
read()
{
this.produitService.read_Produits().subscribe(data => {

  this.produits = data.map(e => {
    return {
      id: e.payload.doc.id,

       titre: e.payload.doc.data()["titre"],
       prix: e.payload.doc.data()["prix"],
       photo: e.payload.doc.data()["photo"],
       categorie: e.payload.doc.data()["categorie"],
       quantite_totale: e.payload.doc.data()["quantite_totale"],
       description: e.payload.doc.data()["description"],
      
      

    };
  });


  console.log("liste",this.produits);

});



}
add()
{
  this.produit.photo = this.fb;

  let pr=Object.assign({},this.produits);
this.produitService.create_NewProduit(pr);
alert("added successfully");


}
}
