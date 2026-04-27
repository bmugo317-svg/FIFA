-- CupRadar update-only SQL
-- Use this if ticket rows already exist in Supabase.
-- Paste the entire file into Supabase SQL Editor and run it.

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
