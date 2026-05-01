import { hasSeenOnboarding } from '@/services/onboardingService';
import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';

export default function IndexRoute() {
  const [hasSeen, setHasSeen] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true;

    const checkOnboardingState = async () => {
      const seen = await hasSeenOnboarding();
      if (isMounted) setHasSeen(seen);
    };

    checkOnboardingState();
    return () => {
      isMounted = false;
    };
  }, []);

  if (hasSeen === null) return null;

  return <Redirect href={hasSeen ? '/Dashboard' : '/Onboarding'} />;
}
