import {Compte} from './compte';

export interface Recharge {
      id ?: number;
      compte: Compte;
      operateur: string;
      montant: string;
      dateDeRecharge: Date;
      numeroTelephone: string;
    }


