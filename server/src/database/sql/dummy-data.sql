INSERT INTO "computer" ("name", "brand", "is_custom", "release_date")
VALUES
  ('Gaming PC', 'NVIDIA', FALSE, '2023-01-01'),
  ('Office Desktop', 'Dell', FALSE, '2023-02-15'),
  ('Custom Build 1', 'Custom', TRUE, '2023-03-10'),
  ('Laptop 1', 'HP', FALSE, '2023-04-20'),
  ('Workstation', 'Lenovo', FALSE, '2023-05-05'),
  ('Custom Build 2', 'Custom', TRUE, '2023-06-12'),
  ('Gaming Laptop', 'ASUS', FALSE, '2023-07-18'),
  ('Desktop Tower', 'Acer', FALSE, '2023-08-25'),
  ('Custom Build 3', 'Custom', TRUE, '2023-09-30'),
  ('UltraBook', 'Apple', FALSE, '2023-10-15');

INSERT INTO "component" (
  "manufactorer_id",
  "computer_id",
  "processor_id",
  "motherboard_id",
  "memory_id",
  "videocard_id",
  "power_supply_id",
  "price_per_unit",
  "quantity"
)
VALUES
  (1, 1, 1, 1, NULL, 1, 1, 100.0, 5),
  (2, 2, 2, 2, 2, NULL, 2, 150.0, 3),
  (3, 3, 3, NULL, 3, 3, 3, 120.0, 2),
  (4, 4, 4, 4, NULL, 4, 4, 200.0, 1),
  (5, 5, 5, 5, 5, 5, 5, 180.0, 4),
  (1, 6, NULL, 6, 6, NULL, 6, 90.0, 6),
  (2, 7, 7, 7, 7, 7, 7, 250.0, 2),
  (1, 8, NULL, 8, NULL, 8, 8, 130.0, 3),
  (3, 9, 9, 9, 9, 9, NULL, 160.0, 2),
  (3, 10, 10, 10, 10, 10, 10, 170.0, 4),
  (5, 1, 1, NULL, 1, NULL, 1, 110.0, 2),
  (5, 2, 2, 2, 2, 2, NULL, 180.0, 1),
  (4, 3, 3, 3, NULL, 3, 3, 130.0, 3),
  (1, 4, NULL, 4, 4, 4, 4, 220.0, 2),
  (2, 5, 5, 5, 5, 5, NULL, 200.0, 1),
  (3, 6, 6, NULL, 6, NULL, 6, 95.0, 5),
  (2, 7, 7, 7, 7, 7, 7, 260.0, 2),
  (1, 8, NULL, 8, NULL, 8, 8, 140.0, 3),
  (1, 9, 9, 9, 9, 9, 9, 170.0, 2),
  (5, 10, 10, 10, 10, 10, 10, 190.0, 3);