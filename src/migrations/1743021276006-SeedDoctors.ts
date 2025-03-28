import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedDoctors1743021276006 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO doctors (name, speciality) VALUES
            ('Doctor Ivanov', 'Pediatrician'),
            ('Doctor Petrov', 'Dentist'),
            ('Valentina Psychiatrist', 'Psychiatrist'),
            ('Doctor Zverev', 'Surgeon')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
