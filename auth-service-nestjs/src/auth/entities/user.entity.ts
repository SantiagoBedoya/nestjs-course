import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    name: 'first_name',
  })
  firstName: string;

  @Column('text', {
    name: 'last_name',
  })
  lastName: string;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('text', {
    nullable: true,
  })
  password: string;

  @Column('bool', {
    default: false,
    name: 'authenticated_with_google',
  })
  authenticatedWithGoogle: boolean;
}
