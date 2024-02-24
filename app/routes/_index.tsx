import { getAuth } from '@clerk/remix/ssr.server'
import { LoaderFunction, MetaFunction, redirect } from '@remix-run/node'

export const meta: MetaFunction = () => {
	return [{ title: 'SleepTube' }]
}

export const loader: LoaderFunction = async (args) => {
	const { userId } = await getAuth(args)
	if (!userId) return redirect('/sign-in')
	return redirect('/playlist')
}

export default function Index() {
	return <></>
}
