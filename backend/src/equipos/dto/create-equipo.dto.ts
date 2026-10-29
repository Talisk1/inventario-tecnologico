import {
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ESTADOS } from '../equipo.entity.js';

export class CreateEquipoDto {
  @IsString()
  @MinLength(3, { message: 'codigoInventario debe tener al menos 3 caracteres' })
  codigoInventario: string;

  @IsString()
  @MinLength(3, { message: 'nombre debe tener al menos 3 caracteres' })
  nombre: string;

  @IsString()
  @IsNotEmpty({ message: 'tipo no puede estar vacío' })
  tipo: string;

  @IsString()
  @IsNotEmpty({ message: 'marca no puede estar vacía' })
  marca: string;

  @IsString()
  @IsNotEmpty({ message: 'modelo no puede estar vacío' })
  modelo: string;

  @IsString()
  @IsNotEmpty({ message: 'ubicacion no puede estar vacía' })
  ubicacion: string;

  @IsIn(ESTADOS, {
    message: 'estado debe ser: Disponible, En uso, Mantención o Baja',
  })
  estado: string;

  @IsDateString({}, { message: 'fechaAdquisicion debe ser una fecha válida (YYYY-MM-DD)' })
  fechaAdquisicion: string;

  @IsOptional()
  @IsString()
  observaciones?: string;
}
