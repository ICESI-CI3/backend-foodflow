/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLogisticDto } from './dto/create-logistic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Logistic } from './entities/logistic.entity';
import { Repository } from 'typeorm';
import { Location } from 'src/location/entities/location.entity';
import { v4 as UUID } from 'uuid';
import { Ingredient } from 'src/ingredients/entities/ingredient.entity';

@Injectable()
export class LogisticService {

  constructor (

    @InjectRepository(Logistic) private logisRepo: Repository<Logistic>,
    @InjectRepository(Location) private locationRepo: Repository<Location>,
    @InjectRepository(Ingredient) private ingRepo: Repository<Ingredient>

  ){}

  async findAll() {

    const logistics = await this.logisRepo.find({relations: ["location", "ingredients"]})

    if(logistics.length === 0) {

      throw new NotFoundException("No se han creado órdenes de abastecimiento")

    }

    return logistics;

  }

  findOne(id: any) {

    this.findAll()

    const logistic = this.logisRepo.findOne({where: {id: id}, relations: ["location"]})

    if (!logistic) {

      throw new NotFoundException("No se ha encontrado la orden de abastecimiento")

    }

    return logistic

  }
  async create(createLogisticDto: CreateLogisticDto) {

    const existingLogistic = await this.logisRepo.findOneBy({ name: createLogisticDto.name });
    
    if (existingLogistic) {

      throw new ConflictException(`El abastecimiento con nombre "${createLogisticDto.name}" ya existe`);

    }

    const locationIng = await this.locationRepo.findOneBy({name: createLogisticDto.locationName});

    if (!locationIng) {

      throw new NotFoundException(`Una sede con nombre "${createLogisticDto.locationName}" no ha sido encontrada`);

    }

    let ingredientsFound: Ingredient[] = []

    for (let i = 0; i < createLogisticDto.ingredients.length; i++) {

      ingredientsFound.push(await this.ingRepo.findOne({where: {name: createLogisticDto.ingredients[i].name}}))

    }
    
    let totalPrice = 0

    for (let i = 0; i < createLogisticDto.ingredients.length; i++) {

      const ingredientPrice = createLogisticDto.ingredients[i].purchasePrice * createLogisticDto.ingredients[i].quantity;

      totalPrice = totalPrice + ingredientPrice;

    }

    const logistic = new Logistic()
    logistic.id = UUID()
    logistic.name = createLogisticDto.name
    logistic.location = locationIng
    logistic.totalPrice = totalPrice
    logistic.slug = createLogisticDto.name.toLowerCase().replaceAll(' ','-').replaceAll("'",'') 
    logistic.ingredients = ingredientsFound
    logistic.date = new Date()

    return this.logisRepo.save(logistic);

  }

}
