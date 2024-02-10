import { SignOutButton } from '@clerk/remix';
import { getAuth } from '@clerk/remix/ssr.server';
import { redirect, type LoaderFunction, type MetaFunction } from '@remix-run/node';
import { useNavigate } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export const loader: LoaderFunction = async (args) => {
  const { userId } = await getAuth(args);
  if (!userId) {
    return redirect('/sign-in');
  }
  return {};
};

export default function Index() {
  const navigate = useNavigate();
  const handleSignOut = () => {
    navigate('/sign-in');
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <h1>Welcome to Remix</h1>
      <SignOutButton signOutCallback={handleSignOut} />
    </div>
  );
}
