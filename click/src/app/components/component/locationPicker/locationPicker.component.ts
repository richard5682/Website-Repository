import { Component, OnInit, Output } from '@angular/core';
import { Address } from 'src/app/data/dataType';

interface City{
  province:string;
  cities:string[];
}
interface Barangay{
  cities:string;
  barangay:string[];
}

@Component({
  selector: 'app-locationPicker',
  templateUrl: './locationPicker.component.html',
  styleUrls: ['./locationPicker.component.scss']
})
export class LocationPickerComponent implements OnInit {
  picked_province!:string;
  picked_city!:string;
  picked_barangay!:string;
  street!:string;
  houseno!:string;
  Province:string[] = [
    'Metro-Manila'
  ];
  City:City[] = [
    {province:'Metro-Manila',cities:[
      'Caloocan',
      'Las Piñas',
      'Makati','Malabon','Mandaluyong','Manila','Marikina','Muntinlupa',
      'Navotas',
      'Parañaque','Pasay','Pasig',
      'Quezon City','San Juan','Taguig','Valenzuela'
    ]}
  ];
  caloocanbrgy = new Array<string>();
  Barangay:Barangay[] = [
    {cities:'Las Piñas',barangay:[
      'Almanza Dos','Almanza Uno','B. F. International Village','Daniel Fajardo','Elias Aldana',
      'Ilaya','Manuyo Dos','Manuyo Uno','Pamplona Dos'
    ]},
    {cities: 'Taguig',barangay:['Bagumbayan','Bambang','Calzada','Hagonoy','Ibayo-Tipas','Ligid-Tipas','Lower Bicutan',
                                  'New Lower Bicutan','Central Bicutan','Upper Bicutan','Western Bicutan','Napindan',
                                  'Palingon','San Miguel','Sta. Ana','Tuktukan','Ususan','Wawa','Fort Bonifacio',
                                  'Katuparan','Maharlika Village','North Daang Hari','South Daang Hari','Tanyag',
                                  'Central Signal Village','North Signal Village','South Signal Village']},
    {cities: 'Makati',barangay:['Bangkal','Bel-Air','Carmona','Cembo','Comembo','Dasmariñas','East Rembo','West Rembo',
                                  'Forbes Park','Guadalupe Nuevo','Guadalupe Viejo','Kasilawan','La Paz','Magallanes',
                                  'Olympia','Palanan','Pembo','Pinagkaisahan','Pio Del Pilar','Pitogo','Poblacion',
                                  'Post Proper Northside','Post Proper Southside','Rizal','San Antonio','San Isidro',
                                  'San Lorenzo','Santa Cruz','Singkamas','South Cembo','Tejeros','Urdaneta','Valenzuela']},
    {cities: 'Pasig',barangay:['Bagong Ilog','Bagong Katipunan','Bambang','Buting','Caniogan','Kalawaan','Kapasigan',
                                  'Kapitolyo','Malinao','Oranbo','Palatiw','Pineda','Sagad','San Antonio','San Joaquin',
                                  'San Jose','San Nicolas','Sta. Cruz','Sta. Rosa','Sto. Tomas','Sumilang','Ugong',
                                  'Dela Paz','Manggahan','Maybunga','Pinagbuhatan','Rosario','San Miguel','Santolan',
                                  'Sta. Lucia']},
    {cities: 'Parañaque',barangay:['Baclaran','Don Galo','La Huerta','San Dionisio','San Isidro','Sto. Niño','Tambo',
                                  'Vitalez','B.F. Homes','Don Bosco','Marcelo Green','Merville','Moonwalk','San Antonio',
                                  'San Martin De Porres','Sun Valley']},
    {cities: 'Pateros',barangay:['Aguho','Magtanggol','Martires del 96','Poblacion','San Pedro','San Roque','Santa Ana',
                                  'Santo Rosario-Kanluran','Santo Rosario-Silangan','Tabacalera']},
                                  {cities: 'San Juan',barangay:['Balong-Bato','Batis','Corazon de Jesus','Ermitaño','Pasadeña','Pedro Cruz','Progreso',
                                  'Rivera','Salapan','San Perfecto','Addition Hills','Greenhills','Isabelita','Kabayanan',
                                  'Little Baguio','Maytunas','Onse','Saint Joseph (Halo-halo)','Santa Lucia','Tibagan',
                                  'West Crame']},
    
    {cities: 'Marikina',barangay:['Barangka','Calumpang','Concepcion Dos','Concepcion Uno','Fortune','Industrial Valley Complex',
                                  'Jesus Dela Peña','Malanday','Marikina Heights','Nangka','Parang','San Roque','Sta. Elena',
                                  'Santo Niño','Tañong','Tumana']},
    
    {cities: 'Mandaluyong',barangay:['Addition Hills','Bagong Silang','Barangka Drive','Barangka Ibaba','Barangka Ilaya',
                                    'Barangka Itaas','Buayang Bato','Burol','Daang Bakal','Hagdang Bato Itaas','Hagdang Bato Libis',
                                    'Harapin Ang Bukas','Highway Hills','Hulo','Mabini-J. Rizal','Malamig','Mauway','Namayan',
                                    'New Zaniga','Old Zaniga','Pag-Asa','Plainview','Pleasant Hills','Poblacion','San Jose','Vergara',
                                    'Wack-Wack-Greenhills East']},
    
    {cities: 'Las Piñas',barangay:['Almanza Dos','Almanza Uno','B.F. International Village','Daniel Fajardo','Elias Aldana','Ilaya',
                                   'Manuyo Dos','Manuyo Uno','Pamplona Uno','Pamplona Dos','Pamplona Tres','Pilar','Pulang Lupa Uno',
                                   'Pulang Lupa Dos','Talon Uno','Talon Dos','Talon Tres','Talon Kuatro','Talon Singko','Zapote']},
    
    {cities: 'Malabon',barangay:['Baritan','Bayan-bayanan','Concepcion','Dampalit','Hulong Duhat','Flores','Ibaba','Maysilo',
                                 'Panghulo','Santolan','San Agustin','Tañong','Tonsuya','Niugan','Longos','Tinajeros','Catmon',
                                 'Potrero','Acacia','Muzon','Tugatog']},
    
    {cities: 'Navotas',barangay:['Bagumbayan North','Bagumbayan South','Bangculasi','Daanghari','Navotas East','Navotas West',
                                 'North Bay Blvd., North','North Bay Blvd,. South','San Jose','San Rafael Village','San Roque',
                                 'Sipac-Almacen','Tangos','Tanza']},
    
    {cities: 'Valenzuela',barangay:['Arkong Bato','Bagbaguin','Bignay','Bisig','Canumay East','Canumay West','Coloong','Dalandanan',
                                    'Gen. T. de Leon','Isla','Karuhatan','Lawang Bato','Lingunan','Mabolo','Malanday','Malinta',
                                    'Mapulang Lupa','Marulas','Maysan','Palasan','Parada','Pariancillo Villa','Paso de Blas',
                                    'Pasolo','Poblacion','Pulo','Punturin','Rincon','Tagalag','Ugong','Viente Reales','Wawang Pulo']},
    
    {cities: 'Quezon City',barangay:['Alicia','Amihan','Apolonio Samson','Aurora','Baesa','Bagbag','Bagong Lipunan ng Crame',
                                     'Bagong Pag-asa','Bagong Silangan','Bagumbayan','Bagumbuhay','Bahay Toro','Balingasa',
                                     'Balong Bato','Batasan Hills','Bayanihan','Blue Ridge A','Blue Ridge B','Botocan','Bungad',
                                     'Camp Aguinaldo','Capri','Central','Claro','Commonwealth','Culiat','Damar','Damayan',
                                     'Damayang Lagi','Del Monte','Dioquino Zobel','Don Manuel','Doña Imelda','Doña Josefa',
                                     'Duyan-duyan','E. Rodriguez','East Kamias','Escopa I','Escopa II','Escopa III','Escopa IV',
                                     'Fairview','Greater Lagro','Gulod','Holy Spirit','Horseshoe','Immaculate Concepcion',
                                     'Kaligayahan','Kalusugan','Kamuning','Katipunan','Kaunlaran','Kristong Hari','Krus na Ligas',
                                     'Laging Handa','Libis','Lourdes','Loyola Heights','Maharlika','Malaya','Mangga','Manresa',
                                     'Mariana','Mariblo','Marilag','Masagana','Masambong','Matandang Balara','Milagrosa',
                                     'N.S. Amoranto','Nagkaisang Nayon','Nayong Kaunlaran','New Era','North Fairview',
                                     'Novaliches Proper','Obrero','Old Capitol Site','Paang Bundok','Pag-ibig sa Nayon',
                                     'Paligsahan','Paltok','Pansol','Paraiso','Pasong Putik Proper','Pasong Tamo','Payatas',
                                     'Phil-Am','Pinagkaisahan','Pinyahan','Project 6','Quirino 2-A','Quirino 2-B','Quirino 2-C',
                                     'Quirino 3-A','Ramon Magsaysay','Roxas','Sacred Heart','Saint Ignatius','Saint Peter',
                                     'Salvacion','San Agustin','San Antonio','San Bartolome','San Isidro','San Isidro Labrador',
                                     'San Jose','San Martin de Porres','San Roque','San Vicente','Sangandaan','Santa Cruz',
                                     'Santa Lucia','Santa Monica','Santa Teresita','Santo Cristo','Santo Domingo','Santo Niño',
                                     'Santol','Sauyo','Sienna','Socorro','South Triangle','Tagumpay','Talayan','Talipapa',
                                     'Tandang Sora','Tatalon','Teachers Village East','Teachers Village West','U.P. Campus',
                                     'U.P. Village','Ugong Norte','Unang Sigaw','Valencia','Vasra','Veterans Villages',
                                     'Villa Maria Clara','West Kamias','West Triangle','White Plains']},
    
    {cities: 'Manila',barangay:['Binondo','Ermita','Intramuros','Malate','Paco','Pandacan','Port Area','Quiapo','Sampaloc',
                                'San Andres','San Miguel','San Nicolas','Sta. Ana','Sta. Cruz','Sta. Mesa','Tondo']},
    
    {cities: 'Pasay',barangay:['Apelo Cruz','Baclaran','Baltao','Bay City','Cabrera','Cartimar','Cuyegkeng',
                                    'Don Carlos Village','Edang','F.B. Harrison','Juan Sumulong','Kalayaan','Leveriza',
                                    'Libertad','Malibay','Manila Bay Reclamation','Marcelo Marcelo','Maricaban','M. Dela Cruz',
                                    'Newport City','Nichols','Padre Burgos','Pasay Rotonda','PICC','Pildera I','Pildera II',
                                    'Rivera Village','San Pablo','San Isidro','San Jose','San Rafael','San Roque','Santa Clara',
                                    'Santo Niño','Tramo','Tripa de Gallina','Ventanilla','Villamor Air Base']},
    
    {cities: 'Muntinlupa',barangay:['Alabang','Bayanan','Buli','Cupang','New Alabang Village','Poblacion','Putatan','Sucat',
                                    'Tunasan']},
    
    {cities: 'South Caloocan',barangay:['Sangandaan','Dagat-dagatan(Kaunlaran)','Poblacion','Sampalukan','Maypajo','Marulas',
                                  'Grace Park West','Grace Park East','Barrio San Jose','Barrio Galino','Our Lady of Grace',
                                  'Barrio Rodriguez','Balintawak','Calaanan East','Bagong Barrio','Morning Breeze','Calaanan West',
                                  'Bonifacio',]},
    
    {cities: 'North Caloocan',barangay:['Bagong Silang','Tala','Amparo','Camarin','Deparo','Llano','Kaybiga','Bagbaguin','Bagumbong',]}

  ];
  
