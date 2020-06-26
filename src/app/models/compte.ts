export interface Compte {
  numeroCompte?: string;
  intitule: string;
  solde: number;
  dateOperation: string;
  dernierOperation: Date;
  statut: string;
  oldStatut: string;
  dateCreation: Date;
}
