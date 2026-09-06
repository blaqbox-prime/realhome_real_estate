import PropertiesGrid from "@/components/PropertiesGrid";
import DropDownFilter from "@/components/DropDownFilter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getAgentPortfolio } from "@/services/agentService";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { BsBuildingsFill } from "react-icons/bs";
import { FaRegPaperPlane } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { useParams } from "react-router-dom";

function AgentDetails() {
  const [agent, setAgent] = useState(null);
  const [propertySearch, setPropertySearch] = useState("");
  const [propertySort, setPropertySort] = useState("Name: A to Z");
  const [propertyType, setPropertyType] = useState("Any");

  const params = useParams();

  const {
    register,
    formState: { errors },
  } = useForm();

  const filteredProperties = useMemo(() => {
    const normalizedSearch = propertySearch.trim().toLocaleLowerCase();
    const matchingProperties = (agent?.properties ?? []).filter((property) => {
      const type = property?.property_type ?? property?.type;
      const searchableText = [property?.title, property?.city, property?.province]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase();

      const matchesSearch = !normalizedSearch || searchableText.includes(normalizedSearch);
      const matchesType = propertyType === "Any" || type === propertyType;

      return matchesSearch && matchesType;
    });

    return [...matchingProperties].sort((firstProperty, secondProperty) => {
      if (propertySort === "Price: Low to high") {
        return Number(firstProperty?.price ?? 0) - Number(secondProperty?.price ?? 0);
      }

      if (propertySort === "Price: High to low") {
        return Number(secondProperty?.price ?? 0) - Number(firstProperty?.price ?? 0);
      }

      const nameComparison = (firstProperty?.title ?? "").localeCompare(
        secondProperty?.title ?? "",
        undefined,
        { sensitivity: "base" },
      );

      return propertySort === "Name: Z to A" ? -nameComparison : nameComparison;
    });
  }, [agent?.properties, propertySearch, propertySort, propertyType]);

  const propertyTypes = useMemo(
    () => [
      "Any",
      ...new Set(
        (agent?.properties ?? [])
          .map((property) => property?.property_type ?? property?.type)
          .filter(Boolean),
      ),
    ],
    [agent?.properties],
  );

  // Get the details of an agent
  useEffect(() => {
    const getAgent = async () => {
      const { data, error } = await getAgentPortfolio(params.id);

      error && console.log(error);
      if (data) {
        console.log(data);
        setAgent(data[0]);
      }
    };
    if (!agent) {
      getAgent();
    }
  }, [agent, params.id]);

  return (
    <div className="px-1 my-6 text-left page scroll-smooth">
      <div className="flex items-baseline justify-between">
        <div className="avatar flex items-center flex-row gap-6">
          <div className="relative">
            <Avatar className="aspect-square md:h-24 md:w-24 h-14 w-14 border-4 border-gray-800">
              <AvatarImage src={agent?.profiles?.profile_picture} />
              <AvatarFallback>{`${agent?.profiles?.first_name[0]}${agent?.profiles?.last_name[0]}`}</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 right-1 h-6 w-6 rounded-full bg-gray-transparent bg-gray-200 flex items-center justify-center text-white text-xs font-semibold">
              <MdVerified className="text-lg mx-auto text-black" />
            </div>
          </div>
            <div className="flex flex-col gap-1 text-left">
            <h3 className="font-bold text-base md:text-3xl">{`${agent?.profiles?.first_name} ${agent?.profiles?.last_name}`}</h3>
            <p className="text-xs md:text-base text-gray-400 flex items-baseline gap-2">
              <span>
                <BsBuildingsFill />
              </span>
              {agent?.agency}
            </p>
            <p className="text-gray-400 text-sm max-w-[400px] line-clamp-2">
              {agent?.bio}
            </p>
            <div
              className="flex flex-wrap gap-2 mt-1"
              aria-label="Agent property provinces"
            >
              {[
                ...new Set(
                  (agent?.properties ?? [])
                    .map((property) => property?.province)
                    .filter(Boolean),
                ),
              ].map((province) => (
                <span
                  key={province}
                  className="rounded-full bg-gray-200 px-3 py-1 text-[9px] font-medium text-black"
                >
                  {province}
                </span>
              ))}
            </div>
          </div>
        </div>
        <a
          href="#contact"
          className="py-2 px-16 rounded-lg bg-gray-900 text-gray-50 flex items-center justify-center gap-4"
        >
          <span>
            <FaRegPaperPlane />
          </span>
          Contact {agent?.profiles?.first_name}
        </a>
      </div>

      {/* PORTFOLIO */}
      <section className="my-16">
       <div className="flex items-end justify-between">
        <div className="">
         <h1 className="font-bold text-lg md:text-2xl flex items-center gap-3">
          {agent?.profiles?.first_name}&apos;s <span className="text-gray-400">Portfolio</span>
          <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-black scale-90">
            {agent?.properties?.length ?? 0} {agent?.properties?.length === 1 ? "property" : "properties"}
          </span>
        </h1>
        <p className="text-sm text-gray-500">Curated residential sales across South Africa&apos;s coastal &amp; metropolitan corridors.</p>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <Input
            aria-label="Search agent properties"
            className="h-9 w-full sm:w-64"
            onChange={(event) => setPropertySearch(event.target.value)}
            placeholder="Search title, city or province"
            type="search"
            value={propertySearch}
          />
          <div className="w-full sm:w-52">
            <DropDownFilter
              type="sort properties"
              data={[
                "Price: Low to high",
                "Price: High to low",
                "Name: A to Z",
                "Name: Z to A",
              ]}
              onChange={setPropertySort}
            />
          </div>
        </div>
       </div>
       <div className="prop_types">
        <div className="flex flex-wrap items-center gap-2 mt-4" aria-label="Filter properties by type">
          {propertyTypes.map((type) => {
            const isSelected = propertyType === type;

            return (
              <Button
                key={type}
                type="button"
                variant={isSelected ? "default" : "outline"}
                className={`h-8 rounded-full px-3 text-xs ${isSelected ? "bg-gray-900 text-white hover:bg-gray-800" : "text-gray-600"}`}
                onClick={() => setPropertyType(type)}
                aria-pressed={isSelected}
              >
                {type === "Any" ? "All Units" : type}
              </Button>
            );
          })}
        </div>
       </div>

        <div className="mt-8">
          {filteredProperties.length == 0 ? (
          <p className="italic text-center text-gray-400 my-4">
            {agent?.properties?.length ? "No matching properties found" : "No properties available yet"}
          </p>
        ) : (
          <>
            <PropertiesGrid listings={filteredProperties} className="mt-4" />
          </>
        )}
        </div>
      </section>

      {/* CONTACT */}

      <section className="my-4" id="contact">
        <h1 className="font-bold text-lg md:text-2xl">Get in Touch</h1>
        <form action="" className="max-w-md my-4">
          <div className="grid md:grid-cols-1 gap-4 mb-6">
            <div className="flex flex-col gap-2 ">
              <Label htmlFor="email" className="text-left">
                Contact number
              </Label>
              <Input
                id="contact"
                placeholder="Your cell number"
                className=""
                {...register("contact", { required: true })}
              />
              {errors.contact && (
                <span className="text-sm text-red-700 animate-in slide-in-from-top-1 duration-500">
                  * This field is required
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 ">
              <Label htmlFor="email" className="text-left">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="bruce@wayne.com"
                className=""
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-sm text-red-700 animate-in slide-in-from-top-1 duration-500">
                  * This field is required
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 ">
              <Label htmlFor="message" className="text-left">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Type in your message here"
                className=""
                {...register("message", { required: true })}
              />
              {errors.message && (
                <span className="text-sm text-red-700 animate-in slide-in-from-top-1 duration-500">
                  * This field is required
                </span>
              )}
            </div>
          </div>
          <Button type="submit">Send</Button>
        </form>
      </section>
    </div>
  );
}

export default AgentDetails;
