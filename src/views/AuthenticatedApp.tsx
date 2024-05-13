import React from 'react';
import { AppShell, Avatar, Flex, Menu, rem, useMantineTheme } from '@mantine/core';
import { LogOutIcon } from 'assets/icons/logOutIcon';
import Navigation from '../components/organisms/Navigation';
import { useAuth } from 'hooks/useAuth';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import AssetsTable from 'components/organisms/AssetsTable';
import WalletsSection from 'components/organisms/WalletsSection';
import WalletDetails from 'components/organisms/WalletDetails';
import WalletPositions from 'components/organisms/WalletPositions';
import WalletTransactions from 'components/organisms/WalletTransactions';


const App = () => {
  const theme = useMantineTheme();
  const { user, signOut } = useAuth();

  return (
    <AppShell layout='default'
      header={{ height: 90 }}
      navbar={{
        width: 200,
        breakpoint: 0,
      }}
      padding='md'
    >
      <AppShell.Header>
        <Flex justify='space-between' align='center' gap='md' p='md'>
          <p>InvestmentPortfolioManager</p>
          <Menu trigger="hover" openDelay={100} closeDelay={100} width='target'>
            <Menu.Target>
              <Flex align='center' gap='sm' style={{ cursor: 'pointer' }}>
                <p>{`${user?.firstName} ${user?.lastName}`}</p>
                <Avatar color={theme.primaryColor}>{`${user?.firstName[0]}${user?.lastName[0]}`}</Avatar>
              </Flex>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item component={Link} to='/login' color='red' leftSection={<LogOutIcon style={{ width: rem(14), height: rem(14) }} />} onClick={() => signOut()}>
                Sign out
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar>
        <Navigation />
      </AppShell.Navbar>
      <AppShell.Main display='flex' style={{ justifyContent: 'center' }}>
        <Routes>
          <Route path="/login" element={<Navigate to={'/wallets'} />} />
          <Route path="/wallets" element={<WalletsSection />} />
          <Route path='/wallets/:walletId' element={<WalletDetails />} />
          <Route path='/wallets/:walletId/category/:categoryId' element={<WalletPositions />} />
          <Route path='/wallets/:walletId/category/:categoryId/transaction/:assetId' element={<WalletTransactions />} />
          <Route path="/assets" element={<AssetsTable />} />
        </Routes>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
