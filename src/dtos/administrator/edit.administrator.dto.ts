// editovanje administratora
//moze  da se desi da dozvolimo administratoru da  mijenja lozinku prezime ime email ali ne i username,
// u takvim situacijama pravimo poseban data transefer objekat
// prilikom editovanja dopustamo da administrator mijenja samo password

export class editAdministratorDto{
    password: string;
}