export interface Compte {
  numeroCompte?: string;
  intitule: string;
  solde: number;
  dateOperation: string;
  derniereOperation: Date;
  statut: string;
  dateCreation: Date;
}
