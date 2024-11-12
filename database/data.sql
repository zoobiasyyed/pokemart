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
values ('Antidote', 'Healing Items', 10000, 'Removes Poison effects from a Pokémon', '/images/Antidote.webp' ),
      ('Awakening', 'Healing Items', 20000, 'Removes Sleep effect from a Pokémon', '/images/Awakening.webp' ),
      ('Burn Heal', 'Healing Items', 25000, 'Removes Burn effects from a Pokémon', '/images/BurnHeal.webp' ),
      ('Full Restore', 'Healing Items', 300000, 'Restores the HP and Status conditions of a Pokémon' , '/images/FullRestore.webp' ),
      ('Hyper Potion', 'Healing Items', 120000, 'Restores 200 HP to an Injured Pokémon', '/images/HyperPotion.webp' ),
      ('Ice Heal', 'Healing Items', 25000, 'Removes Freeze effect from a Pokémon', '/images/IceHeal.webp' ),
      ('Max Elixir', 'Healing Items', 500000, 'Restores every Move to full PP of a Pokémon', '/images/MaxElixir.webp' ),
      ('Potion', 'Healing Items', 20000, 'Restores 20 HP to an Injured Pokémon', '/images/Potion.webp' ),
      ('Paralyze Heal', 'Healing Items', 20000, 'Removes Paralyze effect from a Pokémon', '/images/ParalyzeHeal.webp' ),
      ('Revive', 'Healing Items', 300000, 'Restores a fainted Pokémon to half health', '/images/Revive.webp' ),
      ('Great Ball', 'Pokéballs', 50000, 'Gives a higher catch rate than a normal Pokéball. Catch rate: 1.5x', '/images/GreatBall.webp' ),
      ('Nest Ball', 'Pokéballs', 80000, 'Works better on weak Pokémon', '/images/NestBall.webp' ),
      ('Net Ball', 'Pokéballs', 90000, 'Works better on Water & Bug-type Pokémon', '/images/NetBall.webp' ),
      ('Pokéball', 'Pokéballs', 20000, 'Catch Rate: 1x', '/images/Poke_Ball.webp' ),
      ('Premier Ball', 'Pokéballs', 20000, 'A rare Pokéball that has been specially made to commemorate an event of some sort', '/images/PremierBall.webp' ),
      ('Repeat Ball', 'Pokéballs', 100000, 'Works better on Pokémon caught before', '/images/RepeatBall.webp' ),
      ('Ultra Ball', 'Pokéballs', 120000, 'Higher catch rate: 2x', '/images/UltraBall.webp' ),
      ('Common Candy', 'Evolution Items', 100000, 'Levels down a Pokémon by 1 level', '/images/CommonCandy.webp'),
      ('Rare Candy', 'Evolution Items', 100000, 'Levels up a Pokémon by 1 level', '/images/RareCandy.webp' ),
      ('Fire Stone', 'Evolution Items', 10000000, 'Evolves Vulpix , Growlithe and Eevee', '/images/FireStone.webp' ),
      ('Dragon Scale', 'Evolution Items', 10000000, 'Evolves the Pokémon Seadra', '/images/DragonScale.webp' ),
      ('Friendship Ribbon', 'Evolution Items', 2000000, 'Evolves Golbat, Chansey, Eevee, Riolu, Togepi, Pichu and Pokémon which require Happiness' , '/images/Ribbon.webp' ),
      ('Leaf Stone', 'Evolution Items', 1000000, 'Evolves Gloom , Exeggcute and Weepinbell' , '/images/LeafStone.webp'),
      ('Moon Stone', 'Evolution Items', 1000000, 'Evolves Eevee, Nidorino , Nidorina , Jigglypuff and Clefairy', '/images/MoonStone.webp' ),
      ('Sinnoh Stone', 'Evolution Items', 1500000, 'Evolves Tangela, Magneton , Magmar , Electabuzz , Eevee, Rhydon , Lickitung , Togetic , Kirlia, Snorunt Piloswine and Sneasel', '/images/SinnohStone.webp' ),
      ('Thunder Stone', 'Evolution Items', 1000000, 'Evolves Eevee, Pikachu and Charjabug' , '/images/ThunderStone.webp' ),
      ('Water Stone', 'Evolution Items', 1000000, 'Evolves Eevee, Poliwhirl , Shellder and Staryu' , '/images/WaterStone.webp' ),
      ('Calcium', 'Competitive Items', 500000, 'Raises the base Sp. Attack stat of a single Pokémon' , '/images/Calcium.webp'),
      ('Carbos', 'Competitive Items', 500000, 'Raises the base Speed stat of a single Pokémon', '/images/Carbos.webp' ),
      ('HP Up', 'Competitive Items', 500000, 'Raises the base HP stat of a single Pokémon' , '/images/HpUp.webp'),
      ('Iron', 'Competitive Items', 500000, 'Raises the base Defense stat of a single Pokémon', '/images/Iron.webp' ),
      ('Protein', 'Competitive Items', 500000, 'Raises the base Attack stat of a single Pokémon' , '/images/Protein.webp' ),
      ('Zinc', 'Competitive Items', 500000, 'Raises the base Sp. Defense of a single Pokémon' , '/images/Zinc.webp')
