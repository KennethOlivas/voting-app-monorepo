import { ProfileDropdown } from "@/components/common/profile-dropdown";
import { Search } from "@/components/common/search";
import { ThemeSwitch } from "@/components/common/theme-switch";
import VotersTable from "@/components/features/voters/voters-table";
import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { TopNav } from "@/components/layout/top-nav";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header>
                <TopNav links={[]} />
                <div className='ml-auto flex items-center space-x-4'>
                    <Search />
                    <ThemeSwitch />
                    <ProfileDropdown />
                </div>
            </Header>
            <Main>
                <div className='flex flex-col space-y-2'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-2xl font-bold tracking-tight'>Voters</h1>
                        {children}
                    </div>
                    <VotersTable />
                </div>
            </Main>
        </>
    );
}
