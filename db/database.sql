CREATE DATABASE IF NOT EXISTS iron_dome;

USE iron_dome;

CREATE TABLE IF NOT EXISTS operators (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    operator_rank VARCHAR(100) NOT NULL
)


CREATE TABLE IF NOT EXISTS incidents(
    id INT PRIMARY KEY AUTO_INCREMENT,
    code_name VARCHAR(100) NOT NULL,
    threat_level VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'OPEN',
    operator_id	int,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_incidents_operator_id
    FOREIGN KEY (operator_id) REFERENCES operators(id)
)

CREATE TABLE IF NOT EXISTS logs (
    id	INT AUTO_INCREMENT PRIMARY KEY,
    action	VARCHAR(100),
    incident_id	INT,
    operator_id	INT,
    description	TEXT,
    created_at	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_logs_incident_id
    FOREIGN KEY (incident_id) REFERENCES incidents(id),
    CONSTRAINT fk_logs_operator_id
    FOREIGN KEY (operator_id) REFERENCES operators(id)
)

