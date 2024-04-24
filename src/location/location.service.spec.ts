/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { LocationService } from './location.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './dto/create-location.dto';

describe('LocationService', () => {
  let service: LocationService;
  let locationRepo: Repository<Location>;

  const mockLocationService = {

    create: jest.fn((dto) => ({ id: Math.floor(Math.random() * 100), ...dto })),
    save: jest.fn((dto) => dto),

  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocationService,
        {
          provide: getRepositoryToken(Location),
          useValue: Repository,
        },
      ],
    }).compile();

    service = module.get<LocationService>(LocationService);
    locationRepo = module.get<Repository<Location>>(getRepositoryToken(Location));
  });

  it('should be defined', () => {

    expect(service).toBeDefined();

  });


  describe('create', () => {

    it('should create a location', () => {

      const createLocationDto: CreateLocationDto = {
        "name": "qbano",
        "location": "Melendez",
      };
  
      
      
      expect(service.findOne(mockLocationService.create)).toEqual({
  
        id: expect.any(Number),
        name: "qbano",
        location: "Melendez",
        slug: createLocationDto.name.toLowerCase().replaceAll(' ','-').replaceAll("'",''),
        ingredients: expect.any(Array),
        logistic: expect.any(Array),
  
      })
  
    })

  })
  it('should return all locations', () => {

    const dto = {
      "id": mockLocationService.create,
      "name": "qbano",
      "location": "Melendez",
    };

    const dto2 = {
      "id": mockLocationService.create,
      "name": "dominos",
      "location": "valle lili",
    };

    service.create(dto)
    service.create(dto2)

    expect(service.findAll()).toEqual(
      [
        {
          id: expect.any(Number),
          name: "qbano",
          location: "Melendez",
          slug: dto.name.toLowerCase().replaceAll(' ','-').replaceAll("'",''),
          ingredients: expect.any(Array),
          logistic: expect.any(Array),
        },
        {
          id: expect.any(Number),
          name: "dominos",
          location: "valle lili",
          slug: dto2.name.toLowerCase().replaceAll(' ','-').replaceAll("'",''),
          ingredients: expect.any(Array),
          logistic: expect.any(Array),
        }
      ]
    )
  
  })

  it('should return one location', () => {

    const dto = {
      "id": mockLocationService.create,
      "name": "qbano",
      "location": "Melendez",
    };

    service.create(dto)

    expect(service.findOne(mockLocationService)).toEqual({

      id: expect.any(Number),
      name: "qbano",
      location: "Melendez",
      slug: dto.name.toLowerCase().replaceAll(' ','-').replaceAll("'",''),
      ingredients: expect.any(Array),
      logistic: expect.any(Array),

    })
  
  })

  it('should update a location', () => {

    const dto = {
      "id": mockLocationService.create,
      "name": "qbano",
      "location": "Melendez",
    };

    service.create(dto)

    const dtoUpdate = {
      "location": "valle lili"
    }

    expect(service.update(mockLocationService.create, dtoUpdate)).toEqual({

      id: expect.any(Number),
      name: "qbano",
      location: "valle lili",
      slug: dto.name.toLowerCase().replaceAll(' ','-').replaceAll("'",''),
      ingredients: expect.any(Array),
      logistic: expect.any(Array),

    })
  
  })

  it('should detele a location', () => {

    const dto = {
      "id": mockLocationService.create,
      "name": "qbano",
      "location": "Melendez",
    };

    const dto2 = {
      "id": mockLocationService.create,
      "name": "dominos",
      "location": "valle lili",
    };

    service.create(dto)
    service.create(dto2)

    service.remove(dto)

    expect(service.findAll()).toEqual({

      id: expect.any(Number),
      name: "dominos",
      location: "valle lili",
      slug: dto2.name.toLowerCase().replaceAll(' ','-').replaceAll("'",''),
      ingredients: expect.any(Array),
      logistic: expect.any(Array),

    })

    expect(service.findOne(dto.id)).toBeUndefined()
  
  })

});
