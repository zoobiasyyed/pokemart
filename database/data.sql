-- Use SQL insert statements to add any
-- starting/dummy data to your database tables

-- EXAMPLE:

--  insert into "todos"
--    ("task", "isCompleted")
--    values
--      ('Learn to code', false),
--      ('Build projects', false),
--      ('Get a job', false);

insert into "products" ("name", "category", "price", "description", "photoUrl")
values ('Antidote', 'Healing Items', 10000, 'Removes Poison effects from a Pokémon' )
      ('Awakening', 'Healing Items', 20000, 'Removes Sleep effect from a Pokémon' )
      ('Burn Heal', 'Healing Items', 25000, 'Removes Burn effects from a Pokémon' )
      ('Full Restore', 'Healing Items', 300000, 'Restores the HP and Status conditions of a Pokémon' )
      ('Hyper Potion', 'Healing Items', 120000, 'Restores 200 HP to an Injured Pokémon' )
      ('Ice Heal', 'Healing Items', 25000, 'Removes Freeze effect from a Pokémon' )
      ('Max Elixir', 'Healing Items', 500000, 'Restores every Move to full PP of a Pokémon' )
      ('Potion', 'Healing Items', 20000, 'Restores 20 HP to an Injured Pokémon' )
      ('Paralyze Heal', 'Healing Items', 20000, 'Removes Paralyze effect from a Pokémon' )
      ('Revive', 'Healing Items', 300000, 'Restores a fainted Pokémon to half health' )
      ('Great Ball', 'Pokéballs', 50000, 'Gives a higher catch rate than a normal Pokéball. Catch rate: 1.5x' )
      ('Nest Ball', 'Pokéballs', 80000, 'Works better on weak Pokémon' )
      ('Net Ball', 'Pokéballs', 90000, 'Works better on Water & Bug-type Pokémon' )
      ('Pokéball', 'Pokéballs', 20000, 'Catch Rate: 1x' )
      ('Premier Ball', 'Pokéballs', 20000, 'A rare Pokéball that has been specially made to commemorate an event of some sort' )
      ('Repeat Ball', 'Pokéballs', 100000, 'Works better on Pokémon caught before' )
      ('Ultra Ball', 'Pokéballs', 120000, 'Higher catch rate: 2x' )
      ('Common Candy', 'Evolution Items', 100000, 'Levels down a Pokémon by 1 level' )
      ('Rare Candy', 'Evolution Items', 100000, 'Levels up a Pokémon by 1 level' )
      ('Fire Stone', 'Evolution Items', 10000000, 'Evolves Vulpix , Growlithe and Eevee' )
      ('Dragon Scale', 'Evolution Items', 10000000, 'Evolves the Pokémon Seadra' )
      ('Friendship Ribbon', 'Evolution Items', 2000000, 'Evolves Golbat, Chansey, Eevee, Riolu, Togepi, Pichu and Pokémon which require Happiness' )
      ('Leaf Stone', 'Evolution Items', 1000000, 'Evolves Gloom , Exeggcute and Weepinbell' )
