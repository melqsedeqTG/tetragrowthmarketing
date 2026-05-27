-- Webinar registrations table
CREATE TABLE public.webinar_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  company TEXT NOT NULL,
  revenue_range TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.webinar_registrations ENABLE ROW LEVEL SECURITY;

-- Anyone (anonymous visitors) can submit a registration
CREATE POLICY "Anyone can register for webinar"
  ON public.webinar_registrations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(name) BETWEEN 1 AND 120
    AND char_length(email) BETWEEN 3 AND 255
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND char_length(whatsapp) BETWEEN 8 AND 30
    AND char_length(company) BETWEEN 1 AND 150
    AND revenue_range IN (
      'ate-50k', '50k-200k', '200k-500k', '500k-1mi', '1mi-5mi', 'acima-5mi'
    )
  );

-- No public read access; only service role / dashboard can view leads
-- (intentionally no SELECT policy — RLS denies by default)

CREATE INDEX idx_webinar_registrations_created_at
  ON public.webinar_registrations (created_at DESC);
