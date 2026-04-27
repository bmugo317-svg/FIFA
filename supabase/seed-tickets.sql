-- CupRadar World Cup 2026 ticket inventory seed
-- Run this in Supabase SQL Editor.
-- Assumption: you have verified/legal inventory for these listings.
-- Each row starts with 12 available tickets.
-- Pricing model: conservative marketplace-style placeholders based on stage, host-city demand, and venue prominence.
-- I could not live-compare vendor prices from this environment, so verify against current official/authorized resale prices before going live.

insert into tickets
(match, venue, city, match_date, category, price, currency, available, status)
values
(
  'Opening Match - Mexico City',
  'Estadio Azteca',
  'Mexico City, Mexico',
  'June 11, 2026',
  'Opening Match - Standard',
  650,
  'USD',
  12,
  'available'
),
(
  'Opening Day Match - Guadalajara',
  'Estadio Akron',
  'Guadalajara, Mexico',
  'June 11, 2026',
  'Opening Day - Standard',
  380,
  'USD',
  12,
  'available'
),
(
  'Opening Day Match - Toronto',
  'BMO Field',
  'Toronto, Canada',
  'June 12, 2026',
  'Opening Day - Standard',
  420,
  'USD',
  12,
  'available'
),
(
  'Opening Day Match - Los Angeles',
  'SoFi Stadium',
  'Los Angeles, USA',
  'June 12, 2026',
  'Opening Day - Standard',
  520,
  'USD',
  12,
  'available'
),
(
  'Host Venue Listing - Vancouver',
  'BC Place',
  'Vancouver, Canada',
  'June-July 2026',
  'Group Stage - Standard',
  260,
  'USD',
  12,
  'available'
),
(
  'Host Venue Listing - Seattle',
  'Lumen Field',
  'Seattle, USA',
  'June-July 2026',
  'Group Stage - Standard',
  280,
  'USD',
  12,
  'available'
),
(
  'Host Venue Listing - San Francisco Bay Area',
  'Levi''s Stadium',
  'San Francisco Bay Area, USA',
  'June-July 2026',
  'Group Stage - Standard',
  320,
  'USD',
  12,
  'available'
),
(
  'Host Venue Listing - Houston',
  'NRG Stadium',
  'Houston, USA',
  'June-July 2026',
  'Group Stage - Standard',
  250,
  'USD',
  12,
  'available'
),
(
  'Host Venue Listing - Dallas',
  'AT&T Stadium',
  'Dallas, USA',
  'June-July 2026',
  'High Demand - Standard',
  360,
  'USD',
  12,
  'available'
),
(
  'Host Venue Listing - Kansas City',
  'Arrowhead Stadium',
  'Kansas City, USA',
  'June-July 2026',
  'Group Stage - Standard',
  240,
  'USD',
  12,
  'available'
),
(
  'Host Venue Listing - Atlanta',
  'Mercedes-Benz Stadium',
  'Atlanta, USA',
  'June-July 2026',
  'Group Stage - Standard',
  290,
  'USD',
  12,
  'available'
),
(
  'Host Venue Listing - Miami',
  'Hard Rock Stadium',
  'Miami, USA',
  'June-July 2026',
  'High Demand - Standard',
  340,
  'USD',
  12,
  'available'
),
(
  'Host Venue Listing - Boston',
  'Gillette Stadium',
  'Boston, USA',
  'June-July 2026',
  'Group Stage - Standard',
  280,
  'USD',
  12,
  'available'
),
(
  'Host Venue Listing - Philadelphia',
  'Lincoln Financial Field',
  'Philadelphia, USA',
  'June-July 2026',
  'Group Stage - Standard',
  270,
  'USD',
  12,
  'available'
),
(
  'Host Venue Listing - New York/New Jersey',
  'MetLife Stadium',
  'New York/New Jersey, USA',
  'June-July 2026',
  'High Demand - Standard',
  390,
  'USD',
  12,
  'available'
),
(
  'Final - New York/New Jersey',
  'MetLife Stadium',
  'New York/New Jersey, USA',
  'July 19, 2026',
  'Final - Premium',
  2250,
  'USD',
  12,
  'available'
),
(
  'Host Venue Listing - Monterrey',
  'Estadio BBVA',
  'Monterrey, Mexico',
  'June-July 2026',
  'Group Stage - Standard',
  245,
  'USD',
  12,
  'available'
);

-- If old coming_soon rows already exist, run this update to convert them instead of inserting duplicates:
-- update tickets
-- set available = 12,
--     status = 'available',
--     category = case
--       when match ilike '%Final%' then 'Final - Premium'
--       when match ilike '%Opening Match%' then 'Opening Match - Standard'
--       when match ilike '%Opening Day%' then 'Opening Day - Standard'
--       when city ilike '%Dallas%' or city ilike '%Miami%' or city ilike '%New York%' then 'High Demand - Standard'
--       else 'Group Stage - Standard'
--     end,
--     price = case
--       when match ilike '%Final%' then 2250
--       when match ilike '%Opening Match%' then 650
--       when city ilike '%Los Angeles%' then 520
--       when city ilike '%Toronto%' then 420
--       when city ilike '%New York%' then 390
--       when city ilike '%Guadalajara%' then 380
--       when city ilike '%Dallas%' then 360
--       when city ilike '%Miami%' then 340
--       when city ilike '%San Francisco%' then 320
--       when city ilike '%Atlanta%' then 290
--       when city ilike '%Seattle%' then 280
--       when city ilike '%Boston%' then 280
--       when city ilike '%Philadelphia%' then 270
--       when city ilike '%Vancouver%' then 260
--       when city ilike '%Houston%' then 250
--       when city ilike '%Monterrey%' then 245
--       when city ilike '%Kansas City%' then 240
--       else 250
--     end;
