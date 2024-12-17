import "./globals.css";
import type { Metadata } from "next";
import 'easymde/dist/easymde.min.css'
import { Toaster } from "@/components/ui/toaster";
// import localFont from 'next/font/local'

// const workSans = localFont({
//   src:[
//     {
//       path:'./fonts/WorkSans-Black.ttf',
//       weight : '900',
//       style : 'normal'
//     },
//     {
//       path:'./fonts/WorkSans-ExtraBold.ttf',
//       weight : '800',
//       style : 'normal'
//     },
//     {
//       path:'./fonts/WorkSans-Bold.ttf',
//       weight : '700',
//       style : 'normal'
//     },
//     {
//       path:'./fonts/WorkSans-SemiBold.ttf',
//       weight : '600',
//       style : 'normal'
//     },
//     {
//       path:'./fonts/WorkSans-Medium.ttf',
//       weight : '500',
//       style : 'normal'
//     },
//     {
//       path:'./fonts/WorkSans-Regular.ttf',
//       weight : '400',
//       style : 'normal'
//     },
//     {
//       path:'./fonts/WorkSans-Thin.ttf',
//       weight : '200',
//       style : 'normal'
//     },
//     {
//       path:'./fonts/WorkSans-Extralight.ttf',
//       weight : '100',
//       style : 'normal'
//     },
//   ],
//   variable:'--font-work-sans'
// })


export const metadata: Metadata = {
  title: "Volunteer system",
  description: "Volunter ",
};
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={''}>{children} <Toaster/></body>
    </html>
  );
}
