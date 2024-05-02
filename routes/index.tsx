import { Register } from "~/islands/Register.tsx";
import PrimaryPanel from "~/islands/PrimaryPanel.tsx";
import PapersPanel from "~/islands/PapersPanel.tsx";
import Header from "~/islands/Header.tsx";
import ViewSection from "~/islands/ViewSection.tsx";

export default function Home() {
  return (
    <>
      <Register />
      <div class="flex flex-col h-screen max-h-screen p-4 gap-4">
        <Header />
        <div class="w-full h-full grid grid-cols-[3fr,6fr] gap-4 min-h-0">
          <PrimaryPanel />
          <div class="flex flex-col gap-4 min-h-0">
            <ViewSection />
            <PapersPanel class="self-end" />
          </div>
        </div>
      </div>
    </>
  );
}
