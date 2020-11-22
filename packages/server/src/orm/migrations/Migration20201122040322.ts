import { Migration } from '@mikro-orm/migrations'

export class Migration20201122040322 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table `user` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `updated_at` datetime not null, `username` varchar(255) not null, `hashed_password` varchar(255) not null, `email` varchar(255) null, `bio` text null) default character set utf8mb4 engine = InnoDB;',
    )
    this.addSql(
      'alter table `user` add unique `user_username_unique`(`username`);',
    )
    this.addSql('alter table `user` add unique `user_email_unique`(`email`);')
  }

  // Doc: https://mikro-orm.io/docs/migrations#migration-class
  async down(): Promise<void> {
    this.addSql('drop table `user`;')
  }
}
