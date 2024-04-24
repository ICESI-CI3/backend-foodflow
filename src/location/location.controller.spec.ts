/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';

describe('LocationController', () => {
  let controller: LocationController;

  const mockLocationService = {

    create: jest.fn((dto) => ({ id: Math.floor(Math.random() * 100), ...dto })),
    save: jest.fn((dto) => dto),
  
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationController],
      providers: [LocationService],
    }).overrideProvider(LocationService).useValue(mockLocationService).compile();

    controller = module.get<LocationController>(LocationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a location', () => {

    const dto = {
      "id": mockLocationService.create,
      "name": "qbano",
      "location": "Melendez",
    };
    
    expect(controller.create(dto)).toEqual({

      id: expect.any(Number),
      name: "qbano",
      location: "Melendez",
      slug: dto.name.toLowerCase().replaceAll(' ','-').replaceAll("'",''),
      ingredients: expect.any(Array),
      logistic: expect.any(Array),

    })

    expect(mockLocationService.create).toHaveBeenCalledWith(dto)
    expect(mockLocationService.create).toHaveBeenCalledTimes(1)

  })
});
