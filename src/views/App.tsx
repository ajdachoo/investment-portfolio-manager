import React from 'react';
import { AppShell, Avatar, Button, Flex, useMantineTheme } from '@mantine/core';


function App() {
  const theme = useMantineTheme();


  return (
    <AppShell
      layout='default'
      header={{ height: 90 }}
      navbar={{
        width: 200,
        breakpoint: 0,
      }}
      padding='md'
    >
      <AppShell.Header>
        <Flex
          justify='space-between'
          align='center'
          gap='md'
          p='md'
        >
          <p>InvestmentPortfolioManager</p>
          <Flex
            align='center'
            gap='sm'
          >
            <p>Name Surname</p>
            <Avatar color={theme.primaryColor}>AC</Avatar>
          </Flex>
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar
        p='md'
      >
        <Button variant='filled' color="yellow">Dupa</Button>
      </AppShell.Navbar>
      <AppShell.Main>
        <Button variant='filled'>Dupa</Button>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
