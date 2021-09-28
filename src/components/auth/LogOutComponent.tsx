import { Button } from '@chakra-ui/react';
import React from 'react';
import supabase from '../../SupabaseClient';

const LogOutComponent = () => {
    const handleClick = async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.log(error.message || 'ERROR');
      }
    };

    return (
      <>
        <Button
          onClick={handleClick}
        >
          LOG OUT
        </Button>

      </>

    );
};

export default LogOutComponent;
