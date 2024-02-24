import { RedirectToSignIn, SignOutButton as ClerkSignOutButton, SignedOut } from '@clerk/remix'

type Props = {
	label: string
}

export const SignOutButton = ({ label }: Props) => {
	return (
		<ClerkSignOutButton>
			<button type='button' className='btn bg-yellow-300'>
				{label}
			</button>
			<SignedOut>
				<RedirectToSignIn />
			</SignedOut>
		</ClerkSignOutButton>
	)
}
