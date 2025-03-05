import { ProfileDropdown } from "@/components/common/profile-dropdown";
import { Search } from "@/components/common/search";
import { ThemeSwitch } from "@/components/common/theme-switch";
import Voters from "@/components/features/voters";
import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { TopNav } from "@/components/layout/top-nav";

export default async function VotersPage() {
  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <TopNav links={[]} />
        <div className='ml-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>
      {/* ===== Main ===== */}
      <Main>
        <Voters />
      </Main>
    </>
  );
}
