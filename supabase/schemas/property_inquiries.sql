-- Property inquiries schema
-- Stores buyer/agent contact requests for listings.

CREATE TABLE IF NOT EXISTS public.property_inquiries (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id uuid NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    sender_name text NOT NULL,
    sender_email text NOT NULL,
    message text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_property_inquiries_property_id
    ON public.property_inquiries (property_id);

ALTER TABLE public.property_inquiries ENABLE ROW LEVEL SECURITY;

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
