"use client"
import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useConvex, useMutation, useQuery } from 'convex/react'
import React, { useEffect } from 'react'

function Dashboard() {
  const convex = useConvex();
  const {user}:any=useKindeBrowserClient();

  const getUser=useMutation(api.user.getUser);

  useEffect(() => {
    if (user) {
      checkUser();
    }
  }, [user]);

  const checkUser = async () => {
    const result = await convex.query(api.user.getUser, { email: user?.email });
    if (!result?.length) {
      createUser({
        name: user.given_name,
        email: user.email,
        image: user.picture
      }).then((resp) => {
        console.log(resp);
      });
    }
  }

  // Uncomment this if you plan to use it later
  // const getUser = useQuery(api.user.getUser, { email: user?.email });

  return (

export default Dashboard;