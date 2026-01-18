import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Activity,
  Droplets,
  Heart,
  MapPin,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Logo } from '@/components/icons';

const features = [
  {
    icon: <Heart className="h-8 w-8 text-primary" />,
    title: 'Smart Matching',
    description:
      'Our AI intelligently matches donors with patients based on a comprehensive set of criteria.',
  },
  {
    icon: <MapPin className="h-8 w-8 text-primary" />,
    title: 'Live Location Tracking',
    description:
      'Find nearby donors in real-time when emergencies strike, minimizing response time.',
  },
  {
    icon: <Truck className="h-8 w-8 text-primary" />,
    title: 'Optimal Transport Routes',
    description:
      'AI-powered logistics ensure that blood supplies reach their destination as quickly as possible.',
  },
  {
    icon: <Droplets className="h-8 w-8 text-primary" />,
    title: 'Predictive Demand',
    description:
      'We use machine learning to forecast blood demand, helping to prevent shortages.',
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: 'Personalized Health Insights',
    description:
      'Receive health insights based on your donation history to encourage a healthy lifestyle.',
  },
  {
    icon: <Activity className="h-8 w-8 text-primary" />,
    title: 'Emergency Intercept',
    description:
      'Receive high-priority alerts when your blood type is needed urgently in your area.',
  },
];

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-image');

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <Logo className="h-6 w-6 text-primary" />
          <span className="sr-only">DonorConnect</span>
        </Link>
        <h1 className="ml-2 text-2xl font-bold text-foreground">DonorConnect</h1>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/dashboard"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Donor Portal
          </Link>
          <Link
            href="/admin"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Admin Portal
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  data-ai-hint={heroImage.imageHint}
                  width={600}
                  height={600}
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                />
              )}
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Connecting Life-Savers with Life-Receivers
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    DonorConnect is a revolutionary platform that uses AI to optimize the blood
                    donation process, ensuring critical supplies are always available.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/dashboard">Become a Donor</Link>
                  </Button>
                  <Button asChild variant="secondary" size="lg">
                    <Link href="/admin">Hospital Login</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Smarter, Faster, More Efficient
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We leverage cutting-edge technology to create a seamless connection between
                  donors, hospitals, and patients in need.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="grid gap-4 p-6 rounded-lg border bg-background"
                >
                  {feature.icon}
                  <div className="grid gap-1">
                    <h3 className="text-lg font-bold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Ready to Make a Difference?
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join our network of donors and hospitals today. Your contribution can save a life.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
              <Button asChild size="lg">
                <Link href="/dashboard">Join as a Donor</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/admin">Register Your Hospital</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} DonorConnect. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
