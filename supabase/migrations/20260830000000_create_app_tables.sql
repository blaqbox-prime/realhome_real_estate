CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS public.profiles (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name text,
    last_name text,
    email text,
    profile_picture text,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.agents (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id uuid NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
    agency text NOT NULL,
    years_of_experience integer NOT NULL DEFAULT 0 CHECK (years_of_experience >= 0),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.properties (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id uuid NOT NULL REFERENCES public.agents(id) ON DELETE CASCADE,
    title text NOT NULL,
    description text NOT NULL,
    price numeric(12,2) NOT NULL CHECK (price >= 0),
    address text NOT NULL,
    city text NOT NULL,
    province text NOT NULL,
    zipcode text,
    property_type text NOT NULL DEFAULT 'House',
    bedrooms integer NOT NULL DEFAULT 1 CHECK (bedrooms >= 0),
    bathrooms integer NOT NULL DEFAULT 1 CHECK (bathrooms >= 0),
    square_meters integer NOT NULL DEFAULT 0 CHECK (square_meters >= 0),
    garage boolean NOT NULL DEFAULT false,
    garden boolean NOT NULL DEFAULT false,
    swimming_pool boolean NOT NULL DEFAULT false,
    images text[] NOT NULL DEFAULT '{}',
    cover_img text,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.favourites (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    property_id uuid NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    created_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (profile_id, property_id)
);

CREATE TABLE IF NOT EXISTS public.property_inquiries (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id uuid NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    sender_name text NOT NULL,
    sender_email text NOT NULL,
    message text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER trg_agents_updated_at
BEFORE UPDATE ON public.agents
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER trg_properties_updated_at
BEFORE UPDATE ON public.properties
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favourites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are viewable by everyone"
    ON public.profiles
    FOR SELECT
    USING (true);

CREATE POLICY "Users can insert their own profile"
    ON public.profiles
    FOR INSERT
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON public.profiles
    FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can delete their own profile"
    ON public.profiles
    FOR DELETE
    USING (auth.uid() = id);

CREATE POLICY "Agents are viewable by everyone"
    ON public.agents
    FOR SELECT
    USING (true);

CREATE POLICY "Users can create their own agent record"
    ON public.agents
    FOR INSERT
    WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can update their own agent record"
    ON public.agents
    FOR UPDATE
    USING (auth.uid() = profile_id)
    WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can delete their own agent record"
    ON public.agents
    FOR DELETE
    USING (auth.uid() = profile_id);

CREATE POLICY "Properties are viewable by everyone"
    ON public.properties
    FOR SELECT
    USING (true);

CREATE POLICY "Agents can create their own property records"
    ON public.properties
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1
            FROM public.agents a
            WHERE a.id = agent_id
              AND a.profile_id = auth.uid()
        )
    );

CREATE POLICY "Agents can update their own properties"
    ON public.properties
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1
            FROM public.agents a
            WHERE a.id = agent_id
              AND a.profile_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1
            FROM public.agents a
            WHERE a.id = agent_id
              AND a.profile_id = auth.uid()
        )
    );

CREATE POLICY "Agents can delete their own properties"
    ON public.properties
    FOR DELETE
    USING (
        EXISTS (
            SELECT 1
            FROM public.agents a
            WHERE a.id = agent_id
              AND a.profile_id = auth.uid()
        )
    );

CREATE POLICY "Users can view their own favourites"
    ON public.favourites
    FOR SELECT
    USING (auth.uid() = profile_id);

CREATE POLICY "Users can insert their own favourites"
    ON public.favourites
    FOR INSERT
    WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can delete their own favourites"
    ON public.favourites
    FOR DELETE
    USING (auth.uid() = profile_id);

CREATE POLICY "Anyone can submit a property inquiry"
    ON public.property_inquiries
    FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Users can view inquiries for their own properties"
    ON public.property_inquiries
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1
            FROM public.properties p
            JOIN public.agents a ON a.id = p.agent_id
            WHERE p.id = property_id
              AND a.profile_id = auth.uid()
        )
    );
