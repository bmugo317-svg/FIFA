-- CupRadar World Cup 2026 ticket inventory seed
-- Run this in Supabase SQL Editor.
-- Assumption: you have verified/legal inventory for these listings.
-- Each row starts with 12 available tickets.
-- Pricing model: vendor-comparison framework.
-- Compare official resale, hospitality sellers, major marketplaces, and verified local sellers before live sale.
-- Current numbers are market-style target prices, not live scraped vendor quotes.

insert into tickets
(match, venue, city, match_date, category, price, currency, available, status)
values
(
  'Opening Match - Mexico City',
  'Estadio Azteca',
  'Mexico City, Mexico',
  'June 11, 2026',
  'Opening Match - Standard',
  695,
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
  425,
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
  475,
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
  595,
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
  295,
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
  315,
  'USD',
  12,
  'available'
),
(
  'Host Venue Listing - San Francisco Bay Area',
  'Levi''s Stadium',
  'San Francisco Bay Area, USA',
  'June-July 2026',
  'High Demand - Standard',
  375,
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
  285,
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
  425,
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
  275,
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
  335,
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
  395,
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
  315,
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
  305,
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
  465,
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
  2495,
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
  285,
  'USD',
  12,
  'available'
);

-- If rows already exist, run this update block instead of inserting duplicates:
update tickets
set available = 12,
    status = 'available',
    category = case
      when match ilike '%Final%' then 'Final - Premium'
      when match ilike '%Opening Match%' then 'Opening Match - Standard'
      when match ilike '%Opening Day%' then 'Opening Day - Standard'
      when city ilike '%Dallas%' or city ilike '%Miami%' or city ilike '%New York%' or city ilike '%San Francisco%' then 'High Demand - Standard'
      else 'Group Stage - Standard'
    end,
    price = case
      when match ilike '%Final%' then 2495
      when match ilike '%Opening Match%' then 695
      when city ilike '%Los Angeles%' then 595
      when city ilike '%Toronto%' then 475
      when city ilike '%New York%' then 465
      when city ilike '%Dallas%' then 425
      when city ilike '%Guadalajara%' then 425
      when city ilike '%Miami%' then 395
      when city ilike '%San Francisco%' then 375
      when city ilike '%Atlanta%' then 335
      when city ilike '%Seattle%' then 315
      when city ilike '%Boston%' then 315
      when city ilike '%Philadelphia%' then 305
      when city ilike '%Vancouver%' then 295
      when city ilike '%Houston%' then 285
      when city ilike '%Monterrey%' then 285
      when city ilike '%Kansas City%' then 275
      else 295
    end;