  constructor() { }
  getCity():string[]{
    var buffer!:string[];
    this.City.forEach(val=>{
      if(val.province == this.picked_province){
        buffer = val.cities;
      }
    })
    return buffer;
  }
  getValue():Address{
    return {
      province:this.picked_province,
      city:this.picked_city,
      brgy:this.picked_barangay,
      street:this.street,
      houseno:this.houseno
    }
  }
  getString():string{
    if(this.picked_province!=undefined && this.picked_city != undefined && this.picked_barangay != undefined && this.street != undefined && this.houseno != undefined){
      if(this.picked_province!='' && this.picked_city != '' && this.picked_barangay != '' && this.street != '' && this.houseno != ''){
        return this.picked_province+","+this.picked_city+","+this.picked_barangay+","+this.street+","+this.houseno;
      }else{
        return 'INCOMPLETE!';
      }
      
    }else{
      return 'NOT SET';
    }
  }
  validate():boolean{
    if(this.picked_province!=undefined && this.picked_city != undefined && this.picked_barangay != undefined && this.street != undefined && this.houseno != undefined){
      if(this.picked_province!='' && this.picked_city != '' && this.picked_barangay != '' && this.street != '' && this.houseno != ''){
        return true;
      }else{
        return false;
      }
      
    }else{
      return false;
    }
  }
  getBarangay():string[]{
    var buffer!:string[];
    this.Barangay.forEach(val=>{
      if(val.cities == this.picked_city){
        buffer = val.barangay;
      }
    })
    return buffer;
  }
  ngOnInit() {
    for(var i=1;i<=188;i++){
      this.caloocanbrgy.push('Barangay '+i);
    }
    this.Barangay.push({cities:'Caloocan',barangay:this.caloocanbrgy});
  }
  streetchange(val:string){
    this.street = val;
  }
  housenochange(val:string){
    this.houseno = val;
  }
}
