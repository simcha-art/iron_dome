# IRON DOME OPS

מנהל מערכת של איתור איומים, ביצוע פעולות, וניהול היסטוריה.

## TABLES

### OPERATORS

חייל שמפעיל את המערכת

---

| FEILD         | CONSTRAINT                      | GOAL  |
| ------------- | ------------------------------- | ----- |
| id            | int primary key, auto_increment | מזהה  |
| name          | varchar(100)                    | שם    |
| operator_rank | varchar(100)                    | תפקיד |

---

<br>

### INCIDENTS

אירוע שהופעל במערכת

---

| FEILD        | CONSTRAINT                     |
| ------------ | ------------------------------ |
| id           | INT PRIMARY KEY AUTO_INCREMENT |
| code_name    | varchar(100)                   |
| threat_level | varchar(50)                    |
| status       | varchar(50)                    |
| operator_id  | int FK(operators.id)           |
| created_at   | NOW()                          |

---

---

<br>

### LOGS

| FEILD       | CONSTRAINT                     |
| ----------- | ------------------------------ |
| id          | INT AUTO_INCREMENT PRIMARY KEY |
| action      | VARCHAR(100)                   |
| incident_id | INT FK(incidents(id))          |
| operator_id | INT FK(operators(id))          |
| description | TEXT                           |
| created_at  | NOW()                          |

---

<br>

## ENDPOINTS

| METHOD | URL                   | GOAL                                                        |
| ------ | --------------------- | ----------------------------------------------------------- |
| POST   | /operators            | create operator (name, rank)                                |
| POST   | /incidents            | create new incident (code_name, threat_level, operator_id)  |
| PATCH  | /incidents/:id/status | update status, allowed(OPEN, TRACKING, INTERCEPTED, CLOSED) |
| GET    | /incidents/open       | get all incidents with status (OPEN, TRACKING)              |

---

# HOW TO RUN

```
docker compose up -d
```
