import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDoctorTable1743021257079 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE doctors (
              id INT AUTO_INCREMENT PRIMARY KEY,
              name VARCHAR(100) NOT NULL,
              speciality VARCHAR(100) NOT NULL
              )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
