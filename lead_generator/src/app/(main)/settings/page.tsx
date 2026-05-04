// app/settings/page.tsx (server)
import { auth0 } from '@/lib/auth0';
import prisma from "@/../lib/prisma";
import { NameForm } from './components/nameForm';
import { EmailForm } from './components/emailForm';
import { CancelSubscription } from './components/cancelSubscription';
import { redirect } from 'next/navigation';

export default async function SettingsPage() {
  const session = await auth0.getSession();
  if (!session) redirect('/auth/login');

  const user = await prisma.users.findUnique({
    where: { auth0_id: session.user.sub },
    select: {
      name: true,
      stripe_subscription_id: true,
      nextSubDate: true,
      next_sub: true,
      subscription: true,
    }
  });

  if (!user) redirect('/auth/login');

  const hasActiveSubscription =
    user.stripe_subscription_id &&
    user.next_sub != -1

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your account details and subscription.</p>
      </div>

      {/* Profile */}
      <section className="bg-white border border-gray-200 rounded-2xl divide-y divide-gray-100">
        <div className="p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Profile</h2>
          <div className="space-y-5">
            <NameForm currentName={user.name ?? ''} />
            <EmailForm currentEmail={''}/>
          </div>
        </div>
      </section>

      {/* Subscription */}
      <section className="bg-white border border-gray-200 rounded-2xl divide-y divide-gray-100">
        <div className="p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Subscription</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">
                {user.subscription == -1 && 'No active plan'}
              </p>
              {user.nextSubDate && user.next_sub != -1 && (
                <p className="text-xs text-gray-400 mt-0.5">
                  {user.next_sub === -1
                    ? `Cancels on ${new Date(user.nextSubDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`
                    : `Renews on ${new Date(user.nextSubDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`
                  }
                </p>
              )}
            </div>
            {hasActiveSubscription && (
              <CancelSubscription />
            )}
          </div>

          {user.next_sub === -1 && user.subscription != -1 && (
            <div className="mt-4 rounded-xl bg-amber-50 border border-amber-100 px-4 py-3">
              <p className="text-xs text-amber-700">
                Your subscription has been cancelled. You'll keep access until your billing period ends.
              </p>
            </div>
          )}
        </div>
      </section>
        {/* Logout */}
      <section className="bg-white border border-gray-200 rounded-2xl">
        <div className="p-6 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Logout</h2>
            <p className="text-xs text-gray-400 mt-0.5">Sign out of your account</p>
          </div>
          <a
            href="/auth/logout?returnTo=https://studious-space-disco-4jq7559qvv75357xx-3000.app.github.dev/"
            className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            Logout
          </a>
        </div>
      </section>
      
    </div>
  );
}