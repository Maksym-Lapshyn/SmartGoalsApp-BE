DROP TABLE IF EXISTS contributors;
DROP TABLE IF EXISTS factors;
DROP TABLE IF EXISTS milestones;
DROP TABLE IF EXISTS goals;

CREATE TABLE goals (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT NULL,
    start_date TIMESTAMP NOT NULL,
	end_date TIMESTAMP NOT NULL
);

CREATE TABLE milestones (
    id SERIAL primary key,
    name VARCHAR(50) NOT NULL,
    description TEXT NULL,
    planned_date TIMESTAMP NOT NULL,
	actual_date TIMESTAMP NULL,
	value INTEGER NOT NULL CHECK(value >= 1 AND value <= 10),
	goal_id INTEGER REFERENCES goals(id)
);

CREATE TABLE factors (
    id SERIAL primary key,
    name VARCHAR(50) NOT NULL,
    description TEXT NULL,
	value INTEGER NOT NULL CHECK(value >= 0 AND value <= 10),
	weight INTEGER NOT NULL CHECK(weight >= 0 AND value <= 10),
	milestone_id INTEGER REFERENCES milestones(id)
);

CREATE TABLE contributors (
    id SERIAL primary key,
    name VARCHAR(50) NOT NULL,
    description TEXT NULL,
	factor_id INTEGER REFERENCES factors(id)
);