CREATE EXTENSION IF NOT EXISTS pgcrypto;

WITH user_rows AS (
    SELECT
        gs AS n,
        gen_random_uuid() AS uid
    FROM generate_series(1, 100) AS gs
)
INSERT INTO auth.users (
    id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_user_meta_data,
    is_super_admin,
    is_anonymous
)
SELECT
    uid,
    'user_' || n || '@example.com',
    'dummy-password',
    now(),
    now(),
    now(),
    jsonb_build_object('first_name', 'User', 'last_name', n::text),
    false,
    false
FROM user_rows
ON CONFLICT (id) DO NOTHING;

WITH user_rows AS (
    SELECT
        gs AS n,
        id AS uid
    FROM auth.users au
    JOIN generate_series(1, 100) AS gs ON au.email = 'user_' || gs || '@example.com'
)
INSERT INTO public.profiles (id, first_name, last_name, email, profile_picture, created_at, updated_at)
SELECT
    uid,
    'User' || n,
    'Profile' || n,
    'user_' || n || '@example.com',
    CASE
        WHEN n % 10 = 0 THEN 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400'
        WHEN n % 10 = 1 THEN 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400'
        WHEN n % 10 = 2 THEN 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400'
        WHEN n % 10 = 3 THEN 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400'
        WHEN n % 10 = 4 THEN 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=400'
        WHEN n % 10 = 5 THEN 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400'
        WHEN n % 10 = 6 THEN 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
        WHEN n % 10 = 7 THEN 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400'
        WHEN n % 10 = 8 THEN 'https://images.pexels.com/photos/936229/pexels-photo-936229.jpeg?auto=compress&cs=tinysrgb&w=400'
        ELSE 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=400'
    END,
    now(),
    now()
FROM user_rows
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.agents (id, profile_id, agency, years_of_experience, created_at, updated_at)
SELECT
    gen_random_uuid(),
    p.id,
    CASE
        WHEN p.id::text LIKE '%0' THEN 'Prime Property Group'
        WHEN p.id::text LIKE '%1' THEN 'Urban Nest Realty'
        WHEN p.id::text LIKE '%2' THEN 'Harbor & Heights'
        WHEN p.id::text LIKE '%3' THEN 'Summit Living'
        WHEN p.id::text LIKE '%4' THEN 'Crest & Co.'
        WHEN p.id::text LIKE '%5' THEN 'Pine Valley Estates'
        WHEN p.id::text LIKE '%6' THEN 'Luxe Horizon Homes'
        WHEN p.id::text LIKE '%7' THEN 'BlueStone Realty'
        WHEN p.id::text LIKE '%8' THEN 'Oak & Ember Homes'
        ELSE 'Southline Agents'
    END,
    (row_number() OVER (ORDER BY p.id) % 12) + 2,
    now(),
    now()
FROM public.profiles p
ORDER BY p.id
LIMIT 100;

