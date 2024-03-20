import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useQuery } from 'convex/react';
import React, { useEffect } from 'react';
import { useClient } from 'next/client';

// Define the Dashboard component
function Dashboard() {
  const { user }: any = useKindeBrowserClient();
  const getUser = useQuery(api.user.getUser, { email: user?.email });

  useEffect(() => {
    if (user) {
      getUser().then((userData: any) => {
        console.log(userData);
      });
    }
  }, [user, getUser]);

  return (
    <div>
      <Button>
        <LogoutLink>Logout</LogoutLink>
      </Button>
    </div>
  );
}

// Mark the Dashboard component as a Client Component
export default useClient(Dashboard);