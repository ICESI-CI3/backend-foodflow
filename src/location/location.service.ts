/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LocationService {

  constructor (

    @InjectRepository(Location) private locationRepository: Repository<Location>

  ){}

  async findAll() {
    
    const locations = await this.locationRepository.find({relations: ["ingredients"]});

    if (locations.length === 0) {

      throw new NotFoundException('No hay sedes creadas')

    }

    return locations;

  }

  async findOne(id: any) {

    this.findAll()
    
    const location = await this.locationRepository.findOne({where: {id: id}, relations: ["ingredients"]});

    if (!location) {

      throw new NotFoundException(`Sede con id '${id}' no se ha encontrado`);

    }

    return location;

  }

  async create(createLocationDto: CreateLocationDto) {

    const existingLocation = await this.locationRepository.findOneBy({ name: createLocationDto.name });
    
    if (existingLocation) {

      throw new ConflictException(`Ya existe una sede con el nombre "${createLocationDto.name}"`);

    }

    const location = await this.locationRepository.create(createLocationDto);

    return await this.locationRepository.save(location);
    
  }

  async update(id: any, updateLocationDto: UpdateLocationDto) {

    this.findAll()
    
    const existingLocation = await this.locationRepository.findOneBy({ id: id });
    
    if (!existingLocation) {

      throw new NotFoundException(`Una sede con el id "${id}" no existe`);

    }

    this.locationRepository.merge(existingLocation, updateLocationDto)

    return await this.locationRepository.save(existingLocation)

  }

  async remove(id: any) {

    this.findAll()

    const existingLocation = await this.locationRepository.findOneBy({ id: id });
    
    if (!existingLocation) {

      throw new NotFoundException(`Una sede con el id "${id}" no existe`);

    }

    return this.locationRepository.remove(existingLocation);

  }
}
