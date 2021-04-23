import { Component, OnInit } from "@angular/core";
import { Categorie } from '../../classes/categorie';
import { CategorieService } from '../../services/categorie.service';

declare const google: any;

interface Marker {
lat: number;
lng: number;
label?: string;
draggable?: boolean;
}

@Component({
  selector: "app-map",
  templateUrl: "map.component.html"
})
export class MapComponent implements OnInit {
  categorie:Categorie;
  categories:Categorie[];
  constructor(private cateogrieService:CategorieService) { }

  ngOnInit() {
this.categorie=new Categorie();
      this.read();
  }
  read()
{
  this.cateogrieService.read_Categories().subscribe(data => {

    this.categories = data.map(e => {
      return {
       id: e.payload.doc.id,

      
       titre: e.payload.doc.data()["titre"],
       description: e.payload.doc.data()["description"],



      };
    });
    console.log(this.categories);

  });

}
save()
{
  let cat=Object.assign({},this.categorie);
  this.cateogrieService.create_NewUser(cat);
  alert("ajouté avec succés");
}
delete(id)
{
  if(confirm("vous voulez supprimer cette catégorie?"))
  this.cateogrieService.delete_User(id);
}

}
