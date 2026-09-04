CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    aud,
    role,
    confirmation_token,
    recovery_token,
    email_change_token_new,
    email_change,
    phone_change_token,
    phone_change,
    email_change_token_current,
    reauthentication_token,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    is_anonymous
)
SELECT
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000000',
    lower((ARRAY['Thabo','Lerato','Anele','Mpho','Naledi','Sipho','Zanele','Kagiso','Ayanda','Bongani','Karabo','Nomsa','Themba','Precious','Sibusiso','Nandi','Lunga','Masego','Tshepo','Refilwe'])[ ((gs - 1) % 20) + 1 ] || '.' || gs || '@example.com'),
    '$2a$10$Q7njxBzQi4QVnC4nOz9O5OyjrpHxTxXcggzDjh73QbzcqtiCDQ9mu',
    'authenticated',
    'authenticated',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    now(),
    now(),
    now(),
    jsonb_build_object('provider', 'email', 'providers', jsonb_build_array('email')),
    jsonb_build_object(
        'first_name', (ARRAY['Thabo','Lerato','Anele','Mpho','Naledi','Sipho','Zanele','Kagiso','Ayanda','Bongani','Karabo','Nomsa','Themba','Precious','Sibusiso','Nandi','Lunga','Masego','Tshepo','Refilwe'])[ ((gs - 1) % 20) + 1 ],
        'last_name', (ARRAY['Mokoena','Dlamini','Ndlovu','Mthembu','Van Wyk','Naidoo','Molefe','Botha','Mabena','Pillay','Mahlangu','Jacobs','Mthethwa','Sithole','Mkhize','Williams','Molefe','Nkosi','Pretorius','Radebe'])[ ((gs - 1) % 20) + 1 ]
    ),
    false,
    false
FROM generate_series(1, 100) AS gs
ON CONFLICT DO NOTHING;

INSERT INTO auth.identities (provider_id, user_id, identity_data, provider, created_at, updated_at)
SELECT
    au.id::text,
    au.id,
    jsonb_build_object(
        'sub', au.id::text,
        'email', au.email,
        'email_verified', true,
        'phone_verified', false
    ),
    'email',
    au.created_at,
    au.updated_at
FROM auth.users au
WHERE au.email ~ '^[a-z]+\.[0-9]+@example\.com$'
ON CONFLICT DO NOTHING;

