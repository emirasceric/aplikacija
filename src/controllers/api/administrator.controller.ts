import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { Administrator } from "entities/Administrator";
import { AddAdministratorDto } from "src/dtos/administrator/add.administrator.dto";
import { editAdministratorDto } from "src/dtos/administrator/edit.administrator.dto";
import { AdministratorService } from "src/services/administrator/administrator.service";
import { threadId } from "worker_threads";

@Controller("api/administrator")
export class AdministratorController {
    constructor(
        private administratorService: AdministratorService
    ) { }

    // GET http://localhost:3000/api/administrator/
    @Get() 
    getAll(): Promise<Administrator[]>{
        return this.administratorService.getAll();
          
    }
    // GET http://localhost:3000/api/administrator/4/
    @Get(":id") 
    getById( @Param ("id") administratorId): Promise<Administrator>{
        return this.administratorService.getById(administratorId);


}
    //PUT http://localhost:3000/api/administrator/
    // ovdje dolazi do upotrebe DTO objekata
    // data je DTO
    //Servis je taj koji ce transformisati da data user name i pasword budu password hash
    // u entitu administrator koji ce poslati save metotodom u repozitorijum
    // i vtratit ce nazad promise sa podacima
    @Post()
    add( @Body() data:AddAdministratorDto ): Promise<Administrator> {
        return this.administratorService.add(data);
        
    }

    // put metod nam sluzi za editovanje 
    // post metod za dodavanje novog administratora

    // POST http://localhost:3000/api/administrator/4/
@Put(":id")
edit(@Param("id") id, @Body() data: editAdministratorDto ): Promise<Administrator> {
    return this.administratorService.editById(id, data); 
    
}
}

