export class Evento {
    public codigo: string;
    public nombre: string; 
    public descrip: string; 
    public imagen?: string; 
    public fecevento?: Date;
    public estado?: boolean;
    public orgaId?: string;
    public cateId?: string; 
    public invitadoId?:string;
}