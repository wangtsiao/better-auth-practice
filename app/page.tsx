import GetStartedButton from "@/components/get-started-button";


export default async function Home() {
  return (
    <div className="flex items-center justify-center h-dvh">
      <div className="flex flex-col items-center-justify-center space-y-8">
        <div className="text-6xl font-bold text-center">Authy!</div>
        <GetStartedButton />
      </div>
    </div>
  );
}
