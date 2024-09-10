import { Button } from "@/components/ui/button";
import { Link, useRouteError } from "react-router-dom";
import { SiGooglehome } from "react-icons/si";
import { PiHouseSimple } from "react-icons/pi";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <main
      id="error-page"
      className="h-full w-full absolute
    top-0 left-0 grid place-items-center"
    >
      <div className="">
        <img src="/assets/404.jpg" alt="error" className="max-w-[600px]" />
        
        <p className="text-2xl font-semibold">Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>

        <Link to={'/'}>
            <Button className="text-lg mt-6"> 
                <PiHouseSimple className="mr-3"/> Go Home
            </Button>
        </Link>

      </div>
    </main>
  );
}
