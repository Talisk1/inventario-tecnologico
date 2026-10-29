import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEquipoDto } from './dto/create-equipo.dto.js';
import { UpdateEquipoDto } from './dto/update-equipo.dto.js';
import { Equipo } from './equipo.entity.js';

@Injectable()
export class EquiposService {
  constructor(
    @InjectRepository(Equipo) private readonly repo: Repository<Equipo>,
  ) {}

  findAll() {
    return this.repo.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const equipo = await this.repo.findOneBy({ id });
    if (!equipo) throw new NotFoundException(`Equipo con id ${id} no existe`);
    return equipo;
  }

  create(dto: CreateEquipoDto) {
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: number, dto: UpdateEquipoDto) {
    const equipo = await this.findOne(id);
    return this.repo.save(Object.assign(equipo, dto));
  }

  async remove(id: number) {
    const equipo = await this.findOne(id);
    await this.repo.remove(equipo);
    return { mensaje: `Equipo ${id} eliminado` };
  }
}
