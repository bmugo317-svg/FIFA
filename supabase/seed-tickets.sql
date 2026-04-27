-- CupRadar real-world World Cup 2026 host venue seed data
-- Run this in Supabase SQL Editor.
-- Important: these are NOT verified ticket inventory rows.
-- They use real host-city/venue information and known tournament anchor dates.
-- Keep status='coming_soon' until you have verified inventory or authorized resale rights.
-- Change status to 'available' only for tickets you can legally sell.

insert into tickets
(match, venue, city, match_date, category, price, currency, available, status)
values
(
  'Opening Match - Mexico City',
  'Estadio Azteca',
  'Mexico City, Mexico',
  'June 11, 2026',
  'Official inventory pending',
  0,
  'USD',
  0,
  'coming_soon'
),
(
  'Opening Day Match - Guadalajara',
  'Estadio Akron',
  'Guadalajara, Mexico',
  'June 11, 2026',
  'Official inventory pending',
  0,
  'USD',
  0,
  'coming_soon'
),
(
  'Opening Day Match - Toronto',
  'BMO Field',
  'Toronto, Canada',
  'June 12, 2026',
  'Official inventory pending',
  0,
  'USD',
  0,
  'coming_soon'
),
(
  'Opening Day Match - Los Angeles',
  'SoFi Stadium',
  'Los Angeles, USA',
  'June 12, 2026',
  'Official inventory pending',
  0,
  'USD',
  0,
  'coming_soon'
),
(
  'Host Venue Listing - Vancouver',
  'BC Place',
  'Vancouver, Canada',
  'June-July 2026',
  'Official inventory pending',
  0,
  'USD',
  0,
  'coming_soon'
),
(
  'Host Venue Listing - Seattle',
  'Lumen Field',
  'Seattle, USA',
  'June-July 2026',
  'Official inventory pending',
  0,
  'USD',
  0,
  'coming_soon'
),
(
  'Host Venue Listing - San Francisco Bay Area',
  'Levi''s Stadium',
  'San Francisco Bay Area, USA',
  'June-July 2026',
  'Official inventory pending',
  0,
  'USD',
  0,
  'coming_soon'
),
(
  'Host Venue Listing - Houston',
  'NRG Stadium',
  'Houston, USA',
  'June-July 2026',
  'Official inventory pending',
  0,
  'USD',
  0,
  'coming_soon'
),
(
  'Host Venue Listing - Dallas',
  'AT&T Stadium',
  'Dallas, USA',
  'June-July 2026',
  'Official inventory pending',
  0,
  'USD',
  0,
  'coming_soon'
),
(
  'Host Venue Listing - Kansas City',
  'Arrowhead Stadium',
  'Kansas City, USA',
  'June-July 2026',
  'Official inventory pending',
  0,
  'USD',
  0,
  'coming_soon'
),
(
  'Host Venue Listing - Atlanta',
  'Mercedes-Benz Stadium',
  'Atlanta, USA',
  'June-July 2026',
  'Official inventory pending',
  0,
  'USD',
  0,
  'coming_soon'
),
(
  'Host Venue Listing - Miami',
  'Hard Rock Stadium',
  'Miami, USA',
  'June-July 2026',
  'Official inventory pending',
  0,
  'USD',
  0,
  'coming_soon'
),
(
  'Host Venue Listing - Boston',
  'Gillette Stadium',
  'Boston, USA',
  'June-July 2026',
  'Official inventory pending',
  0,
  'USD',
  0,
  'coming_soon'
),
(
  'Host Venue Listing - Philadelphia',
  'Lincoln Financial Field',
  'Philadelphia, USA',
  'June-July 2026',
  'Official inventory pending',
  0,
  'USD',
  0,
  'coming_soon'
),
(
  'Host Venue Listing - New York/New Jersey',
  'MetLife Stadium',
  'New York/New Jersey, USA',
  'June-July 2026',
  'Official inventory pending',
  0,
  'USD',
  0,
  'coming_soon'
),
(
  'Final - New York/New Jersey',
  'MetLife Stadium',
  'New York/New Jersey, USA',
  'July 19, 2026',
  'Official inventory pending',
  0,
  'USD',
  0,
  'coming_soon'
),
(
  'Host Venue Listing - Monterrey',
  'Estadio BBVA',
  'Monterrey, Mexico',
  'June-July 2026',
  'Official inventory pending',
  0,
  'USD',
  0,
  'coming_soon'
);
