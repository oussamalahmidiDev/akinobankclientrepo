// import{uuid}from'../util/uuid';

import {Compte} from './compte';
import {Agence} from './agence';
import {Demande} from './demande';

export interface User {
  id?: number;
  email: string;
  nom: string;
  prenom: string;
  comptes?: Compte[];
  photo?: string;
  numeroTelephone?: string;
  agence: Agence;
  demande: Demande;
}


// {
//   "email": "oussama.lahmidi@icloud.com",
//   "emailConfirmed": false,
//   "nom": "ll",
//   "prenom": "Sara",
//   "role": "CLIENT",
//   "dateDeCreation": "2020-04-22T17:21:25.000+0000",
//   "dateUpdate": "2020-04-26T18:07:20.000+0000",
//   "id": 31,
//   "agent": {
//     "email": "khalilios@gmail.com",
//     "emailConfirmed": false,
//     "nom": "testos",
//     "prenom": "ttt",
//     "role": "AGENT",
//     "dateDeCreation": "2020-04-24T16:29:24.000+0000",
//     "dateUpdate": "2020-04-24T16:29:24.000+0000",
//     "id": 31
//   },
//   "agence": {
//     "id": 31,
//     "dateDeCreation": "2020-04-22T18:08:20.000+0000",
//     "dateUpdate": "2020-04-22T18:08:20.000+0000",
//     "libelleAgence": "Agence de kech",
//     "ville": {
//       "id": 103,
//       "nom": "Marrakech"
//     }
//   },
//   "comptes": [
//     {
//       "numeroCompte": "********2364",
//       "solde": 600.0,
//       "intitule": "Mme. Lorem Ipsum",
//       "statut": "ACTIVE",
//       "dateDeCreation": "2020-05-08T08:07:13.000+0000",
//       "dateUpdate": "2020-05-08T08:07:13.000+0000",
//       "virements": [],
//       "recharges": []
//     }
//   ]
// }
