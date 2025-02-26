import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * Represents the User entity stored in the database.
 */
@Entity('users')
export class User {
  /**
   * Primary key, auto-generated ID.
   */
  @PrimaryGeneratedColumn()
  id!: number;

  /**
   * The user's full name.
   */
  @Column({ type: 'varchar', length: 255 })
  name!: string;

  /**
   * The user's unique email address.
   */
  @Column({ type: 'varchar', length: 255, unique: true })
  email!: string;

  /**
   * Hashed password for authentication.
   * Stored securely and never returned in queries.
   */
  @Column({ type: 'varchar', length: 255, select: false })
  password!: string;

  /**
   * Whether the user's email is verified.
   */
  @Column({ type: 'boolean', default: false })
  email_verified!: boolean;

  /**
   * Token used for 'Remember Me' authentication.
   */
  @Column({ type: 'varchar', length: 100, nullable: true, select: false })
  remember_token?: string;

  /**
   * Timestamp when the user was created.
   */
  @CreateDateColumn()
  created_at!: Date;

  /**
   * Timestamp when the user was last updated.
   */
  @UpdateDateColumn()
  updated_at!: Date;

  /**
   * Timestamp when the user was soft-deleted.
   * If `null`, the user is still active.
   */
  @DeleteDateColumn()
  deleted_at?: Date;
}
