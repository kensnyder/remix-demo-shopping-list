import { Outlet } from '@remix-run/react';

export default function Shop() {
  return (
    <>
      <header>
        <h1>Shop</h1>
      </header>
      <Outlet />
    </>
  );
}
