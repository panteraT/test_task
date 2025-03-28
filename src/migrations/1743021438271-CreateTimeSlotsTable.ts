import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedDoctorTimeSlots1743021276006 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
                CREATE TABLE time_slots (
                  id INT AUTO_INCREMENT PRIMARY KEY,
                  date_time DATETIME NOT NULL,
                  is_free BOOLEAN DEFAULT TRUE,
                  doctor_id INT,
                  CONSTRAINT FK_time_slot_doctor FOREIGN KEY (doctor_id)
                  REFERENCES doctors(id) ON DELETE CASCADE,
                  user_id INT,
                  CONSTRAINT FK_time_slot_user FOREIGN KEY (user_id)
                  REFERENCES users(id) ON DELETE CASCADE
                )
              `);
          
              // Создаем индекс для улучшения производительности
              await queryRunner.query(`
                CREATE INDEX IDX_time_slot_doctor ON time_slots (doctor_id)
              `);

              await queryRunner.query(`
                CREATE INDEX IDX_time_slot_user ON time_slots (user_id)
              `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
