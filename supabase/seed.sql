CREATE EXTENSION IF NOT EXISTS pgcrypto;

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
    gen_random_uuid(),
    'user_' || gs || '@example.com',
    'dummy-password',
    now(),
    now(),
    now(),
    jsonb_build_object('first_name', 'User', 'last_name', gs::text),
    false,
    false
FROM generate_series(1, 100) AS gs
ON CONFLICT DO NOTHING;

INSERT INTO public.profiles (id, first_name, last_name, email, profile_picture, created_at, updated_at)
SELECT
    au.id,
    'User' || row_number() OVER (ORDER BY au.id),
    'Profile' || row_number() OVER (ORDER BY au.id),
    au.email,
    CASE
        WHEN row_number() OVER (ORDER BY au.id) % 10 = 0 THEN 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400'
        WHEN row_number() OVER (ORDER BY au.id) % 10 = 1 THEN 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400'
        WHEN row_number() OVER (ORDER BY au.id) % 10 = 2 THEN 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400'
        WHEN row_number() OVER (ORDER BY au.id) % 10 = 3 THEN 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400'
        WHEN row_number() OVER (ORDER BY au.id) % 10 = 4 THEN 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=400'
        WHEN row_number() OVER (ORDER BY au.id) % 10 = 5 THEN 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400'
        WHEN row_number() OVER (ORDER BY au.id) % 10 = 6 THEN 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
        WHEN row_number() OVER (ORDER BY au.id) % 10 = 7 THEN 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400'
        WHEN row_number() OVER (ORDER BY au.id) % 10 = 8 THEN 'https://images.pexels.com/photos/936229/pexels-photo-936229.jpeg?auto=compress&cs=tinysrgb&w=400'
        ELSE 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=400'
    END,
    now(),
    now()
FROM (
    SELECT au.id, au.email
    FROM auth.users au
    WHERE au.email LIKE 'user_%@example.com'
    ORDER BY au.created_at
    LIMIT 100
) au
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.agents (id, profile_id, agency, years_of_experience, created_at, updated_at)
SELECT
    gen_random_uuid(),
    p.id,
    CASE
        WHEN rn % 10 = 0 THEN 'Prime Property Group'
        WHEN rn % 10 = 1 THEN 'Urban Nest Realty'
        WHEN rn % 10 = 2 THEN 'Harbor & Heights'
        WHEN rn % 10 = 3 THEN 'Summit Living'
        WHEN rn % 10 = 4 THEN 'Crest & Co.'
        WHEN rn % 10 = 5 THEN 'Pine Valley Estates'
        WHEN rn % 10 = 6 THEN 'Luxe Horizon Homes'
        WHEN rn % 10 = 7 THEN 'BlueStone Realty'
        WHEN rn % 10 = 8 THEN 'Oak & Ember Homes'
        ELSE 'Southline Agents'
    END,
    (rn % 12) + 2,
    now(),
    now()
FROM (
    SELECT p.id, row_number() OVER (ORDER BY p.id) AS rn
    FROM public.profiles p
    ORDER BY p.id
    LIMIT 100
) p
ON CONFLICT DO NOTHING;

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
    gen_random_uuid(),
    (
        SELECT a.id
        FROM public.agents a
        ORDER BY a.created_at
        OFFSET ((gs - 1) % (SELECT COUNT(*) FROM public.agents))
        LIMIT 1
    ),
    'Property ' || gs,
    'Contemporary home designed for modern living with premium natural light, refined finishes, and comfortable indoor-outdoor flow.',
    (850000 + (gs * 125000))::numeric(12,2),
    gs || ' Example Street',
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
    END,
    CASE
        WHEN gs % 10 IN (0,3,8) THEN 'Gauteng'
        WHEN gs % 10 IN (1,4,7) THEN 'Western Cape'
        WHEN gs % 10 IN (2,9) THEN 'KwaZulu-Natal'
        WHEN gs % 10 = 5 THEN 'Limpopo'
        WHEN gs % 10 = 6 THEN 'Free State'
        ELSE 'Eastern Cape'
    END,
    LPAD((1000 + gs)::text, 4, '0'),
    CASE WHEN gs % 3 = 0 THEN 'House' WHEN gs % 3 = 1 THEN 'Apartment' ELSE 'TownHouse' END,
    (1 + (gs % 5)),
    (1 + (gs % 4)),
    (80 + (gs * 12)),
    (gs % 2 = 0),
    (gs % 3 = 0),
    (gs % 4 = 0),
    ARRAY[
        'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
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
    END,
    now(),
    now()
FROM generate_series(1, 100) AS gs
ON CONFLICT DO NOTHING;

INSERT INTO public.favourites (id, profile_id, property_id, created_at)
SELECT
    gen_random_uuid(),
    p.id,
    (
        SELECT prop.id
        FROM public.properties prop
        ORDER BY prop.created_at
        OFFSET ((p.rn - 1) % (SELECT COUNT(*) FROM public.properties))
        LIMIT 1
    ),
    now()
FROM (
    SELECT p.id, row_number() OVER (ORDER BY p.id) AS rn
    FROM public.profiles p
    ORDER BY p.id
    LIMIT 100
) p
ON CONFLICT DO NOTHING;

INSERT INTO public.property_inquiries (id, property_id, sender_name, sender_email, message, created_at)
SELECT
    gen_random_uuid(),
    (
        SELECT prop.id
        FROM public.properties prop
        ORDER BY prop.created_at
        OFFSET ((gs - 1) % (SELECT COUNT(*) FROM public.properties))
        LIMIT 1
    ),
    'Buyer ' || gs,
    'buyer_' || gs || '@example.com',
    'I would like to arrange a viewing for this property and would appreciate more details on the condition, pricing, and availability.',
    now()
FROM generate_series(1, 100) AS gs
ON CONFLICT DO NOTHING;