INSERT INTO public.profiles (id, first_name, last_name, email, profile_picture, created_at, updated_at)
SELECT
    au.id,
    (ARRAY['Thabo','Lerato','Anele','Mpho','Naledi','Sipho','Zanele','Kagiso','Ayanda','Bongani','Karabo','Nomsa','Themba','Precious','Sibusiso','Nandi','Lunga','Masego','Tshepo','Refilwe'])[ ((substring(au.email FROM '\.([0-9]+)@')::integer - 1) % 20) + 1 ],
    (ARRAY['Mokoena','Dlamini','Ndlovu','Mthembu','Van Wyk','Naidoo','Molefe','Botha','Mabena','Pillay','Mahlangu','Jacobs','Mthethwa','Sithole','Mkhize','Williams','Molefe','Nkosi','Pretorius','Radebe'])[ ((substring(au.email FROM '\.([0-9]+)@')::integer - 1) % 20) + 1 ],
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
    WHERE au.email ~ '^[a-z]+\.[0-9]+@example\.com$'
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
    (ARRAY['Sunlit Family Retreat','Modern City Garden Home','The Oakview Residence','Coastal Breeze Apartment','Serene Stellenbosch Villa','Parkside Entertainer','The Highveld Haven','Lakeside Contemporary Home','Elegant Sandton Residence','Mountain View Townhouse','The Willow Lane House','Urban Loft with Rooftop Views','Quiet Cornerstone Cottage','The Palm House','Golden Hour Garden Estate','Secure North-facing Home','The Courtyard Residence','Blue Crane Family Home','The Glasshouse Villa','The Heritage Park Home'])[ ((gs - 1) % 20) + 1 ],
    (ARRAY['A welcoming family home with generous living spaces, a bright kitchen, and a private garden made for relaxed weekends and easy entertaining.','Designed for effortless city living, this well-appointed residence pairs clean lines with warm finishes, secure parking, and excellent access to local amenities.','Set in a quiet established neighbourhood, this home offers generous bedrooms, flowing reception areas, and mature trees that create a peaceful everyday setting.','An easy-care apartment with open-plan living, a covered balcony, and contemporary finishes. Ideal for professionals seeking comfort, security, and a convenient address.','A refined villa surrounded by vineyards and mountain views, with spacious entertaining areas, a private garden, and the calm atmosphere of the Cape Winelands.','Perfect for hosting, this bright property features a sociable kitchen, covered patio, sparkling pool, and a practical layout for modern family life.','A comfortable Highveld home with excellent natural light, a fireplace, and flexible rooms that work equally well for family living, guests, or a home office.','Enjoy relaxed lakeside living in this modern residence with wide windows, generous accommodation, and outdoor spaces that make the most of its tranquil setting.','A polished urban residence with sophisticated finishes, secure access, and effortless entertaining areas close to restaurants, offices, and shopping.','A beautifully planned townhouse with mountain outlooks, low-maintenance gardens, and bright open-plan interiors suited to lock-up-and-go living.','A warm and inviting home on a leafy street, offering a generous garden, comfortable proportions, and a thoughtful floor plan for growing families.','A stylish loft with double-volume proportions, contemporary finishes, and rooftop views across the city. A distinctive home for buyers who value space and character.','Tucked away from the bustle, this charming cottage combines practical modern upgrades with a private garden and a relaxed, homely feel.','A light-filled home framed by palms and lush planting, with spacious living areas, excellent bedroom accommodation, and a private outdoor entertaining zone.','An impressive garden estate with beautifully proportioned interiors, generous lawns, and a covered entertainment area for memorable gatherings.','A secure north-facing residence with warm winter light, versatile living areas, and a neat garden that is easy to enjoy and maintain.','Built around a sunny central courtyard, this residence brings natural light into every room and offers an inviting balance of privacy and connection.','A well-kept family property with generous accommodation, a practical kitchen, and peaceful outdoor space in a welcoming community.','A striking contemporary villa with glass-fronted living spaces, premium finishes, and a seamless connection to the landscaped garden and pool.','A character-rich home near a landscaped park, blending classic details with modern comforts and an easy, family-friendly layout.'])[ ((gs - 1) % 20) + 1 ],
    (850000 + (gs * 125000))::numeric(12,2),
    (ARRAY['12 Jacaranda Crescent','48 Lagoon Drive','7 Protea Lane','19 Acacia Avenue','31 Vineyard Road','5 Parkview Close','62 Aloe Street','14 Lakeview Road','9 Melrose Boulevard','27 Mountain Rise','3 Willow Avenue','18 Market Street','44 Cornerstone Road','6 Palm Crescent','81 Golden Hour Drive','22 Northgate Lane','10 Courtyard Road','36 Blue Crane Street','4 Glasshouse Way','55 Heritage Park'])[ ((gs - 1) % 20) + 1 ],
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
    (ARRAY['Mariam Khumalo','David Botha','Sibongile Maseko','Ethan Jacobs','Lindiwe Mthembu','Jason Naidoo','Palesa Radebe','Michael Dlamini','Carmen Williams','Andile Ndlovu'])[ ((gs - 1) % 10) + 1 ],
    'inquiry_' || gs || '@example.com',
    (ARRAY['I am interested in arranging a viewing and would like to know whether the property is still available.','Could you please share more information about the levies, utilities, and recent improvements to the property?','This looks like a great fit for our family. Please let me know which viewing times are available this week.','I would appreciate details about the neighbourhood, parking arrangements, and expected transfer timeline.','Are there any additional costs or special conditions attached to the sale? I would be happy to discuss an offer after viewing.'])[ ((gs - 1) % 5) + 1 ],
    now()
FROM generate_series(1, 100) AS gs
ON CONFLICT DO NOTHING;
