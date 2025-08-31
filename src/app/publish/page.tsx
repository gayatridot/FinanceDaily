import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function PublishPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-body text-foreground">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/">
            <h1 className="text-2xl font-bold tracking-tight text-primary font-headline">
              Finance Daily
            </h1>
          </Link>
          <Link href="/" className="text-sm font-medium text-primary hover:underline">
            Back to App
          </Link>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 md:p-6">
        <div className="mx-auto max-w-3xl space-y-8">
          <Card className="shadow-md transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-xl md:text-2xl">Publishing Your App</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-lg">
              <p>
                Your application is ready to be published to the web using Firebase App Hosting.
              </p>
              <div className="space-y-2">
                <h3 className="font-semibold">Using the Firebase Console:</h3>
                <ol className="list-decimal list-inside space-y-2">
                  <li>
                    Go to the{' '}
                    <a
                      href="https://console.firebase.google.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline"
                    >
                      Firebase Console
                    </a>
                    .
                  </li>
                  <li>
                    Select your project and navigate to the "App Hosting" section.
                  </li>
                  <li>
                    Follow the instructions to connect your GitHub repository and set up automatic deployments.
                  </li>
                </ol>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Using the Command Line (CLI):</h3>
                <ol className="list-decimal list-inside space-y-2">
                  <li>
                    Install the Firebase CLI by running{' '}
                    <code className="bg-muted px-2 py-1 rounded-md">npm install -g firebase-tools</code> in your
                    terminal.
                  </li>
                  <li>
                    Log in to your Google account by running{' '}
                    <code className="bg-muted px-2 py-1 rounded-md">firebase login</code>.
                  </li>
                  <li>
                    Inside your project directory, deploy your app using the command:{' '}
                    <code className="bg-muted px-2 py-1 rounded-md">firebase deploy --only apphosting</code>.
                  </li>
                </ol>
              </div>
              <p>
                Once deployed, your app will be available at a public URL provided by Firebase.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="py-6 mt-8 border-t bg-background">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Finance Daily. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
