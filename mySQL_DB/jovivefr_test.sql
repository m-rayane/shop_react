--

-- Fichier g�n�r� par SQLiteStudio v3.4.3 sur mar. f�vr. 21 09:24:12 2023

--

-- Encodage texte utilis� : System

--

PRAGMA foreign_keys = off;

BEGIN TRANSACTION;

-- Table : customers

CREATE TABLE
    IF NOT EXISTS customers (
        customerId NOT NULL PRIMARY KEY UNIQUE,
        firstName VARCHAR(50) NOT NULL,
        lastName VARCHAR(50) NOT NULL
    );

COMMIT TRANSACTION;

PRAGMA foreign_keys = on;