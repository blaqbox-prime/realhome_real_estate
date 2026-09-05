import AgentCard from "@/components/AgentCard";
import AgentsFilter from "@/components/AgentsFilter";
import FeaturedAgencyLeaders from "@/components/FeaturedAgencyLeaders";
import { getAgents } from "@/services/agentService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsFillPersonBadgeFill, BsFillBuildingsFill, BsEmojiSmile } from "react-icons/bs";
import { FaArrowTrendUp } from "react-icons/fa6";

function Agents() {
  const [agents, setAgents] = useState([]);

  // Fetch the joined agent data used by the filters and cards.
  useEffect(() => {
    const fetchAgents = async () => {
      const { data, error } = await getAgents();

      if (error) {
        console.error(error);
        return;
      }
      setAgents(data);
    };

    fetchAgents();
  }, []);

  const kpiStats = [
    {
      icon: <BsFillPersonBadgeFill className="text-2xl text-gray-900 m-auto" />,
      value: `${agents.length}+`,
      label: "Verified Local Agents",
    },
    {
      icon: <BsFillBuildingsFill className="text-2xl text-gray-900 m-auto" />,
      value: `${agents.length}+`,
      label: "Premier Partner Agencies",
    },
    {
      icon: <BsEmojiSmile className="text-2xl text-gray-900 m-auto" />,
      value: `98.4%`,
      label: "Client Satisfaction",
    },
    {
      icon: <FaArrowTrendUp className="text-2xl text-gray-900 m-auto" />,
      value: `R4.8B`,
      label: "Transaction Value",
    },
  ];

  return (
    <main className="my-4 page-container">
      <div className="text-start mb-8 space-y-4">
        <h1 className="text-5xl font-bold">
          Meet Our Finest <span className="text-gray-400">Agents</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-screen-sm">
          Connect with seasoned, licensed property specialists across top
          partner agencies including Urban Nest, Pine Valley Estates, Crest &
          Co., Luxe Horizon, and Oak & Ember.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 p-12 bg-gray-700 rounded-3xl">
        {kpiStats.map((stat, index) => (
          <div className="flex items-center" key={index}>
            <div className="rounded-full h-16 w-16 bg-gray-200 flex items-center justify-center">
              {stat.icon}
            </div>
            <div className="ml-4 text-left">
              <h2 className="text-4xl font-bold text-gray-100">
                {stat.value}
              </h2>
              <p className="text-gray-200 text-sm">{stat.label}</p>
            </div>
          </div>
        ))}
        {/* ----- */}
      </div>

      {agents.length == 0 ? (
        <p className="text-center italic text-gray-400 my-4">
          No Agents listed yet.
        </p>
      ) : (
        <AgentsFilter agents={agents}>
          {(filteredAgents) => (
            <>
              <FeaturedAgencyLeaders agents={agents} />
              <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 my-4">
                {filteredAgents.map((agent) => (
                  <Link key={agent.id} to={`/agents/${agent.id}`}>
                    <AgentCard id={agent.id} />
                  </Link>
                ))}
              </section>
            </>
          )}
        </AgentsFilter>
      )}
    </main>
  );
}

export default Agents;
