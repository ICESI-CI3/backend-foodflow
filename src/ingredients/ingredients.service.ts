/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { Ingredient } from './entities/ingredient.entity';
import { v4 as UUID } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import  {Repository } from 'typeorm';
import { Location } from '../location/entities/location.entity'
@Injectable()
export class IngredientsService {

  constructor(

    @InjectRepository(Ingredient) private ingrRepo: Repository<Ingredient>,
    @InjectRepository(Location) private locationRepo : Repository<Location>

  ){}

  async findAll() {

    this.findAllLocation();
    
    const ingredients = await this.ingrRepo.find({relations: ["productToIngredient", "location"]})

    if (ingredients.length === 0) {

      throw new NotFoundException('No hay ingredientes creados');

    } 

    return ingredients;

  }

  async findOneById(id: any) {

    this.findAllLocation()

    this.findAll()
    
    const ingredient = this.ingrRepo.findOne({where: {id: id}, relations: ["productToIngredient", "location"]})

    if (!ingredient) {

      throw new NotFoundException(`Ingrediente con ID "${id}" no encontrado`);

    }

    return ingredient;

  }

  async findAllLocation () {

    const locations = await this.locationRepo.find()

    if (locations.length === 0) {

      throw new NotFoundException(`Al menos una sede debe existir para crear ingredientes`);

    } 

    return locations;

  }

  async verifyCreation(createIngredientDto: CreateIngredientDto[]) {

    const allIngredients = await this.ingrRepo.find({relations: ["productToIngredient", "location"]})

    if (allIngredients.length === 0) {

      for (let i = 0; i < createIngredientDto.length; i++) {

        await this.create(createIngredientDto[i]);

      }

    } else {

      for (let i = 0; i < createIngredientDto.length; i++) {
        
        const existingIngredient = allIngredients.find(ingredient => ingredient.name === createIngredientDto[i].name);
        
        if (existingIngredient) {
              
          await this.updateLogistic(existingIngredient.id, createIngredientDto[i]);
  
        } else {
            
          await this.create(createIngredientDto[i]);
            
        }
  
      }

    }

  }
  

  async create(createIngredientDto: CreateIngredientDto) {

    this.findAllLocation()

    const existingIngredient = await this.ingrRepo.findOneBy({ name: createIngredientDto.name });
    
    if (existingIngredient) {

      throw new ConflictException(`Ingrediente con nombre "${createIngredientDto.name}" ya existe`);

    }

    const locationIng = await this.locationRepo.findOneBy({name: createIngredientDto.locationName});

    if (!locationIng) {

      throw new NotFoundException(`Sede con ID "${createIngredientDto.locationName}" no encontrada`);

    }

    const ingredient = {

      id: UUID(),
      location: locationIng,
      slug: createIngredientDto.name.toLowerCase().replaceAll(' ','-').replaceAll("'",''),
      ...createIngredientDto

    }

    return this.ingrRepo.save(ingredient);

  }

  async updateLogistic(id: any, updateIngredientDto: UpdateIngredientDto) {

    this.findAllLocation()

    this.findAll()

    const ingredient = await this.ingrRepo.findOne({where: {id: id}});
     
    this.ingrRepo.merge(ingredient, updateIngredientDto);

    if (updateIngredientDto.quantity != 0) {

      ingredient.quantity = ingredient.quantity + updateIngredientDto.quantity

    }

    return this.ingrRepo.save(ingredient);

  }

  async update(id: any, updateIngredientDto: UpdateIngredientDto) {

    this.findAllLocation()

    this.findAll()

    const ingredient = await this.ingrRepo.findOne({where: {id: id}});
     
    this.ingrRepo.merge(ingredient, updateIngredientDto);

    return this.ingrRepo.save(ingredient);

  }

  async remove(ingredientId: any) {

    this.findAllLocation()

    this.findAll()
    
    const ingredient = await this.ingrRepo.findOne({where: {id: ingredientId}});
    
    if (!ingredient) {
      
      throw new Error('Ingrediente no encontrado');

    }

    await this.ingrRepo.remove(ingredient);

  }

}
