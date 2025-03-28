import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1742982064230 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            phone VARCHAR(100) NOT NULL UNIQUE,
            email VARCHAR(100) NOT NULL UNIQUE
          )
        `);
      }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
