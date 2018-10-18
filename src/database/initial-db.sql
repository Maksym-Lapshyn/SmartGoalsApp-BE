DROP TABLE IF EXISTS factors_contributors;
DROP TABLE IF EXISTS milestones_factors;
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
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT NULL,
    planned_date TIMESTAMP NOT NULL,
	actual_date TIMESTAMP NULL,
	value INTEGER NOT NULL CHECK(value >= 1 AND value <= 10),
	goal_id INTEGER REFERENCES goals(id) ON DELETE CASCADE
);

CREATE TABLE factors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT NULL,
	value INTEGER NOT NULL CHECK(value >= 0 AND value <= 10),
	weight INTEGER NOT NULL CHECK(weight >= 0 AND value <= 10)
);

CREATE TABLE milestones_factors (
	milestone_id SERIAL REFERENCES milestones(id),
	factor_id SERIAL REFERENCES factors(id),
	CONSTRAINT milestones_factors_pkey PRIMARY KEY(milestone_id, factor_id)
);

CREATE TABLE contributors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT NULL
);

CREATE TABLE factors_contributors (
	factor_id SERIAL REFERENCES factors(id),
	contributor_id SERIAL REFERENCES contributors(id),
	CONSTRAINT factors_contributors_pkey PRIMARY KEY(factor_id, contributor_id)
);
