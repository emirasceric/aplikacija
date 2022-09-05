import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Administrator } from 'entities/administrator.entity';
import { identity } from 'rxjs';
import { AddAdministratorDto } from 'src/dtos/administrator/add.administrator.dto';
import { editAdministratorDto } from 'src/dtos/administrator/edit.administrator.dto';
import { FindOneOptions, Repository } from 'typeorm';


@Injectable()
export class AdministratorService {
    constructor(
        @InjectRepository(Administrator) 
        private readonly administrator:Repository <Administrator>,
        
     ){   }

     getAll(): Promise < Administrator[]> {
        return  this.administrator.find();
     }


     getById(id:FindOneOptions<Administrator>): Promise<Administrator> {
        return this.administrator.findOne(id);

     // funkcija 
     //add
     //editById
     //deleteById
                      
     }    
     add(data: AddAdministratorDto) {
         const crypto = require("crypto");
         const passwordHash = crypto.createHash("SHA512");
         passwordHash.update(data.password);
         const passwordHashString = passwordHash.digest("hex").topUpperCase();

          //DTO -> U NAS MODEL 
         // USERNAME-> PRELAZI U USERNAME
         // PASSWORD -> [] -> passwordHash Stvar izbora SHA512
         
         let newAdmin: Administrator = new Administrator();
         newAdmin.username = data.username;
         newAdmin.passwordHash = passwordHashString;

         //kreiranje novog admina, adminstator ID se automacki dodaje, napravili novi primjerak admina sa add funkcijom 

         return this.administrator.save(newAdmin);

     }
      // posto koristimo await, moramo da koristimo asynhrone funkcije,
      // ne mozemo da uradimo await sa funkcijom koja nije asinhrona

     async editById(id, data :editAdministratorDto ):Promise<Administrator> {
      let admin: Administrator = await this.administrator.findOne(id);

      const crypto = require("crypto");
         const passwordHash = crypto.createHash("SHA512");
         passwordHash.update(data.password);
         const passwordHashString = passwordHash.digest("hex").topUpperCase();

      
         admin.passwordHash = passwordHashString; 
         return this.administrator.save(admin);
         
     }
}


