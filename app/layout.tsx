import './globals.css';import type { Metadata } from 'next';import { Header } from '@/components/Header';import { Footer } from '@/components/Footer';
export const metadata:Metadata={title:'GradeSprint GCSE Mocks',description:'GCSE mocks, diagnostics, reports and targeted revision sprints.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Header/>{children}<Footer/></body></html>}
