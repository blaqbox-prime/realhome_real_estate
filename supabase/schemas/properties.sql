-- Properties schema
-- Matches the application's property listings, metadata, and image handling.

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

CREATE INDEX IF NOT EXISTS idx_properties_agent_id
    ON public.properties (agent_id);

CREATE INDEX IF NOT EXISTS idx_properties_city
    ON public.properties (city);

CREATE INDEX IF NOT EXISTS idx_properties_province
    ON public.properties (province);

CREATE INDEX IF NOT EXISTS idx_properties_property_type
    ON public.properties (property_type);

CREATE INDEX IF NOT EXISTS idx_properties_price
    ON public.properties (price);

DROP TRIGGER IF EXISTS trg_properties_updated_at ON public.properties;
CREATE TRIGGER trg_properties_updated_at
BEFORE UPDATE ON public.properties
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

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
