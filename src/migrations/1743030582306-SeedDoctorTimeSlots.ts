import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedDoctorTimeSlots1743030582306 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const now = new Date();
        await queryRunner.query(`
            INSERT INTO time_slots (date_time, is_free, doctor_id) VALUES
            ('${new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ')}', ${true}, 1),
            ('${new Date(now.getTime() + 22 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ')}', ${true}, 1),
            ('${new Date(now.getTime() + 20 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ')}', ${true}, 1),
            ('${new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ')}', ${true}, 1),
            ('${new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ')}', ${true}, 2),
            ('${new Date(now.getTime() + 22 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ')}', ${true}, 2),
            ('${new Date(now.getTime() + 20 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ')}', ${true}, 2),
            ('${new Date(now.getTime() + 4 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ')}', ${true}, 2),
            ('${new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ')}', ${true}, 3),
            ('${new Date(now.getTime() + 3 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ')}', ${true}, 3),
            ('${new Date(now.getTime() + 4 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ')}', ${true}, 3),
            ('${new Date(now.getTime() + 5 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ')}', ${true}, 3),
            ('${new Date(now.getTime() + 49 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ')}', ${true}, 4),
            ('${new Date(now.getTime() + 48 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ')}', ${true}, 4),
            ('${new Date(now.getTime() + 47 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ')}', ${true}, 4),
            ('${new Date(now.getTime() + 46 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ')}', ${true}, 4)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
