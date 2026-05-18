ALTER TABLE panier_items
    ALTER COLUMN prix_unitaire TYPE NUMERIC(15, 2) USING prix_unitaire::NUMERIC(15, 2);