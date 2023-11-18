CREATE TABLE "user" (
    "user_id" serial PRIMARY KEY,
	"role_id" integer DEFAULT 1,
    "username" varchar(50) UNIQUE NOT NULL,
    "password" varchar(255) NOT NULL
);

CREATE TABLE "role" (
    "role_id" serial PRIMARY KEY,
    "name" varchar(50) UNIQUE NOT NULL
);

ALTER TABLE "user" ADD FOREIGN KEY ("role_id") REFERENCES "role" ("role_id");

INSERT INTO "role" (name) VALUES ('USER'), ('ADMIN');
INSERT INTO "user" (username, password) VALUES ('Max', '123');