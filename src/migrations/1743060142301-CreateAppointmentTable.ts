import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAppointmentTable1743060142301 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE appointments (
            id INT AUTO_INCREMENT PRIMARY KEY,
            date_time DATETIME NOT NULL,
            time_slot_id INT NOT NULL,
            FOREIGN KEY (time_slot_id) REFERENCES time_slots(id),
            user_id INT,
            CONSTRAINT FK_appointment_user FOREIGN KEY (user_id)
            REFERENCES users(id) ON DELETE CASCADE,
            reminded24h BOOLEAN DEFAULT FALSE,
            reminded2h BOOLEAN DEFAULT FALSE
          )
        `);

        await queryRunner.query(`
            CREATE INDEX IDX_appointment_user ON appointments (user_id)
          `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
