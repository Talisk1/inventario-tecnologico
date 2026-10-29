import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export const ESTADOS = ['Disponible', 'En uso', 'Mantención', 'Baja'] as const;

@Entity('equipos')
export class Equipo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  codigoInventario: string;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 50 })
  tipo: string;

  @Column({ length: 50 })
  marca: string;

  @Column({ length: 50 })
  modelo: string;

  @Column({ length: 100 })
  ubicacion: string;

  @Column({ type: 'enum', enum: ESTADOS, default: 'Disponible' })
  estado: string;

  @Column({ type: 'date' })
  fechaAdquisicion: string;

  @Column({ type: 'text', nullable: true })
  observaciones: string | null;
}
