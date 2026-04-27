-- CupRadar sample ticket listings
-- Run this in Supabase SQL Editor.
-- These are placeholder marketplace listings for testing.
-- Replace prices, quantities, and match labels with your real verified inventory before going live.

insert into tickets
(match, venue, city, match_date, category, price, currency, available, status)
values
(
  'Final - Winner SF1 vs Winner SF2',
  'MetLife Stadium',
  'New York/New Jersey, USA',
  'July 19, 2026',
  'Category 2',
  450,
  'USD',
  8,
  'available'
),
(
  'Semi Final - Match 1',
  'AT&T Stadium',
  'Dallas, USA',
  'July 14, 2026',
  'Category 1',
  320,
  'USD',
  12,
  'available'
),
(
  'Semi Final - Match 2',
  'Mercedes-Benz Stadium',
  'Atlanta, USA',
  'July 15, 2026',
  'Category 1',
  320,
  'USD',
  10,
  'available'
),
(
  'Quarter Final - Los Angeles',
  'SoFi Stadium',
  'Los Angeles, USA',
  'July 10, 2026',
  'Category 2',
  260,
  'USD',
  15,
  'available'
),
(
  'Quarter Final - Kansas City',
  'Arrowhead Stadium',
  'Kansas City, USA',
  'July 11, 2026',
  'Category 3',
  210,
  'USD',
  18,
  'available'
),
(
  'Round of 16 - Miami',
  'Hard Rock Stadium',
  'Miami, USA',
  'July 4, 2026',
  'Category 2',
  180,
  'USD',
  20,
  'available'
),
(
  'Round of 16 - Seattle',
  'Lumen Field',
  'Seattle, USA',
  'July 3, 2026',
  'Category 3',
  150,
  'USD',
  24,
  'available'
),
(
  'Group Stage - Toronto',
  'BMO Field',
  'Toronto, Canada',
  'June 12, 2026',
  'Category 3',
  120,
  'USD',
  30,
  'available'
),
(
  'Group Stage - Vancouver',
  'BC Place',
  'Vancouver, Canada',
  'June 18, 2026',
  'Category 3',
  130,
  'USD',
  25,
  'available'
),
(
  'Group Stage - Mexico City',
  'Estadio Azteca',
  'Mexico City, Mexico',
  'June 11, 2026',
  'Category 2',
  160,
  'USD',
  20,
  'available'
),
(
  'Group Stage - Guadalajara',
  'Estadio Akron',
  'Guadalajara, Mexico',
  'June 15, 2026',
  'Category 3',
  110,
  'USD',
  28,
  'available'
),
(
  'Hospitality Package - Final',
  'MetLife Stadium',
  'New York/New Jersey, USA',
  'July 19, 2026',
  'Hospitality',
  1250,
  'USD',
  4,
  'available'
);
