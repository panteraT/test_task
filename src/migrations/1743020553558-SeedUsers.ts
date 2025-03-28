import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedUsers1743020553558 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO users (name, phone, email) VALUES
            ('Ivan Ivanov', '123456', 'ivan@test.com'),
            ('Petr Petrov', '567890', 'petr@test.com'),
            ('Ivanova Valentina', '345678', 'ivanova@test.com'),
            ('Test User', '747328', 'test-user@test.com'),
            ('Maksim', '294845', 'maksim@test.com'),
            ('Mikita Test', '294445', 'mikita@test.com'),
            ('Last User', '294915', 'last-user@test.com')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`DELETE FROM users WHERE email IN (SELECT email FROM users)`);
    }

}
