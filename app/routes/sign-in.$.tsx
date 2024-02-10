import { SignIn } from '@clerk/remix';

export default function SignInPage() {
  return (
    <div className="h-screen w-screen grid place-items-center">
      <div className="self-start mt-60">
        <SignIn />
      </div>
    </div>
  );
}
