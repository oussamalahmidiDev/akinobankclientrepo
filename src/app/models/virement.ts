import { Compte } from "./compte";

export interface Virement {
  id?: number;
  compte: Compte;
  destCompte: Compte;
  montant: string;
  dateDeVirement: Date;
  statut: string;

  isSent?: boolean;
}
