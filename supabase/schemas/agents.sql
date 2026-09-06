-- Agents schema
-- Matches the application's existing usage: agent profile, agency name, and years of experience.

CREATE TABLE IF NOT EXISTS public.agents (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id uuid NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
    agency text NOT NULL,
    years_of_experience integer NOT NULL DEFAULT 0 CHECK (years_of_experience >= 0),
    bio varchar(255),
    rating numeric(2,1) NOT NULL DEFAULT 0.0
        CONSTRAINT agents_rating_range_check CHECK (rating >= 0 AND rating <= 5),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_agents_profile_id
    ON public.agents (profile_id);

CREATE INDEX IF NOT EXISTS idx_agents_agency
    ON public.agents (agency);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_agents_updated_at ON public.agents;
CREATE TRIGGER trg_agents_updated_at
BEFORE UPDATE ON public.agents
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;

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
