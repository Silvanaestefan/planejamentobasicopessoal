
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

CREATE POLICY "Users can update own safe profile fields"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
    AND is_subscribed = (SELECT p.is_subscribed FROM public.profiles p WHERE p.id = auth.uid())
    AND trial_start = (SELECT p.trial_start FROM public.profiles p WHERE p.id = auth.uid())
  );
