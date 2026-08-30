-- Favourites / wishlist schema
-- Stores the user's saved property selections.

CREATE TABLE IF NOT EXISTS public.favourites (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    property_id uuid NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    created_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (profile_id, property_id)
);

CREATE INDEX IF NOT EXISTS idx_favourites_profile_id
    ON public.favourites (profile_id);

CREATE INDEX IF NOT EXISTS idx_favourites_property_id
    ON public.favourites (property_id);

ALTER TABLE public.favourites ENABLE ROW LEVEL SECURITY;

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
