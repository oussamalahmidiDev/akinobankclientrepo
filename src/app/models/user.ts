// import{uuid}from'../util/uuid';

import { Compte } from "./compte";
import { Agence } from "./agence";
import { Demande } from "./demande";

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

  _2FaEnabled: boolean;
}
