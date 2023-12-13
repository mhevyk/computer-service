CREATE TYPE "order_status" AS ENUM (
  'ACCEPTED',
  'IN_PROCESS',
  'SHIPPED',
  'COMPLETED',
  'CANCELED'
);

CREATE TYPE "structural_unit_type" AS ENUM (
  'DEPARTMENT',
  'SHOP'
);

CREATE TABLE "order" (
  "order_id" serial PRIMARY KEY,
  "computer_id" integer NOT NULL,
  "client_id" integer NOT NULL,
  "status" order_status DEFAULT 'ACCEPTED',
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "completed_order" (
  "completed_order_id" serial PRIMARY KEY,
  "order_id" integer NOT NULL,
  "employee_id" integer NOT NULL
);

CREATE TABLE "role" (
  "role_id" serial PRIMARY KEY,
  "name" varchar(50) NOT NULL
);

CREATE TABLE "user" (
  "user_id" serial PRIMARY KEY,
  "role_id" integer,
  "username" varchar(255) UNIQUE NOT NULL,
  "password" varchar(255) NOT NULL
);

CREATE TABLE "token" (
  "token_id" serial PRIMARY KEY,
  "user_id" integer NOT NULL,
  "refresh_token" varchar(255)
);

CREATE TABLE "client" (
  "client_id" serial PRIMARY KEY,
  "user_id" integer NOT NULL
);

CREATE TABLE "work_position" (
  "work_position_id" serial PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  "salary" real NOT NULL
);

CREATE TABLE "employee" (
  "employee_id" serial PRIMARY KEY,
  "user_id" integer NOT NULL,
  "work_position_id" integer NOT NULL,
  "structural_unit_id" integer NOT NULL
);

CREATE TABLE "structural_unit" (
  "structural_unit_id" serial PRIMARY KEY,
  "type" structural_unit_type NOT NULL,
  "address" text NOT NULL
);

CREATE TABLE "computer" (
  "computer_id" serial PRIMARY KEY,
  "name" varchar(255),
  "brand" varchar(255),
  "is_custom" boolean,
  "release_date" date DEFAULT (now())
);

CREATE TABLE "component" (
  "computer_component_id" serial PRIMARY KEY,
  "manufactorer_id" integer NOT NULL,
  "computer_id" integer NOT NULL,
  "processor_id" integer,
  "motherboard_id" integer,
  "memory_id" integer,
  "videocard_id" integer,
  "power_supply_id" integer,
  "price_per_unit" real NOT NULL,
  "quantity" integer DEFAULT 0
);

CREATE TABLE "processor" (
  "processor_id" serial PRIMARY KEY,
  "socket_id" integer NOT NULL,
  "name" varchar(255),
  "frequency" real,
  "cores_count" integer,
  "threads_count" integer,
  "manufactorer" text
);

CREATE TABLE "socket" (
  "socket_id" serial PRIMARY KEY,
  "name" varchar(255)
);

CREATE TABLE "form_factor" (
  "form_factor_id" serial PRIMARY KEY,
  "name" varchar(255)
);

CREATE TABLE "motherboard" (
  "motherboard_id" serial PRIMARY KEY,
  "ram_type_id" integer NOT NULL,
  "socket_id" integer NOT NULL,
  "form_factor_id" integer NOT NULL,
  "name" varchar(255),
  "chipset" varchar(255)
);

CREATE TABLE "memory_type" (
  "memory_type_id" serial PRIMARY KEY,
  "name" varchar(255) NOT NULL
);

CREATE TABLE "memory" (
  "memory_id" serial PRIMARY KEY,
  "memory_type_id" integer NOT NULL,
  "name" varchar(255),
  "capacity" integer
);

CREATE TABLE "videocard" (
  "videocard_id" serial PRIMARY KEY,
  "memory_type_id" integer NOT NULL,
  "memory_capacity" integer,
  "name" varchar(255),
  "coolers_count" integer
);

CREATE TABLE "power_supply" (
  "power_supply_id" serial PRIMARY KEY,
  "form_factor_id" integer NOT NULL,
  "name" varchar(255),
  "wattage" real
);

CREATE TABLE "manufactorer" (
  "manufactorer_id" serial PRIMARY KEY,
  "name" varchar(255) UNIQUE NOT NULL,
  "address" text
);

CREATE TABLE "discount" (
  "client_discount_id" serial PRIMARY KEY,
  "client_id" integer NOT NULL,
  "discount_amount" real,
  "discount_percent" integer,
  "usage_count" integer DEFAULT 0,
  "expires_at" date
);

COMMENT ON TABLE "role" IS 'initial roles are CLIENT, COMPUTER_ASSEMBLER, MANAGER, SALES_CONSULTANT, ADMIN';

COMMENT ON TABLE "socket" IS 'should be same in single computer inside processor and motherboard';

ALTER TABLE "order" ADD FOREIGN KEY ("computer_id") REFERENCES "computer" ("computer_id");

ALTER TABLE "order" ADD FOREIGN KEY ("client_id") REFERENCES "client" ("client_id");

ALTER TABLE "completed_order" ADD FOREIGN KEY ("order_id") REFERENCES "order" ("order_id");

ALTER TABLE "completed_order" ADD FOREIGN KEY ("employee_id") REFERENCES "employee" ("employee_id");

ALTER TABLE "user" ADD FOREIGN KEY ("role_id") REFERENCES "role" ("role_id");

ALTER TABLE "token" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("user_id");

ALTER TABLE "client" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("user_id");

ALTER TABLE "employee" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("user_id");

ALTER TABLE "employee" ADD FOREIGN KEY ("work_position_id") REFERENCES "work_position" ("work_position_id");

ALTER TABLE "employee" ADD FOREIGN KEY ("structural_unit_id") REFERENCES "structural_unit" ("structural_unit_id");

ALTER TABLE "component" ADD FOREIGN KEY ("manufactorer_id") REFERENCES "manufactorer" ("manufactorer_id");

ALTER TABLE "component" ADD FOREIGN KEY ("computer_id") REFERENCES "computer" ("computer_id");

ALTER TABLE "component" ADD FOREIGN KEY ("processor_id") REFERENCES "processor" ("processor_id");

ALTER TABLE "component" ADD FOREIGN KEY ("motherboard_id") REFERENCES "motherboard" ("motherboard_id");

ALTER TABLE "component" ADD FOREIGN KEY ("memory_id") REFERENCES "memory" ("memory_id");

ALTER TABLE "component" ADD FOREIGN KEY ("videocard_id") REFERENCES "videocard" ("videocard_id");

ALTER TABLE "component" ADD FOREIGN KEY ("power_supply_id") REFERENCES "power_supply" ("power_supply_id");

ALTER TABLE "processor" ADD FOREIGN KEY ("socket_id") REFERENCES "socket" ("socket_id");

ALTER TABLE "motherboard" ADD FOREIGN KEY ("ram_type_id") REFERENCES "memory_type" ("memory_type_id");

ALTER TABLE "motherboard" ADD FOREIGN KEY ("socket_id") REFERENCES "socket" ("socket_id");

ALTER TABLE "motherboard" ADD FOREIGN KEY ("form_factor_id") REFERENCES "form_factor" ("form_factor_id");

ALTER TABLE "memory" ADD FOREIGN KEY ("memory_type_id") REFERENCES "memory_type" ("memory_type_id");

ALTER TABLE "videocard" ADD FOREIGN KEY ("memory_type_id") REFERENCES "memory_type" ("memory_type_id");

ALTER TABLE "power_supply" ADD FOREIGN KEY ("form_factor_id") REFERENCES "form_factor" ("form_factor_id");

ALTER TABLE "discount" ADD FOREIGN KEY ("client_id") REFERENCES "client" ("client_id");