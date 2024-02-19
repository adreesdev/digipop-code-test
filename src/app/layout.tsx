import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import ThemeRegistry from '@/utils/theme/ThemeRegister';
import Header from '../Components/Header';
import StoreProvider from './StoreProvider';

const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });

export const metadata: Metadata = {
    title: 'DIGIPOPS CODE TEST',
    description: 'TODO App using Next.js, Typescript, Redux Toolkit and MUI',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={poppins.className}>
                <StoreProvider>
                    <ThemeRegistry>
                        <Header />
                        {children}
                    </ThemeRegistry>
                </StoreProvider>
            </body>
        </html>
    );
}
