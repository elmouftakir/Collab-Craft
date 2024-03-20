import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useQuery } from 'convex/react';
import React, { useEffect } from 'react';
import { useClient } from 'next/client';

