CREATE INDEX idx_agents_agency ON public.agents USING btree (agency);

CREATE INDEX idx_agents_profile_id ON public.agents USING btree (profile_id);

CREATE INDEX idx_favourites_profile_id ON public.favourites USING btree (profile_id);

CREATE INDEX idx_favourites_property_id ON public.favourites USING btree (property_id);

CREATE INDEX idx_profiles_email ON public.profiles USING btree (email);

CREATE INDEX idx_properties_agent_id ON public.properties USING btree (agent_id);

CREATE INDEX idx_properties_city ON public.properties USING btree (city);

CREATE INDEX idx_properties_price ON public.properties USING btree (price);

CREATE INDEX idx_properties_property_type ON public.properties USING btree (property_type);

CREATE INDEX idx_properties_province ON public.properties USING btree (province);

CREATE INDEX idx_property_inquiries_property_id ON public.property_inquiries USING btree (property_id);