WITH property_seed AS (
    SELECT
        gs AS n,
        gen_random_uuid() AS pid,
        a.id AS agent_id,
        'Property ' || gs AS title,
        'Contemporary home designed for modern living with premium natural light, refined finishes, and comfortable indoor-outdoor flow.' AS description,
        (850000 + (gs * 125000))::numeric(12,2) AS price,
        gs || ' Example Street' AS address,
        CASE
            WHEN gs % 10 = 0 THEN 'Johannesburg'
            WHEN gs % 10 = 1 THEN 'Cape Town'
            WHEN gs % 10 = 2 THEN 'Durban'
            WHEN gs % 10 = 3 THEN 'Pretoria'
            WHEN gs % 10 = 4 THEN 'Stellenbosch'
            WHEN gs % 10 = 5 THEN 'Polokwane'
            WHEN gs % 10 = 6 THEN 'Bloemfontein'
            WHEN gs % 10 = 7 THEN 'Knysna'
            WHEN gs % 10 = 8 THEN 'Sandton'
            ELSE 'George'
        END AS city,
        CASE
            WHEN gs % 10 IN (0,3,8) THEN 'Gauteng'
            WHEN gs % 10 IN (1,4,7) THEN 'Western Cape'
            WHEN gs % 10 IN (2,9) THEN 'KwaZulu-Natal'
            WHEN gs % 10 = 5 THEN 'Limpopo'
            WHEN gs % 10 = 6 THEN 'Free State'
            ELSE 'Eastern Cape'
        END AS province,
        LPAD((1000 + gs)::text, 4, '0') AS zipcode,
        CASE WHEN gs % 3 = 0 THEN 'House' WHEN gs % 3 = 1 THEN 'Apartment' ELSE 'TownHouse' END AS property_type,
        (1 + (gs % 5)) AS bedrooms,
        (1 + (gs % 4)) AS bathrooms,
        (80 + (gs * 12)) AS square_meters,
        (gs % 2 = 0) AS garage,
        (gs % 3 = 0) AS garden,
        (gs % 4 = 0) AS swimming_pool,
        ARRAY[
            'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/2011061/pexels-photo-2011061.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/2131822/pexels-photo-2131822.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/2119714/pexels-photo-2119714.jpeg?auto=compress&cs=tinysrgb&w=1200'
        ][((gs - 1) % 10) + 1 : ((gs - 1) % 10) + 4] AS images,
        CASE
            WHEN gs % 10 = 0 THEN 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1200'
            WHEN gs % 10 = 1 THEN 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200'
            WHEN gs % 10 = 2 THEN 'https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg?auto=compress&cs=tinysrgb&w=1200'
            WHEN gs % 10 = 3 THEN 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1200'
            WHEN gs % 10 = 4 THEN 'https://images.pexels.com/photos/2011061/pexels-photo-2011061.jpeg?auto=compress&cs=tinysrgb&w=1200'
            WHEN gs % 10 = 5 THEN 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200'
            WHEN gs % 10 = 6 THEN 'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1200'
            WHEN gs % 10 = 7 THEN 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1200'
            WHEN gs % 10 = 8 THEN 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1200'
            ELSE 'https://images.pexels.com/photos/2119714/pexels-photo-2119714.jpeg?auto=compress&cs=tinysrgb&w=1200'
        END AS cover_img
    FROM generate_series(1, 100) AS gs
    JOIN public.agents a ON a.id = (
        SELECT id
        FROM public.agents
        ORDER BY created_at
        OFFSET ((gs - 1) % (SELECT count(*) FROM public.agents))
        LIMIT 1
    )
)
INSERT INTO public.properties (
    id,
    agent_id,
    title,
    description,
    price,
    address,
    city,
    province,
    zipcode,
    property_type,
    bedrooms,
    bathrooms,
    square_meters,
    garage,
    garden,
    swimming_pool,
    images,
    cover_img,
    created_at,
    updated_at
)
SELECT
    pid,
    agent_id,
    title,
    description,
    price,
    address,
    city,
    province,
    zipcode,
    property_type,
    bedrooms,
    bathrooms,
    square_meters,
    garage,
    garden,
    swimming_pool,
    images,
    cover_img,
    now(),
    now()
FROM property_seed
ON CONFLICT (id) DO NOTHING;

WITH fav_pairs AS (
    SELECT
        p.id AS profile_id,
        prop.id AS property_id,
        row_number() OVER (ORDER BY p.id, prop.id) AS rn
    FROM public.profiles p
    CROSS JOIN public.properties prop
), favourites_seed AS (
    SELECT
        gen_random_uuid() AS id,
        profile_id,
        property_id
    FROM fav_pairs
    WHERE rn <= 100
)
INSERT INTO public.favourites (id, profile_id, property_id, created_at)
SELECT
    id,
    profile_id,
    property_id,
    now()
FROM favourites_seed
ON CONFLICT DO NOTHING;

WITH inquiry_seed AS (
    SELECT
        gs AS n,
        prop.id AS property_id
    FROM generate_series(1, 100) AS gs
    JOIN public.properties prop ON prop.id = (
        SELECT id
        FROM public.properties
        ORDER BY created_at
        OFFSET ((gs - 1) % (SELECT count(*) FROM public.properties))
        LIMIT 1
    )
)
INSERT INTO public.property_inquiries (id, property_id, sender_name, sender_email, message, created_at)
SELECT
    gen_random_uuid(),
    property_id,
    'Buyer ' || n,
    'buyer_' || n || '@example.com',
    'I would like to arrange a viewing for this property and would appreciate more details on the condition, pricing, and availability.',
    now()
FROM inquiry_seed
ON CONFLICT DO NOTHING;
